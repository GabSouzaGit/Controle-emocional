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