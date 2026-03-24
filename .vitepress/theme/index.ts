// Re-export the engine theme with report-specific enhancements
import engineTheme from '../../engine/pdnpaconfig/.vitepress/theme/index'
import type { Theme } from 'vitepress'
import ReportSpecificComponent from '../components/ReportSpecific.vue'

export default {
    ...engineTheme,
    enhanceApp(ctx) {
        // Call engine's enhanceApp
        engineTheme.enhanceApp?.(ctx)

        // Add report-specific components
        ctx.app.component('ReportSpecific', ReportSpecificComponent)
    }
} satisfies Theme