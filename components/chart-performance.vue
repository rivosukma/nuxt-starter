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
    ArcElement,
    type ChartData
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const data = ref<ChartData<'doughnut'>>({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }
    ]
});
</script>

<template>
    <Doughnut :data="data" class="max-w-[300px] max-h-[300px]" />
</template>
