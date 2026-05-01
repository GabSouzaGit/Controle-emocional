const chartSchema = {
    chart: {
        type: 'line'
    },
    stroke: {
        curve: 'smooth',
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 1,
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            colorStops: [
                {
                    offset: 5,
                    color: "hsl(25, 100%, 50%)",
                    opacity: 1
                },
                {
                    offset: 20,
                    color: "hsl(0, 80%, 50%)",
                    opacity: 1
                },
                {
                    offset: 40,
                    color: "hsl(0, 0%, 80%)",
                    opacity: 1
                },
                {
                    offset: 80,
                    color: "hsl(0, 0%, 80%)",
                    opacity: 1
                },
                {
                    offset: 90,
                    color: "hsl(240, 30%, 50%)",
                    opacity: 1
                },
                {
                    offset: 100,
                    color: "hsl(240, 30%, 30%)",
                    opacity: 1
                }
            ]
        }
    },
    series: [{
        name: 'Score',
        data: []
    }],
    xaxis: {
        type: "datetime"
    },
    yaxis: {
        max: MAX_TOTAL_SCORE,
        min: MIN_TOTAL_SCORE,
        tickAmount: 10
    }
}

function putChartInLoading(){
    const fallback = document.createElement("div");
    fallback.id = "chart-fallback";

    const loading = document.createElement("div");
    loading.id = "load-animation";

    fallback.appendChild(loading);

    chartContainer.innerHTML = "";
    chartContainer.appendChild(fallback);
}

function updateChart(){
    chartContainer.innerHTML = "";

    const options = { ...chartSchema };
    options.series[0].data = scores.map(doc => { return { y: doc.points, x: new Date(doc.timestamp).getTime() } });

    const chart = new ApexCharts(
        chartContainer,
        options
    );

    chart.render();
}

function initChart(){
    chartContainer.innerHTML = "";

    const options = { ...chartSchema };

    const chart = new ApexCharts(
        chartContainer,
        options
    );

    chart.render();
}