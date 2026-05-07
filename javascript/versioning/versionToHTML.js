const versions = document.querySelector("#versions");
let lastVer = "";

function versionText(version, text){
    return `<li> <b> ${version}: </b> ${text} </li>`
}

function convertTree(tree = versionTree){
    let versionLevel = 0;
    let html = "";

    const recursive = (tree, ver) => {
        let currentVersion = 1;
        html += "<ul>"

        for(let i = 0; i < tree.length; i++){
            const subtree = tree[i];
            const subversion = `${ver}.${currentVersion}`

            html += versionText(subversion, subtree[0]);
            lastVer = subversion;
            currentVersion++;

            if(subtree[1].length > 0) recursive(subtree[1], subversion)
        }

        html += "</ul>";

        return;
    }

    for(let i = 0; i < tree.length; i++){
        const subtree = tree[i];

        versionLevel = i + 1;
        html += versionText(versionLevel+".0", subtree[0]);

        if(subtree[1].length > 0) recursive(subtree[1], versionLevel);
        html += "<hr>"
    }

    console.log("Ultima versão:", lastVer)

    versions.innerHTML = html;
}

convertTree();