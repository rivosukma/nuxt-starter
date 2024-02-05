import type { ChartOptions } from 'chart.js';
import colors from '#tailwind-config/theme/colors';

export function useChart() {
    const mode = useColorMode();

    const barOptions = computed<ChartOptions<'bar'>>(() => ({
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }));

    const chartOptions = computed<ChartOptions<'line'>>(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    intersect: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color:
                            mode.value === 'dark'
                                ? colors.slate[900]
                                : colors.slate[200]
                    },
                    ticks: {
                        color: colors.slate[500]
                    }
                },
                x: {
                    grid: {
                        color:
                            mode.value === 'dark'
                                ? colors.slate[800]
                                : colors.slate[200]
                    },
                    ticks: {
                        color: colors.slate[500]
                    }
                }
            }
        };
    });

    return { colors, barOptions, chartOptions };
}
