import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ presentCount, absentCount }) => {
    const data = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: 'Attendance',
                data: [presentCount, absentCount],
                backgroundColor: ['#28a745', '#dc3545'], // Green for present, Red for absent
                hoverBackgroundColor: ['#218838', '#c82333'], // Darker shades on hover
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DonutChart;
