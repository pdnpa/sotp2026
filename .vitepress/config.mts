import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withChartjs } from 'vitepress-plugin-chartjs'
import reportContents from './reportcontents.js'
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
    vite: {
        ...baseVitePressOptions.vite,
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
    markdown: baseVitePressOptions.markdown,

    // Override content and branding
    srcDir: './docs',
    base: process.env.VITEPRESS_BASE ?? '/',
    title: "State of the Park Report 2026",
    description: "Report-specific description",

    transformPageData(pageData) {
        try {
            const fullPath = path.resolve(process.cwd(), 'docs', pageData.filePath)
            const rawContent = fs.readFileSync(fullPath, 'utf-8')

            const groupPageMatch = rawContent.match(/<GroupPage\s+:family_id="(\d+)"\s+:group_id="(\d+)"\s*\/>/)
            if (groupPageMatch) {
                // console.log(`Injected headers for ${pageData.relativePath}`)
                // Inject the dynamic headers for GroupPage
                pageData.headers = [
                    { level: 2, title: 'Introduction', slug: 'introduction' },
                    { level: 2, title: 'Distribution', slug: 'distribution' },
                    { level: 2, title: 'Why is important?', slug: 'why-is-important' }, // Note: simplified title as it's dynamic in component
                    { level: 2, title: 'State of', slug: 'state-of' },
                    { level: 2, title: 'Impact assessment', slug: 'impact-assessment' },
                    { level: 2, title: 'What are the gaps in our research & data?', slug: 'what-are-the-gaps-in-our-research-data' }
                ] as any

                // Also ensure outline is enabled for this page
                if (pageData.frontmatter.outline === undefined) {
                    pageData.frontmatter.outline = 'deep'
                }
            }
        } catch (e) {
            console.error(`Failed to read file ${pageData.filePath}:`, e)
        }
    },

    themeConfig: {
        outline: {
            level: 'deep',
            label: 'On this page'
        },
        logo: "/pdnpa_logo_white.png",
        siteTitle: false,
        nav: [
            { text: 'Home', link: '/' },
            // Report-specific nav
        ],
        sidebar:[
            {
              "text": "Introduction",
              "collapsed": true,
              "items": [
                  {
                      "text": "Overview of the Peak District",
                      "link": "introduction/overview"
                  },
                  {
                      "text": "Methodology",
                      "link": "introduction/methodology"
                  },
                  {
                      "text": "Test map",
                      "link": "test-map"
                  }
              ]
            },
            {
                text: 'Feature assessments',
                items: reportContents
            }
        ]
    },
}))