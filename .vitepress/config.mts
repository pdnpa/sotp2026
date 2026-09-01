import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withChartjs } from 'vitepress-plugin-chartjs'
import {contentsFeatures,contentsFactors} from './reportcontents.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// Import base config and shared options from engine
import baseVitePressOptions, {
    vitePressSidebarOptions
} from '../engine/pdnpaconfig/.vitepress/config.mts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getScssThemeVariables(filePath: string) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const variables: Record<string, string> = {}
        // Matches $variable-name: value; (ignoring lines starting with //)
        const regex = /^\s*\$([\w-]+):\s*([^;]+);/gm
        let match
        while ((match = regex.exec(content)) !== null) {
            variables[match[1]] = match[2].trim()
        }
        return variables
    } catch (e) {
        console.warn(`Could not load SCSS variables from ${filePath}`, e)
        return {}
    }
}

const themeVars = getScssThemeVariables(path.resolve(__dirname, 'theme/_variables.scss'))

const reportSidebar = generateSidebar({
    ...vitePressSidebarOptions,
    documentRootPath: './docs',
})

export default withChartjs(defineConfig({
    // Inherit plugins and markdown config
    ...baseVitePressOptions,

    chartjs: {
        defaultHeight: '400px',
        enableZoom: true,
        colorPalette: [
            themeVars['pdnpa-darkorange'],
            themeVars['pdnpa-lightblue'],
            themeVars['pdnpa-lilac'],
            themeVars['pdnpa-midbrown'],
            themeVars['pdnpa-lime'],
            themeVars['pdnpa-orange'],
            themeVars['pdnpa-blue'],
            themeVars['pdnpa-stone'],
        ].filter(Boolean),
    },

    head: [
        ['link', { rel: 'stylesheet', href: 'https://js.arcgis.com/5.1/@arcgis/core/assets/esri/themes/light/main.css' }],
        ['script', { type: 'module', src: 'https://js.arcgis.com/5.1/' }]
    ],
    // markdown: baseVitePressOptions.markdown,
    // Override content and branding
    srcDir: './docs',
    outDir: process.env.OUTPUT_TO ?? 'C:/www/report_publishing_local/sotp26',
    base: process.env.VITEPRESS_BASE ?? '/',
    title: "State of the Park Report 2026",
    description: "A comprehensive account of the condition of the Peak District National Park and an assessment of what factors are driving change in the landscape",
    appearance: false,
    //appearance: {
        // @ts-expect-error not fully supported yet
    //    initialValue: 'light'
    //},
    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag.startsWith('arcgis-') || tag.startsWith('calcite-')
            }
        }
    },
    vite: {
        ...baseVitePressOptions.vite,

        build: {
            target: 'es2022',
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
                            return 'vendor-vue';
                        }
                    }
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            }
        },
        resolve: {
            alias: [
                // This targets exactly the Vue build that includes the runtime compiler
                { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' }
            ]
        },
        ssr: {
            noExternal: ['vue']
        }
    },



    themeConfig: {
        outline: {
            level: 'deep',
            label: 'On this page'
        },
        logo: "/pdnpa_logo_white.png",
        siteTitle: "State of the Park Report 2026",
        nav: [
            { "text": 'Home', "link": '/' }
            // ,{ "text": 'Overview', "link": '/introduction/overview' },
            // Report-specific nav
        ],
        sidebar:[
            {
                "text": "Executive summary",
                "link": "/executive-summary"
            },
            {
              "text": "Introduction",
              "link": "/introduction/introduction",
              "collapsed": false,
              "items": [
                  {
                      "text": "Overview of the Peak District",
                      "link": "/introduction/overview"
                  },
                  {
                      "text": "Methodology",
                      "link": "/introduction/methodology"
                  }
              ]
            },
            {
                "text": 'Feature assessments',
                "link": "/assessments",
                "collapsed": false,
                "items": contentsFeatures
            },
            {
                "text": 'Factors',
                "link": "/factors",
                "collapsed": true,
                "items": contentsFactors
            }
        ]
    },
}))
