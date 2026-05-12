function prepareUnavailableMessage(){
    const div = document.createElement("div");
        div.textContent = "Não é possivel gerar relatório agora";
        return div
}

function openRelatoryWindow(){
    if(relatoryWindow.classList.contains(RELATORY_OPEN)) return;

    relatoryWindow.classList.remove(RELATORY_CLOSED);
    relatoryWindow.classList.add(RELATORY_OPEN);
}

function closeRelatoryWindow(){
    if(relatoryWindow.classList.contains(RELATORY_CLOSED)) return;

    relatoryWindow.classList.remove(RELATORY_OPEN);
    relatoryWindow.classList.add(RELATORY_CLOSED);
}

function tryGetRelatory(event){
    relatoryWindowContent.innerHTML = "";

    if(scores.length < 28){
        const unavailableMessage = prepareUnavailableMessage();
        relatoryWindowContent.appendChild(unavailableMessage);
        openRelatoryWindow()
        return;
    }
}