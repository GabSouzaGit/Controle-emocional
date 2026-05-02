const chartSchema = {
    chart: {
        type: 'line'
    },
    fill: {
        type: "solid"
    },
    colors: ['#000'],
    stroke: {
        curve: 'smooth',
    },
    annotations: {
        yaxis: [
            {
                y: 40,
                y2: 25,
                fillColor: 'hsl(10, 100%, 70%)',
                label: { text: 'Fase de auge' }
            },
            {
                y: 25,
                y2: 20,
                fillColor: 'hsl(10, 100%, 80%)',
                //label: { text: 'Zona Crítica' }
            },
            {
                y: 20,
                y2: 10,
                fillColor: '#fff',
                label: { text: 'Estável' }
            },
            {
                y: 10,
                y2: 5,
                fillColor: 'hsl(200, 60%, 50%)',
                //label: { text: 'Zona Crítica' }
            },
            {
                y: 5,
                y2: -10,
                fillColor: 'hsl(210, 30%, 50%)',
                label: { text: 'Fase Baixa' }
            }
        ]
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