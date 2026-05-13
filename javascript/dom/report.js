function generateTextAnimation(text){
    const report = document.createElement("div");
    const div = document.createElement("div");
    
    reportWindowContent.appendChild(div);

    report.innerHTML = text;

    let index = 0;
    let interval = setInterval(() => {
        if(index == report.childNodes.length) {
            clearInterval(interval);
            return;
        }
        
        div.appendChild(report.childNodes[index]);
        index++
    }, 200);
}

async function fetchReport(){
    const httpErrors = {
        429: "Aguarde um momento, há muitos acessos ocorrendo. Tente novamente em breve.",
        400: "Falha na requisição. Verifique os dados enviados",
        500: "Erro interno. Tente novamente mais tarde.",
        503: "Serviço temporáriamente indisponivel. Tente novamente mais tarde."
    }

    try {
        const report = await fetch("http://localhost:5000/toai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(scores)
        });

        if(report.ok) return await report.json();

        return Promise.reject(
            { 
                message:
                    Object.hasOwn(
                        httpErrors, 
                        report.status
                    ) ? httpErrors[report.status] : "Ocorreu um erro inesperado. Verifique sua conexão ou tente novamente mais tarde."
            }
        );
    }catch(error){
        throw new Error("Parece que a conexão com o servidor caiu. Verifique sua conexão ou tente novamente mais tarde.")
    }
}

function prepareUnavailableMessage(){
    const div = document.createElement("div");
        div.textContent = "Sem dados suficientes para o relatório.";
        return div
}

function callErrorMessage(error){
    const div = document.createElement("div");
        div.textContent = error;
        div.id = "error-report-message";
    
    reportWindowContent.appendChild(div);
}

function openReportWindow(){
    if(reportWindow.classList.contains(REPORT_WINDOW_OPEN)) return;

    reportWindow.classList.remove(REPORT_WINDOW_CLOSED);
    reportWindow.classList.add(REPORT_WINDOW_OPEN);
}

function closeReportWindow(){
    if(reportWindow.classList.contains(REPORT_WINDOW_CLOSED)) return;

    reportWindow.classList.remove(REPORT_WINDOW_OPEN);
    reportWindow.classList.add(REPORT_WINDOW_CLOSED);
}

async function pickUserReportChoice(){
    return await Swal.fire({
        title: "<strong>Relatório pronto</strong>",
        icon: "question",
        html: `
            <p>Seu relatório está pronto para ser gerado.<br/>Deseja uma análise de 28 dias ou de todo o período?</p>
        `,
        showCloseButton: true,
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonText: "28 dias",
        denyButtonText: "Todo o período"
    });
}

function setLoading(state = true){
    reportWindowContent.innerHTML = "";

    if(state != true) return;

    const container = document.createElement("div");
        container.id = "loading-container";

    const [ reportLoading, loadingLegend ] = new Array(2)
                                                .fill()
                                                .map(indexes => document.createElement("div"));
    
    reportLoading.id = "report-loading";
    loadingLegend.id = "legend";

    loadingLegend.textContent = "Gerando seu relatório...";

    container.append(
        reportLoading, 
        loadingLegend
    );

    reportWindowContent.appendChild(container);
}

async function tryGetReport(event){
    if(scores.length < 0){ // <- TEMP
        const unavailableMessage = prepareUnavailableMessage();
        reportWindowContent.appendChild(unavailableMessage);
        openReportWindow();
        return;
    }

    const swalChoice = await pickUserReportChoice();

    if(swalChoice.isDismissed) return;

    try {
        openReportWindow();
        setLoading();
            let { report, date } = await fetchReport();
        setLoading(false);

        /*
        if (swalChoice.isConfirmed) { // 28 dias
            
            return;
        }
    
        if (swalChoice.isDenied) { // Todo o periodo
            
            return;
        }
        */

        // Trecho para melhorar (como todo o resto kkkk)

            const pDate = document.createElement('p');
            pDate.innerHTML = `<b>${date}<b>`;
            reportWindowContent.appendChild(pDate);

        /* --- */ 
        
        generateTextAnimation(report);
    }catch(error){
        setLoading(false);
        callErrorMessage(error.message);
    }   
}