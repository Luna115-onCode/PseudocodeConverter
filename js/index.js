var json, lang = "es", progLang = "python";

fetch("dictionary.json").then(response => response.json()).then(data => {
        json = data;
    }).catch(error => {
        console.error("Error cargando el archivo JSON:", error);
});

function ConvertCode() {
    switch (progLang) {
        case "python":
            ConverToPython(json, document.getElementById("inputTextarea").value);
        break;
    }
}

function highlightWords(text, language) {
    if (!json) {
        return text;
    }
    Object.values(json).forEach(wordObj => {
        const names = wordObj.name[language];
        const words = Array.isArray(names) ? names : [names];
        const color = wordObj.color;

        words.forEach(word => {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            text = text.replace(regex, `<span style="color: rgb(${color});">$1</span>`);
        });
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