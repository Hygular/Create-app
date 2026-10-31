# @hygular/create-app

Create a Hygular project from a starter template.

The scaffolder copies a template into a new directory, replaces project name placeholders, and installs dependencies for Next.js and Nuxt starters. It supports interactive prompts and command-line arguments.

It is separate from `@hygular/cli`, which handles project-specific CSS generation and watching.

[Hygular](https://hygular.com) · [Documentation](https://hygular.com/docs)

## Quick start

```sh
npx @hygular/create-app@1.0.0-beta.1
```

The CLI prompts for a project name, template, and framework. Once the project is created:

```sh
cd my-site
npm run dev
```

Replace `my-site` with the project name entered during setup.

The scaffolder runs `npm install` before printing the next steps. If installation fails, the generated files remain available. Run `npm install` inside the project before starting it.

## Usage

Run the command without arguments to configure a project interactively:

```sh
npx @hygular/create-app@1.0.0-beta.1
```

Alternatively, supply the project options directly:

```sh
npx @hygular/create-app@1.0.0-beta.1 <project-name> --template <template> --framework <framework>
```

| Argument | Values |
| --- | --- |
| `<project-name>` | Name of a new directory in the current working directory |
| `--template` | `agency`, `blog` |
| `--framework` | `nextjs`, `nuxt` |
| `--help`, `-h` | Print usage information |

In an interactive terminal, the CLI prompts for missing options. Values supplied through command-line arguments are retained and are not requested again.

In non-interactive environments, provide the project name, template, and framework explicitly. The CLI exits with an error if required information is missing.

Put the project name before the options and separate each option from its value with a space.

Use a lowercase project name such as `my-site`. The destination directory must not already exist, even if it is empty.

### Next.js

```sh
npx @hygular/create-app@1.0.0-beta.1 my-blog --template blog --framework nextjs
```

### Nuxt

```sh
npx @hygular/create-app@1.0.0-beta.1 my-site --template agency --framework nuxt
```

Both framework targets follow the same scaffolding process. The CLI copies the selected starter, installs dependencies with npm, and prints the commands needed to run the project.

### Partial arguments

You can provide a project name and select the remaining options interactively:

```sh
npx @hygular/create-app@1.0.0-beta.1 my-site
```

You can also specify a template and select only the framework:

```sh
npx @hygular/create-app@1.0.0-beta.1 my-site --template agency
```

These forms require an interactive terminal.

### Help

```sh
npx @hygular/create-app@1.0.0-beta.1 --help
```

## Templates

| Template | Purpose |
| --- | --- |
| `agency` | Agency, portfolio, and business sites |
| `blog` | Content-driven sites |

Both templates support Next.js and Nuxt.

Templates are bundled with the scaffolder. The selected files are copied from `templates/<template>/<framework>/`; the CLI does not download a template repository at runtime.

## What the command does

1. Accepts a project name, template, and framework through arguments or interactive prompts.
2. Validates the selected options and checks that the destination directory does not already exist.
3. Creates a new project directory using the selected starter.
4. Configures the generated project with the provided name.
5. Installs dependencies using `npm install`.
6. Prints the commands to start the project.

Dependencies and their versions are defined in each starter's `package.json`. The scaffolder does not independently add or update Hygular packages.

Automatic dependency installation and the printed next-step commands use npm.

## Requirements

- Node.js 18 or later for the scaffolder itself.
- npm for automatic dependency installation.
- A Node.js version compatible with the selected starter's dependencies. Next.js, Nuxt, or `@hygular/cli` may require a newer version than the scaffolder.
- Network access to retrieve the scaffolder and install starter dependencies.

## Troubleshooting

### Missing options in a non-interactive terminal

Provide the project name, template, and framework explicitly:

```sh
npx @hygular/create-app@1.0.0-beta.1 my-site --template agency --framework nextjs
```

Interactive prompts are available only when the CLI runs in an interactive terminal.

### Invalid project name

Use a directory name containing letters, numbers, hyphens, or underscores. Names containing spaces, path separators, or other unsupported characters are rejected.

### The destination already exists

Choose a different project name or move the existing directory before retrying. The scaffolder does not overwrite or merge into an existing directory.

### A template is not found

Check the template and framework names. The corresponding `templates/<template>/<framework>/` directory must exist in the published package.

### Dependencies could not be installed

The generated files remain available if automatic installation fails.

Enter the project directory and run:

```sh
npm install
```

Check the npm error output to identify the installation failure.

## License

[MIT](LICENSE.MD) © Eyruz Badalzada