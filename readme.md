# PDNPA Report Template

This repository is intended to be used as a shell for starting a new PDNPA report. It contains the basic structure of a report and the theme engine as a git submodule. 

To create a new report:
* Clone this repository
* Install the theme engine submodule
* Install dependencies
* Specify the theme for development or production

## Clone the repository into a new folder

```shell
git clone https://github.com/pdnpa/pdnpa-vitepress-report-template.git
```

## Installing the theme engine submodule

You will need to install the theme engine git submodule after cloning the repository:

```shell
git submodule update --remote engine
```

*Previously, we tried `git submodule add git@github.com:pdnpa/pdnpa-vitepress.git engine`, which worked until we committed the submodule to the template repository.*

## Install dependencies

Run `npm install` to install the dependencies.

### Updating the theme engine

When changes have been made to the theme engine repository you can merge in the changes using:

```shell    
git submodule update --remote --merge

# 1. Enter the submodule directory
cd engine

# 2. Switch to the main branch (replaces 'main' with your branch name if different)
git checkout main

# 3. Pull the latest changes from the remote
git pull origin main

# 4. Go back to the main project root
cd ..
```

#### Pro Tip for the future:

If you want your submodule to always track a specific branch when you update it, you can configure it like this:
```shell   
git config -f .gitmodules submodule.engine.branch main
```
This will ensure future `git submodule update --remote` commands know exactly which branch to stay on.

## Specifying the theme for development or production

```
$env:VITEPRESS_BASE="/"; $env:VP_THEME="{themename}"; npx vitepress dev pdnpaconfig
```

The default theme is `pdnpa`.

## Deploying to a subfolder

When building for production, typically the files are stored in a subfolder on the webserver, e.g. `../report_publishing/{reportname}`. The vitepress base path can be set using the environment variable `VITEPRESS_BASE`.

```
$env:VITEPRESS_BASE="/{reportname}/"; npx vitepress prod pdnpaconfig
```

The theme can also be specified using the environment variable `VP_THEME`:

```
$env:VITEPRESS_BASE="/{reportname}/"; $env:VP_THEME="{themename}"; npx vitepress prod pdnpaconfig
```

## Report-specific configuration

## Report-specific styles and assets

## Report-specific components


