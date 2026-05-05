function mark(energy, humor, motivation, sleep, stress){
    const score = getScore(energy, humor, motivation, sleep, stress);

    timeOfLastMark = Date.now();
    scores.push({
        points: score,
        timestamp: timeOfLastMark
    });
    
    putChartInLoading();

    localStorage.setItem(
        "EMT_CONTROL_MARKINGS", 
        JSON.stringify(scores)
    );

    localStorage.setItem(
        "EMT_CONTROL_LAST_TIMESTAMP", 
        timeOfLastMark.toString()
    );
}

function recoveryFromBackup(){
    localStorage.setItem(
        "EMT_CONTROL_MARKINGS", 
        JSON.stringify(scores)
    );

    localStorage.setItem(
        "EMT_CONTROL_LAST_TIMESTAMP", 
        (scores[scores.length - 1].timestamp).toString()
    );
}

function clearAllMemory(){
    if(confirm("Tem certeza que deseja eliminar todos os dados?")){ 
        localStorage.clear();
        initChart();
        scores = [];
        timeOfLastMark = 0;     
    }
}