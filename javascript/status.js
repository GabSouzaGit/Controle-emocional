const statusMessages = {
    "ok-status": "Muito bem! Volte amanhã para marcar novamente.",
    "daily-status": "Está na hora de fazer sua marcação!",
    "urgent-status": "Marque agora."
}

function updateStatus(status, hoursUrgent = 0){
    markingStatus.className = status;
    markingStatus.textContent = hoursUrgent > 0 ? `${statusMessages[status]} Está cerca de ${hoursUrgent} horas atrasado. Atrasos podem prejudicar sua analise no futuro.` : statusMessages[status];
}