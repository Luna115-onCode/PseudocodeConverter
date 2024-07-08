function cleanList(inputList) {
    let cleanlist = inputList.map(item => item.trim()).filter(item => item !== "");
    let twoList = [];
    cleanlist.forEach(e => {
        e.replace("\n","");
        twoList.push(e);
    });
    return twoList;
}

function ConverToPython(json, text) {
    console.log(json);
    let textList = text.split(";");
    console.log(textList);
    textList = cleanList(textList);
    console.log(textList);
    console.log(textList[5]);
}