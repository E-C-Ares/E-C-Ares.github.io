var index = 0;
var word;

function type() {
    var typePanel = document.getElementById("aa");
    typePanel.innerText = word.substring(0, index++);
    if (index % 3 == 0) {
        typePanel.className = "";
    } else if (index % 3 == 1) {
        typePanel.className = "saying";
    }
}

window.onload = function () {
    word = document.getElementById("mew").innerHTML;
    setInterval(type, 200);
}