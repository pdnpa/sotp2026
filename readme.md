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

This repository will contain all the content and custom components for the report instance.

Create it on github (or whatever hosting service you prefer), noting the new repository URL.

### Assign the new repository origin

```

## Remove the template remote and replace it with the new repository
git remote rename origin template
git remote add origin git@github.com:new/repository-url.git

```

### Add the template repository as a remote

This isn't needed if you run `git remote rename origin template` in the step above.

```
git remote add template https://github.com/pdnpa/pdnpa-vitepress-report-template
```

### Merging the template repository into the new repository

If any changes to the template repository have been made, you can merge them into your new repository. It is very likely that there have been changes to the files in the local report repository, so just be careful when merging.

```

# Get the latest changes from the template
git fetch template

# Merge the template's main branch into your current branch
git merge template/main

```


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

## Committing content and changes on the local repository

The first time you make changes and try to commit and push them you will also have to push all the commits from the template repository. i.e. Pushing to `origin:main` for the first time will be a large commit. There are ways to avoid this if you want to totally squash the history. 

Make one or two content commits, then in PHPStorm open the Git tool window at the bottom  go to the Log tab.

- Scroll down to find the very first commit you made after cloning the template.

- Right-click the commit just before yours (the last commit belonging strictly to the template) and select Interactively Rebase from Here...

- A window will open listing all the template commits. Select all of them except the very first one, and change their dropdown option from Pick to Fixup (or Squash).

- This will collapse the entire template history into a single commit. Your subsequent individual commits will remain untouched on top of it.

- Once the rebase is complete, opening the Push dialog will look much cleaner, showing only that one collapsed template base commit plus your new commits.

After the first commit - whether you squash or not - you can safely push any report-specific changes to `origin:main`.

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


