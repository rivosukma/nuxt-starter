<script setup lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartData
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { useChart } from '~/composables/use-chart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const { colors, chartOptions } = useChart();

const initial = ref<ChartData<'line'>>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales Overtime',
            data: [40, 39, 10, 40, 39, 80, 40]
        },
        {
            label: 'Performance Overtime',
            data: [30, 4, 16, 123, 39, 90, 60]
        }
    ]
});

const data = computed(() => {
    const value = initial.value;

    value.datasets.forEach((item, index) => {
        value.datasets[index] = {
            backgroundColor: '#ff0000',
            tension: 0.4,
            borderColor: colors.blue[100 * (index + 1)],
            borderWidth: 2,
            pointBackgroundColor: colors.blue[100 * (index + 1)],
            data: item.data,
            label: item.label
        };
    });

    return value;
});
</script>

<template>
    <Line :data="data" :options="chartOptions" />
</template>
