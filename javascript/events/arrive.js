document.addEventListener('DOMContentLoaded', () => {
    if(localStorageRecovering()){
        entryProtocol();
        return;
    }

    initChart();
});