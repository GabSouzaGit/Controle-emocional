/**
 * 
 * @param {string} filename Nome do arquivo.
 */
function getExtension(filename){
    const splitted = filename.split(".");
    return splitted[splitted.length - 1]
}

/**
 * 
 * @param {string} content Conteudo textual do arquivo.
 */
function emtcFileCertified(content){
    const splitted = content.split("***");
    const [certification, data] = splitted;

    console.log(certification);
    

    if(certification == EXPORT_CERTIFICATION){
        return {
            status: "authenticated",
            data: JSON.parse(data)
        }
    }

    return {
        status: "not-certified",
        data: null
    }
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
    const fileReceiver = document.createElement("input");
    fileReceiver.type = "file";

    fileReceiver.addEventListener('input', async () => {
        const file = fileReceiver.files[0];
        
        if(getExtension(file.name) == "emtc"){
            try {
                const asyncEmtcRead = await readFile(file);
                const emtcObject = emtcFileCertified(asyncEmtcRead);
                
                if(emtcObject.status == "authenticated"){
                    alert("Importação concluida com sucesso!");
                    
                    scores = emtcObject.data;
                    recoveryFromBackup();
                    
                    window.location.reload();
                    return;
                }
                
                alert("O arquivo de backup não está certificado.");
                return;

            }catch(error){
                console.log(error)
                alert("Ocorreu um erro ao ler o arquivo.");
            }
        }

        alert("Importe apenas arquivos com a extensão .emtc")
    })

    fileReceiver.click();
}