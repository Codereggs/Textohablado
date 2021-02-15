// Reproducción de voz

let sintesis = speechSynthesis;

const $form = document.querySelector("form"),
  $texto = document.querySelector("textarea"),
  $selectorVoz = document.querySelector("select"),
  $boton = document.getElementById("boton"),
  $opcion = document.querySelector("select"),
  $idioma = document.getElementById("idiomas");

const listaDeVoces = () => {
  voices = sintesis.getVoices();

  for (i = 0; i < voices.length; i++) {
    let option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    $selectorVoz.appendChild(option);
  }
};

listaDeVoces();

if (speechSynthesis.onvoiceschanged !== undefined)
  speechSynthesis.onvoiceschanged = listaDeVoces;

$form.onsubmit = (event) => {
  event.preventDefault();

  let utterThis = new SpeechSynthesisUtterance($texto.value);
  let selectedOption = $selectorVoz.selectedOptions[0].getAttribute(
    "data-name"
  );
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  sintesis.speak(utterThis);
  $texto.blur();
};

//De acuerdo al tamaño de la pantalla que aparezca la opción de idiomas o no, ya que para moviles no está disponible aún.

if (screen.width < 940) {
  $opcion.remove();
  $idioma.remove();
}

// Primer código hecho con esta API
/*
$boton.addEventListener("click", () => {
  let texto = document.getElementById("texto");
  let valor = texto.value;
  const hablar = () =>
    speechSynthesis.speak(new SpeechSynthesisUtterance(valor));
  hablar();
});
*/
