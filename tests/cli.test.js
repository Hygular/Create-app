import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
  copyFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "index.js");
const templates = ["agency", "blog"];
const frameworks = ["nextjs", "nuxt"];

function workspace(t) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "hygular-cli-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const cli = path.join(dir, "cli");
  const projects = path.join(dir, "projects");
  mkdirSync(cli);
  mkdirSync(projects);
  copyFileSync(source, path.join(cli, "index.js"));
  writeFileSync(path.join(cli, "package.json"), '{"type":"module"}\n');
  return { cli, projects };
}

function starter(
  cli,
  template,
  framework,
  packageContent = '{"name":"{{PROJECT_NAME}}","version":"1.0.0","private":true,"scripts":{"dev":"node -v"}}\n',
) {
  const dir = path.join(cli, "templates", template, framework);
  mkdirSync(path.join(dir, "src", "nested"), { recursive: true });
  writeFileSync(path.join(dir, "package.json"), packageContent);
  writeFileSync(
    path.join(dir, "src", "nested", "config.ts"),
    'export const name = "{{PROJECT_NAME}}";\n',
  );
  writeFileSync(path.join(dir, "README.md"), "# {{PROJECT_NAME}}\n");
  writeFileSync(path.join(dir, "asset.txt"), "{{PROJECT_NAME}}\n");
  return dir;
}

function run({ cli, projects }, args, options = {}) {
  const result = spawnSync(
    process.execPath,
    [path.join(cli, "index.js"), ...args],
    {
      cwd: projects,
      encoding: "utf8",
      timeout: 30000,
      env: {
        ...process.env,
        npm_config_offline: "true",
        npm_config_audit: "false",
        npm_config_fund: "false",
        npm_config_update_notifier: "false",
        ...options.env,
      },
    },
  );
  if (result.error) throw result.error;
  return { status: result.status, output: result.stdout + result.stderr };
}

function withoutAnsi(value) {
  return value.replace(/\x1b\[[0-9;]*m/g, "");
}

test("prints help without creating a project", (t) => {
  const ctx = workspace(t);
  for (const flag of ["--help", "-h"]) {
    const result = run(ctx, [flag]);
    assert.equal(result.status, 0);
    assert.match(withoutAnsi(result.output), /Usage:/);
    assert.match(withoutAnsi(result.output), /--template/);
  }
});

test("rejects missing project name", (t) => {
  const ctx = workspace(t);
  const result = run(ctx, []);
  assert.equal(result.status, 1);
  assert.match(result.output, /Project name is required/);
});

test("rejects missing or unsupported templates", (t) => {
  const ctx = workspace(t);
  for (const args of [
    ["demo"],
    ["demo", "--template", "unknown", "--framework", "nextjs"],
  ]) {
    const result = run(ctx, args);
    assert.equal(result.status, 1);
    assert.match(result.output, /template/i);
    assert.equal(existsSync(path.join(ctx.projects, "demo")), false);
  }
});

test("rejects unsupported frameworks", (t) => {
  const ctx = workspace(t);
  const result = run(ctx, [
    "demo",
    "--template",
    "agency",
    "--framework",
    "react",
  ]);
  assert.equal(result.status, 1);
  assert.match(result.output, /not a valid framework/);
});

test("rejects invalid project names", (t) => {
  const ctx = workspace(t);
  for (const name of ["bad/name", "bad name", "../outside", "bad.name"]) {
    const result = run(ctx, [name, "--template", "agency"]);
    assert.equal(result.status, 1, name);
    assert.match(result.output, /not a valid project name/, name);
  }
});

test("reports a missing template directory", (t) => {
  const ctx = workspace(t);
  const result = run(ctx, [
    "demo",
    "--template",
    "agency",
    "--framework",
    "nextjs",
  ]);
  assert.equal(result.status, 1);
  assert.match(result.output, /Template not found/);
  assert.equal(existsSync(path.join(ctx.projects, "demo")), false);
});

test("does not overwrite an existing project directory", (t) => {
  const ctx = workspace(t);
  starter(ctx.cli, "agency", "nextjs");
  const existing = path.join(ctx.projects, "demo");
  mkdirSync(existing);
  writeFileSync(path.join(existing, "keep.txt"), "untouched");
  const result = run(ctx, [
    "demo",
    "--template",
    "agency",
    "--framework",
    "nextjs",
  ]);
  assert.equal(result.status, 1);
  assert.match(result.output, /already exists/);
  assert.equal(
    readFileSync(path.join(existing, "keep.txt"), "utf8"),
    "untouched",
  );
});

for (const template of templates) {
  for (const framework of frameworks) {
    test(`creates a ${template}/${framework} project`, (t) => {
      const ctx = workspace(t);
      starter(ctx.cli, template, framework);
      const args = [
        "sample-app",
        "--template",
        template,
        "--framework",
        framework,
      ];
      const result = run(ctx, args);
      assert.equal(result.status, 0, result.output);
      const project = path.join(ctx.projects, "sample-app");
      assert.equal(
        JSON.parse(readFileSync(path.join(project, "package.json"), "utf8"))
          .name,
        "sample-app",
      );
      assert.equal(
        readFileSync(path.join(project, "src", "nested", "config.ts"), "utf8"),
        'export const name = "sample-app";\n',
      );
      assert.equal(
        readFileSync(path.join(project, "README.md"), "utf8"),
        "# sample-app\n",
      );
      assert.equal(
        readFileSync(path.join(project, "asset.txt"), "utf8"),
        "{{PROJECT_NAME}}\n",
      );
      assert.match(withoutAnsi(result.output), /Packages installed/);
      assert.match(withoutAnsi(result.output), /Project created successfully/);
      assert.match(withoutAnsi(result.output), /run dev/);
    });
  }
}

test("keeps generated files when npm install fails", (t) => {
  const ctx = workspace(t);
  starter(ctx.cli, "blog", "nuxt", "{invalid json\n");
  const result = run(ctx, [
    "failed-install",
    "--template",
    "blog",
    "--framework",
    "nuxt",
  ]);
  assert.equal(result.status, 0, result.output);
  assert.match(
    withoutAnsi(result.output),
    /could not be installed automatically/,
  );
  assert.match(withoutAnsi(result.output), /install/);
  assert.equal(
    existsSync(
      path.join(ctx.projects, "failed-install", "src", "nested", "config.ts"),
    ),
    true,
  );
});

test("requires missing options in non-interactive mode", (t) => {
  const ctx = workspace(t);
  const result = run(ctx, ["demo", "--template", "agency"]);
  assert.equal(result.status, 1);
  assert.match(withoutAnsi(result.output), /non-interactive terminal/);
  assert.equal(existsSync(path.join(ctx.projects, "demo")), false);
});

test("rejects unknown flags and missing flag values", (t) => {
  const ctx = workspace(t);
  for (const args of [
    ["demo", "--unknown"],
    ["demo", "--template"],
  ]) {
    const result = run(ctx, args);
    assert.equal(result.status, 1);
    assert.match(withoutAnsi(result.output), /Unknown option|Missing value/);
  }
});
