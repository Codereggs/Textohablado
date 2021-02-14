// Reproducir voz con distintos parámetros
let sintesis = window.speechSynthesis;

let form = document.querySelector("form");
let texto = document.querySelector("textarea");
let selectorVoz = document.querySelector("select");
let download = document.getElementById("download");

function populateVoiceList() {
  voices = sintesis.getVoices();

  for (i = 0; i < voices.length; i++) {
    let option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    selectorVoz.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

form.onsubmit = function (event) {
  event.preventDefault();

  let utterThis = new SpeechSynthesisUtterance(texto.value);
  let selectedOption = selectorVoz.selectedOptions[0].getAttribute("data-name");
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  sintesis.speak(utterThis);
  texto.blur();
};

// Primer código para reproducirlo

/*
  let boton = document.getElementById("boton");
boton.addEventListener("click",() => {
    let texto = document.getElementById("texto");
    let valor = texto.value;
    const hablar = () => speechSynthesis.speak(new SpeechSynthesisUtterance(valor));
    hablar();
});
*/
