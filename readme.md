# PDNPA Report Template

This repository is intended to be used as a shell for starting a new PDNPA report. Clone it into a new folder and then run `npm install` to install the dependencies. 

## Installing and updating the theme engine git submodule

You will need to install the theme engine git submodule after cloning the repository (although it should be possible to use `git submodule update --init` instead, but we have not tested this yet).

This will also be needed when changes have been made to the theme engine.

```shell    
git submodule update --remote --merge
```

## Specifying the theme

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


