// Re-export the engine theme with report-specific enhancements
import engineTheme from '../../engine/pdnpaconfig/.vitepress/theme/index'
import type { Theme } from 'vitepress'
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../customstyles.scss';

Chart.register(...registerables, ChartDataLabels);

export default {
    ...engineTheme,
    enhanceApp(ctx) {
        // Call engine's enhanceApp
        engineTheme.enhanceApp?.(ctx)

        Chart.defaults.font.family = 'sans-serif';
        Chart.defaults.font.size = 13.5;

        // Add report-specific components individually
        // ctx.app.component('ReportSpecific', ReportSpecificComponent)

        // Or auto-register components from the components directory
        const modules = import.meta.glob('../components/**/*.vue', { eager: true })

        for (const path in modules) {
            const mod = modules[path] as any
            const componentName = path
                .split('/')
                .pop()
                ?.replace(/\.\w+$/, '') // Remove file extension

            if (componentName && mod.default) {
                ctx.app.component(componentName, mod.default)
            }
        }
    }
} satisfies Theme