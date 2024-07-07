var json, lang = "es";
fetch("dictionary.json").then(response => response.json()).then(data => {
        json = data;
    }).catch(error => {
        console.error("Error cargando el archivo JSON:", error);
});

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function highlightWords(text, language) {
    Object.values(json).forEach(wordObj => {
        const word = wordObj.name[language];
        const color = wordObj.color;
        const regex = new RegExp(`\\b(${escapeRegExp(word)})\\b`, 'gi');
        text = text.replace(regex, `<span style="color: rgb(${color});">$1</span>`);
    });
    return text;
}

document.getElementById("inputTextarea").addEventListener("input", (event) => {
    const inputText = event.target.value;
    const highlightedText = highlightWords(inputText, lang);
    document.getElementById("outputDiv").innerHTML = highlightedText;
});

const initialText = document.getElementById("inputTextarea").value;
document.getElementById("outputDiv").innerHTML = highlightWords(initialText, lang);