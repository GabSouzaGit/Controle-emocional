function exportData(){
    const downloadDispatcher = document.createElement("a");
    const certification = { ...EXPORT_CERTIFICATION };
    
    certification.createdAt = new Date();

    const contentCertified = JSON.stringify(certification) + "***" + JSON.stringify(scores);
    const emtcFile = new Blob([contentCertified], { type: "plain/text" });
    const url = URL.createObjectURL(emtcFile);

    downloadDispatcher.href = url;
    downloadDispatcher.download = `${new Date(Date.now()).getTime()}-backup.emtc`;
    downloadDispatcher.click();

    URL.revokeObjectURL(url);
}