import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
// Import base config and shared options from engine
import baseVitePressOptions, {
    vitePressSidebarOptions
} from '../engine/pdnpaconfig/.vitepress/config.mts'

const reportSidebar = generateSidebar({
    ...vitePressSidebarOptions,
    documentRootPath: './docs',
})

export default defineConfig({
    // Inherit plugins and markdown config
    vite: baseVitePressOptions.vite,
    markdown: baseVitePressOptions.markdown,

    // Override content and branding
    srcDir: './docs',
    base: process.env.VITEPRESS_BASE ?? '/',
    title: "",
    description: "Report-specific description",

    themeConfig: {
        logo: "/pdnpa_logo_white.png",
        siteTitle: false,
        nav: [
            { text: 'Home', link: '/' },
            // Report-specific nav
        ],
        sidebar: reportSidebar,
    },
})