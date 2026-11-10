// Re-export the engine theme with report-specific enhancements
import engineTheme from '../../engine/pdnpaconfig/.vitepress/theme/index'
import type { Theme } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './customstyles.scss';

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

        // Auto-register components from the components directory as async
        // components, so each one (and the data loaders it imports) is only
        // fetched when a page actually uses it, rather than bundled into app.js.
        const modules = import.meta.glob('../components/**/*.vue')

        for (const path in modules) {
            const componentName = path
                .split('/')
                .pop()
                ?.replace(/\.\w+$/, '') // Remove file extension

            if (componentName) {
                ctx.app.component(componentName, defineAsyncComponent(modules[path] as () => Promise<any>))
            }
        }
    }
} satisfies Theme