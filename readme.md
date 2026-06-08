# PDNPA Report Template

This repository is intended to be used as a shell for starting a new PDNPA report. It contains the basic structure of a report and the theme engine as a git submodule. 

This readme covers:

1. Creating a new report based on this template
2. Working on the report instance
3. Bringing in changes from the underlying theme engine and template repository

# 1. Creating a new report

To create a new report:
* Clone this repository
* Install the theme engine submodule
* Create a new repository for your report instance
* Assign the new repository origin
* Add the template repository as a remote
* Install dependencies

## Clone the repository into a new folder

```shell
git clone https://github.com/pdnpa/pdnpa-vitepress-report-template.git

// Or if you have an existing emtpy directory

git clone https://github.com/pdnpa/pdnpa-vitepress-report-template.git .

```

## Installing the theme engine submodule

You will need to install the theme engine git submodule after cloning the repository:

```shell

// The first time you install, it (probably, sometimes) needs the --init flag
git submodule update --init --remote engine

# git submodule update --remote engine

```

*Previously, we tried `git submodule add git@github.com:pdnpa/pdnpa-vitepress.git engine`, which worked until we committed the submodule to the template repository.*

## Create a new repository 

This new repository will contain all the content and custom components for the report instance.

Create it on github (or whatever hosting service you prefer), noting the new repository URL.

### Assign the new repository origin

Remove the template remote (which will currently be set as `origin` and replace it with the new repository

```
git remote rename origin template
git remote add origin git@github.com:new/repository-url.git
```

### Add the template repository as a remote

** This isn't needed if you run `git remote rename origin template` in the step above. **

If for whatever reason you don't have a remote called `template` you can add it using:

```
git remote add template https://github.com/pdnpa/pdnpa-vitepress-report-template
```

## Install dependencies

Run `npm install` to install the dependencies.





# 2. Working on the report instance

## Committing content and changes on the local repository

The first time you make changes and try to commit and push them you will also have to push all the commits from the template repository. i.e. Pushing to `origin:main` for the first time will be a large commit. There are ways to avoid this if you want to totally squash the history (search for things like "Interactively rebase" for help). 

After the first commit - whether you squash or not - you can safely push any report-specific changes to `origin:main` on your report repository.

## Developing styles and components

To build and watch the report instance for development, simply run:

```
npm run dev
```

Also see below about specifying the theme. You can obviously override a lot of styles using the custom scss and components, but the main layout is defined in the theme engine.

## Specifying the theme for development or production

To specify the theme for development at runtime, you can use:

```
npm run theme --theme=val
```

Alternatively, from a terminal/powershell window, you can run:

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

## Report-specific content

Store all the content for your report in the `~/docs` directory.

Assets that are used by the report can be stored in the `~/docs/public` directory.

You can access images in this folder in a couple of ways, depending on whether you are using markdown or Vue components:

```

![PDNPA Logo in dark grey](/pdnpa_logo.png)

<img :src="$withBase('/pdnpa_logo_white.png')" alt="White logo" />

```

## Report-specific configuration

You can edit the content of `~/.vitepress/config.js` to change the report title, and other global config settings. You can also edit the `~/.vitepress/theme/index.ts` to change runtime things like adding extra components or packages.

** Don't edit anything in the `~/engine` directory!! **

## Report-specific styles and assets

A file called `customstyles.scss` is provided in the `~/.vitepress/theme` directory. You can use this to add custom styles and import other stylesheets or resources.

## Report-specific components

Any components you want to use in your report can be added to the `~/.vitepress/theme/components` directory. These are all auto-loaded by `~/.vitepress/theme/.index.ts`.


# 3. Bringing in changes from the underlying theme engine and template repository


## Updates to the theme engine

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

## Updates to the template repository

If any changes to the template repository have been made, you can merge them into your new repository. It is very likely that there have been changes to the files in the local report repository, so just be careful when merging.

```

# Get the latest changes from the template
git fetch template

# Merge the template's main branch into your current branch
git merge template/main

```
