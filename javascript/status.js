const statusMessages = {
    "ok-status": "Muito bem! Volte amanhã para marcar novamente.",
    "daily-status": "Está na hora de fazer sua marcação!",
    "urgent-status": "Marque agora."
}

function updateStatus(status, hoursDiff = 0){
    markingStatus.className = status;
    markingStatus.textContent = status == URGENT_MARKING_STATUS ? `${statusMessages[status]} Está cerca de ${hoursDiff} horas atrasado. Atrasos podem prejudicar sua analise no futuro.` : `${statusMessages[status]} (marcado a ${hoursDiff} horas).`;
}