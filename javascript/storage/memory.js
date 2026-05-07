function localStorageRecovering(){
    const dataRecovered = localStorage.getItem(EMTSCORE_STORAGE_KEY);
    const timestampRecovered = localStorage.getItem(EMTSTAMP_STORAGE_KEY);

    if(dataRecovered){
        scores = JSON.parse(dataRecovered);
        timeOfLastMark = Number(timestampRecovered);

        return true;
    }

    return false;
}

function mark(energy, humor, motivation, sleep, stress){
    const score = getScore(energy, humor, motivation, sleep, stress);

    timeOfLastMark = Date.now();
    scores.push({
        points: score,
        timestamp: timeOfLastMark
    });
    
    putChartInLoading();

    localStorage.setItem(
        EMTSCORE_STORAGE_KEY, 
        JSON.stringify(scores)
    );

    localStorage.setItem(
        EMTSTAMP_STORAGE_KEY, 
        timeOfLastMark.toString()
    );
}

function recoveryFromBackup(){
    localStorage.setItem(
        EMTSCORE_STORAGE_KEY, 
        JSON.stringify(scores)
    );

    localStorage.setItem(
        EMTSTAMP_STORAGE_KEY, 
        (scores[scores.length - 1].timestamp).toString()
    );
}

function clearAllMemory(){
    if(confirm("Tem certeza que deseja eliminar todos os dados?")){ 
        localStorage.removeItem(EMTSCORE_STORAGE_KEY);
        localStorage.removeItem(EMTSTAMP_STORAGE_KEY); 
        
        initChart();
        
        scores = [];
        timeOfLastMark = 0;     
    }
}