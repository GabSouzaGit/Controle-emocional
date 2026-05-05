function exportData(){
    const downloadDispatcher = document.createElement("a");

    const contentCertified = EXPORT_CERTIFICATION + "***" + JSON.stringify(scores);
    const emtcFile = new Blob([contentCertified], { type: "plain/text" });
    const url = URL.createObjectURL(emtcFile);

    downloadDispatcher.href = url;
    downloadDispatcher.download = `${new Date(Date.now()).getTime()}-backup.emtc`;
    downloadDispatcher.click();
}