function localStorageRecovering(){
    const dataRecovered = localStorage.getItem("EMT_CONTROL_MARKINGS");
    const timestampRecovered = localStorage.getItem("EMT_CONTROL_LAST_TIMESTAMP");

    if(dataRecovered){
        scores = JSON.parse(dataRecovered);
        timeOfLastMark = Number(timestampRecovered);

        return true;
    }

    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorageRecovering()){
        entryProtocol();
        return;
    }

    initChart();
});