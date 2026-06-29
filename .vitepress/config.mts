import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withChartjs } from 'vitepress-plugin-chartjs'
import {contentsFeatures,contentsFactors} from './reportcontents.js'
import fs from 'node:fs'
import path from 'node:path'
// Import base config and shared options from engine
import baseVitePressOptions, {
    vitePressSidebarOptions
} from '../engine/pdnpaconfig/.vitepress/config.mts'

const reportSidebar = generateSidebar({
    ...vitePressSidebarOptions,
    documentRootPath: './docs',
})

export default withChartjs(defineConfig({
    // Inherit plugins and markdown config
    ...baseVitePressOptions,
    // markdown: baseVitePressOptions.markdown,
    // Override content and branding
    srcDir: './docs',
    outDir: 'C:/www/report_publishing_local/sotp26',
    base: process.env.VITEPRESS_BASE ?? '/',
    title: "State of the Park Report 2026",
    description: "Report-specific description",

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
            { "text": 'Home', "link": '/' },
            { "text": 'Overview', "link": '/introduction/overview' },
            // Report-specific nav
        ],
        sidebar:[
            {
              "text": "Introduction",
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
                "link": "assessments",
                "collapsed": false,
                "items": contentsFeatures
            },
            {
                "text": 'Factors',
                "collapsed": true,
                "items": contentsFactors
            }
        ]
    },
}))