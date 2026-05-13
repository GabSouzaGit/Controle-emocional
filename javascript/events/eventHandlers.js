function getAllInputs(){
    return [
       Number(document.querySelector('#energy').value),
       Number(document.querySelector('#humor').value),
       Number(document.querySelector('#motivation').value),
       Number(document.querySelector('#sleep').value),
       Number(document.querySelector('#stress').value)
    ]
}

sendButton.addEventListener('click', () => {
    const inputs = getAllInputs();

    for(let i = 0; i < inputs.length; i++){
        if(!onLimit(inputs[i])) {
            alert("Insira apenas valores de 0 a 5.");
            return;
        }
    }

    scoreLauchingProtocol(inputs);
});

restartButton.addEventListener('click', () => {
    function inputs(){
        return [
            document.querySelector('#energy'),
            document.querySelector('#humor'),
            document.querySelector('#motivation'),
            document.querySelector('#sleep'),
            document.querySelector('#stress')
        ]
    }

    const ipts = inputs();

    for(let i = 0; i < ipts.length; i++){
        ipts[i].value = 0;
    }
});

clearAllButton.addEventListener('click', clearAllMemory);
exportButton.addEventListener('click', exportData);
importButton.addEventListener('click', importData);

aiReportButton.addEventListener('click', tryGetReport);
reportWindowCloseButton.addEventListener('click', closeReportWindow);
reportWindowOpenButton.addEventListener('click', openReportWindow);

