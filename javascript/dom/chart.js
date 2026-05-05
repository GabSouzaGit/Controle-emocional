function clearChartData(){
    chartSchema.series = [];
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
    console.log(options)
    
    options.series[0] = {}
    options.series[0].data = scores.map(doc => { return { y: doc.points, x: new Date(doc.timestamp).getTime() } });

    const chart = new ApexCharts(
        chartContainer,
        options
    );

    chart.render();
}

function initChart(){
    clearChartData();
    chartContainer.innerHTML = "";

    const options = { ...chartSchema };

    const chart = new ApexCharts(
        chartContainer,
        options
    );

    chart.render();
}