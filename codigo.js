console.log("hola mundo");

let boton = document.getElementById("boton");
boton.addEventListener("click",() => {
    let texto = document.getElementById("texto");
    let valor = texto.value;
    const hablar = () => speechSynthesis.speak(new SpeechSynthesisUtterance(valor));
    hablar();
});

