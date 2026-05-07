/**
 * 
 * @param {string} filename Nome do arquivo.
 */
function getExtension(filename){
    const splitted = filename.split(".");
    return splitted[splitted.length - 1];
}

/**
 * 
 * @param {string} content Conteudo textual do arquivo.
 */
function emtcFileCertified(content){
    const splitted = content.split("***");
    const [certificationInText, data] = splitted;

    const certification = JSON.parse(certificationInText)
    if(certification.flag == EXPORT_FLAG
    && certification.version 
    && certification.createdAt){
        return {
            status: "authenticated",
            from: certification.createdAt,
            data: JSON.parse(data)
        }
    }

    return {
        status: "not-certified",
        data: null
    }
}

function verifyBackupData(data){
    const isArray = Array.isArray(data);

    if(isArray){
        const allDataFormatted = data.every((item) => {
            return Object.hasOwn(item, "points")
                && Object.hasOwn(item, "timestamp")
                && typeof item.points == "number"
                && typeof item.timestamp == "number"
        });

        if(data.length == 0) return 0; // Sem dados.
        if(allDataFormatted) return -1; // Tudo correto.

        return 1; // Dados fora de formato.
    }

    return 2; // Dados não são array.
}

function readFile(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
};

function importData(){
    const dataVerificationError = [
        "O arquivo não contém dados de backup.",
        "O documento está fora do formato de dados ou corrompido.",
        "Documento fora de formato."
    ];

    const fileReceiver = document.createElement("input");
    fileReceiver.type = "file";
    fileReceiver.accept = ".emtc";

    fileReceiver.addEventListener('input', async () => {
        const file = fileReceiver.files[0];

        console.log(file.name)
        
        if(getExtension(file.name) == "emtc"){
            try {
                const asyncEmtcRead = await readFile(file);
                const emtcObject = emtcFileCertified(asyncEmtcRead);

                if(emtcObject.status == "authenticated"){
                    const dataStatus = verifyBackupData(emtcObject.data);
                    
                    if(dataStatus != -1){
                        alert(dataVerificationError[dataStatus]);
                        return;
                    }

                    scores = emtcObject.data;
                    recoveryFromBackup();
                    
                    alert(`Importação concluida com sucesso! Registro recuperado de ${new Date(emtcObject.from).toLocaleDateString()}.`);
                    
                    window.location.reload();
                    return;
                }
                
                alert("O arquivo de backup não está certificado.");
                return;

            }catch(error){
                if(error instanceof SyntaxError){
                    alert("Arquivo provavelmente corrompido, quebrado ou fora de sintaxe. Tente outro ou modifique manualmente.");
                    return;
                }

                alert("Ocorreu um erro desconhecido. Tente outro arquivo ou tente mais tarde.");
                return;
            }
        }

        alert("Importe apenas arquivos com a extensão .emtc")
    })

    fileReceiver.click();
}