/**
 * 
 * @returns Diferença de horas entre agora e a ultima marcação.
 */
function timestampDiff(){
    const hours = (Date.now()  - timeOfLastMark) / 3600000;

    return Number(
        hours.toFixed(1)
    );
}

/**
 * 
 * @param {number} score Valor numérico de pontuação.
 * @returns Estado da fase correspondente.
 */
function getScoreState(){
    const score = scores[scores.length - 1].points;

    if(score < 5)                   return "LOW_PHASE";
    if(score >= 5 && score < 10)    return "LOW_PHASE_CLOSEST";
    if(score > 20 && score <= 25)   return "HIGH_PHASE_CLOSEST";
    if(score > 25)                  return "HIGH_FASE";

                                    return "NEUTRAL_PHASE";
}

/**
 * @returns Obtém a tendência dos ultimos três scores, sendo subida (ASC), queda (DSC) e estabilidade (N/), junto com intensidade.
 */
function getTrendWithIntensity(invertedPositionIndex = 0){
    const getIntensity = (diff, last) => { 
        if(diff == 0) return 0;

        return Math.abs(diff) / 50 * 100
    }

    const lastIndex = scores.length - 1;

    const last = scores[lastIndex - invertedPositionIndex].points;
    const previous = scores[lastIndex - invertedPositionIndex - 1].points;

    const trendObject = {};
    
    let diff = diffBetweenAnyNumber(last, previous);

    if(last > previous) trendObject.trend = "ASC";
    else if(last < previous) trendObject.trend = "DSC";
    else trendObject.trend = "N/";

    trendObject.intensity = getIntensity(diff, last);

    return trendObject
} 

// Devo olhar direção (subindo/descendo), intensidade(estável/fraco/forte) e área(normal/baixa/auge).