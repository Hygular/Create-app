#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { createInterface } from "readline/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

const log = {
  info: (msg) => console.log(`${c.cyan}ℹ${c.reset}  ${msg}`),
  success: (msg) => console.log(`${c.green}✔${c.reset}  ${msg}`),
  warn: (msg) => console.log(`${c.yellow}⚠${c.reset}  ${msg}`),
  error: (msg) => console.error(`${c.red}✖${c.reset}  ${msg}`),
  step: (msg) => console.log(`${c.gray}›${c.reset}  ${msg}`),
  title: (msg) => console.log(`\n${c.bold}${c.cyan}${msg}${c.reset}\n`),
};

const VALID_TEMPLATES = ["agency", "blog"];
const VALID_FRAMEWORKS = ["nextjs", "nuxt"];

function showHelp() {
  console.log(`
${c.bold}${c.cyan}@hygular/create-app${c.reset} — Hygular Framework CLI

${c.bold}Usage:${c.reset}
  npx @hygular/create-app [project-name] [--template <template>] [--framework <framework>]

${c.bold}Options:${c.reset}
  --template    ${c.gray}(optional)${c.reset}  ${VALID_TEMPLATES.join(" | ")}
  --framework   ${c.gray}(optional)${c.reset}  ${VALID_FRAMEWORKS.join(" | ")}
  --help        Show this help message

${c.bold}Examples:${c.reset}
  npx @hygular/create-app
  npx @hygular/create-app my-site --template agency
  npx @hygular/create-app my-site --template blog --framework nextjs
`);
}

/**
 * Parses project options and handles help requests.
 */
function parseArgs(argv) {
  const args = argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
  }

  const options = { projectName: null, template: null, framework: null };
  const errors = [];
  const flags = { "--template": "template", "--framework": "framework" };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (Object.hasOwn(flags, arg)) {
      const value = args[++i];
      if (!value || value.startsWith("-")) {
        errors.push(`Missing value for ${arg}.`);
        if (value?.startsWith("-")) i--;
      } else {
        options[flags[arg]] = value;
      }
    } else if (arg.startsWith("-")) {
      errors.push(`Unknown option: ${arg}`);
    } else if (!options.projectName) {
      options.projectName = arg;
    } else {
      errors.push(`Unexpected argument: ${arg}`);
    }
  }

  return { options, errors };
}

async function promptMissing(options) {
  if (options.projectName && options.template && options.framework)
    return options;
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    if (!options.projectName)
      throw new Error(
        "Project name is required. Supply it as an argument in a non-interactive terminal.",
      );
    throw new Error(
      "Missing options in a non-interactive terminal. Supply --template and --framework.",
    );
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  async function ask(question) {
    const answer = await rl.question(`${c.cyan}?${c.reset} ${question}`);
    return answer.trim();
  }
  async function choose(label, choices) {
    console.log(`${c.bold}${label}${c.reset}`);
    choices.forEach((choice, i) =>
      console.log(`  ${c.gray}${i + 1}.${c.reset} ${choice}`),
    );
    while (true) {
      const value = await ask(`Select [1-${choices.length}]: `);
      const index = Number(value);
      if (Number.isInteger(index) && index >= 1 && index <= choices.length)
        return choices[index - 1];
      log.warn(`Enter a number from 1 to ${choices.length}.`);
    }
  }

  try {
    if (!options.projectName) {
      while (!options.projectName)
        options.projectName = await ask("Project name: ");
    }
    if (!options.template)
      options.template = await choose("Select a template", VALID_TEMPLATES);
    if (!options.framework)
      options.framework = await choose("Select a framework", VALID_FRAMEWORKS);
    return options;
  } finally {
    rl.close();
  }
}

function validate({ projectName, template, framework }) {
  const errors = [];

  if (!projectName) {
    errors.push(
      "Project name is required.\n  Example: npx @hygular/create-app my-app --template agency",
    );
  } else if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
    errors.push(
      `"${projectName}" is not a valid project name. Use only letters, numbers, hyphens, and underscores.`,
    );
  }

  if (!VALID_TEMPLATES.includes(template)) {
    errors.push(
      `"${template}" is not a valid template.\n  Available templates: ${VALID_TEMPLATES.map((t) => c.cyan + t + c.reset).join(", ")}`,
    );
  }

  if (!VALID_FRAMEWORKS.includes(framework)) {
    errors.push(
      `"${framework}" is not a valid framework.\n  Available frameworks: ${VALID_FRAMEWORKS.map((f) => c.cyan + f + c.reset).join(", ")}`,
    );
  }

  return errors;
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Replaces project name placeholders in supported text files.
 */
function replacePlaceholders(dir, projectName) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      replacePlaceholders(fullPath, projectName);
    } else {
      const textExtensions = [
        ".json",
        ".html",
        ".css",
        ".js",
        ".ts",
        ".tsx",
        ".jsx",
        ".vue",
        ".md",
      ];
      if (textExtensions.includes(path.extname(entry.name))) {
        let content = fs.readFileSync(fullPath, "utf-8");
        content = content.replaceAll("{{PROJECT_NAME}}", projectName);
        fs.writeFileSync(fullPath, content, "utf-8");
      }
    }
  }
}

/**
 * Installs project dependencies using npm.
 * Returns false if installation fails.
 */
function installDeps(projectDir) {
  try {
    log.step("Installing packages...");
    execSync("npm install", { cwd: projectDir, stdio: "pipe" });
    return true;
  } catch (err) {
    if (err.stderr) console.error(err.stderr.toString().trim());
    return false;
  }
}

async function main() {
  log.title("Hygular");

  const { options, errors: argErrors } = parseArgs(process.argv);
  if (argErrors.length) {
    argErrors.forEach((error) => log.error(error));
    process.exitCode = 1;
    return;
  }

  // Reject invalid arguments before prompting.
  const suppliedErrors = validate({
    projectName: options.projectName || "valid-name",
    template: options.template || "agency",
    framework: options.framework || "nextjs",
  });
  if (suppliedErrors.length) {
    suppliedErrors.forEach((error) => log.error(error));
    process.exitCode = 1;
    return;
  }

  const { projectName, template, framework } = await promptMissing(options);

  const errors = validate({ projectName, template, framework });
  if (errors.length > 0) {
    errors.forEach((e) => log.error(e));
    console.log(
      `\n${c.gray}For help: npx @hygular/create-app --help${c.reset}\n`,
    );
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  const templateDir = path.join(__dirname, "templates", template, framework);

  if (!fs.existsSync(templateDir)) {
    log.error(
      `Template not found: ${c.cyan}${template}/${framework}${c.reset}`,
    );
    log.error(`Expected path: ${templateDir}`);
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    log.error(`A folder named "${projectName}" already exists.`);
    log.error("Choose a different name or remove the existing folder.");
    process.exit(1);
  }

  log.info(`Template:   ${c.cyan}${template}${c.reset}`);
  log.info(`Framework:  ${c.cyan}${framework}${c.reset}`);
  log.info(`Directory:  ${c.cyan}${targetDir}${c.reset}`);
  console.log();

  log.step("Copying files...");
  copyDir(templateDir, targetDir);
  log.success("Files copied.");

  replacePlaceholders(targetDir, projectName);
  let depsInstalled = false;
  {
    depsInstalled = installDeps(targetDir);
    if (depsInstalled) {
      log.success("Packages installed.");
    } else {
      log.warn(
        "Packages could not be installed automatically. Run the install command manually.",
      );
    }
  }

  console.log(
    `\n${c.green}${c.bold}✔ Project created successfully!${c.reset}\n`,
  );
  console.log(`${c.bold}Next steps:${c.reset}`);
  console.log(`  ${c.cyan}cd ${projectName}${c.reset}`);

  if (!depsInstalled) {
    console.log(`  ${c.cyan}npm install${c.reset}`);
  }
  console.log(`  ${c.cyan}npm run dev${c.reset}`);

  console.log();
}

main().catch((err) => {
  log.error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
