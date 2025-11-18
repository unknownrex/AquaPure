document.addEventListener("DOMContentLoaded", function () {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    function createGradient(ctx, color) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 160);
        gradient.addColorStop(0, color.replace("1)", "0.35)"));
        gradient.addColorStop(1, color.replace("1)", "0)"));
        return gradient;
    }

    function createLineChart(canvasId, data, borderColor) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        const bg = createGradient(ctx, borderColor);

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: bg,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: borderColor,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        backgroundColor: "#1a2535a1",
                        titleColor: "#e5e7eb",
                        bodyColor: "#e5e7eb",
                        cornerRadius: 10,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Value: ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 11 },
                            color: "#9ca3af"
                        }
                    },
                    y: {
                        display: false,
                        grid: { display: false }
                    }
                }
            }
        });
    }

    const phData = [7.3, 7.1, 7.2, 7.25, 7.0, 7.4, 7.2];
    const tempData = [24.5, 25, 24.8, 25.3, 24.0, 25.8, 25.1];
    const oxygenData = [7.6, 7.3, 7.4, 7.5, 7.1, 7.9, 7.6];
    const turbidityData = [0.6, 0.5, 0.55, 0.52, 0.48, 0.7, 0.5];

    createLineChart("phChart", phData, "rgba(157, 124, 255, 1)");
    createLineChart("tempChart", tempData, "rgba(255, 189, 83, 1)");
    createLineChart("oxygenChart", oxygenData, "rgba(87, 195, 77, 1)");
    createLineChart("turbidityChart", turbidityData, "rgba(124, 205, 255, 1)");
});