function emotionStateDeterminator(phase, trend){
    if(trend == "ASC"){
        return PHASES[phase].asc;
    }
    if(trend == "DSC"){
        return PHASES[phase].dsc;
    }
    
    return PHASES[phase].n;
}

function scoreAnalylis(){
    if(scores.length < 2){
        return;
    }
    
    const { trend, intensity } = getTrendWithIntensity();
    const state = getScoreState();

    evaluationData.innerHTML = ""; 

    const currentState = document.createElement("div");
    const floatingAnalysis = document.createElement("div");
    const emotionalState = document.createElement("div");

    currentState.innerHTML     = `Estado atual: <b>${PHASES[state].phase}</b>`;
    floatingAnalysis.innerHTML = `Analise de flutuação: <b>${floatingEvalutation(trend)(intensity)}</b>`;
    emotionalState.innerHTML   = `Direcionamento: <b>${emotionStateDeterminator(state, trend)}</b>`;

    evaluationData.appendChild(currentState);
    evaluationData.appendChild(floatingAnalysis);
    evaluationData.appendChild(emotionalState);
}

/**
 * 
 * @param {number[]} inputs Todos os valores numericos inseridos pelo usuário no registro.
 */
function scoreLauchingProtocol(inputs = []){
    const [
        energy,
        humor,
        motivation,
        sleep,
        stress
    ]= inputs;

    mark(
        energy,
        humor,
        motivation,
        sleep,
        stress
    );

    updateStatus(OK_MARKING_STATUS);
    updateChart();

    scoreAnalylis();
}

function entryProtocol(){
    updateChart();
    scoreAnalylis();

    const hoursDiff = timestampDiff();

    if(hoursDiff < 24){
        updateStatus(OK_MARKING_STATUS, hoursDiff);
        return;
    }
    if(hoursDiff >= 24
    && hoursDiff <= 48){
        updateStatus(DAILY_MARKING_STATUS, hoursDiff);
        return;
    }
    
    updateStatus(URGENT_MARKING_STATUS, hoursDiff);
}