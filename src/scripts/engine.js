// Define constantes para os elementos do DOM
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

// Cria um objeto de áudio
const audio = new Audio();

// Cria uma função para tocar uma nota musical
const playTune = key => {
  // Define o caminho do arquivo de áudio
  audio.src = `src/tunes/${key}.wav`;
  // Toca o áudio
  audio.play();
  // Adiciona a classe "active" à tecla correspondente
  pianoKeys.forEach(k => k.classList.toggle("active", k.dataset.key === key));
  // Remove a classe "active" após 150 milissegundos
  setTimeout(() => pianoKeys.forEach(k => k.classList.remove("active")), 150);
};

// Adiciona um evento de clique a cada tecla do piano
pianoKeys.forEach(k => k.addEventListener("click", () => playTune(k.dataset.key)));

// Adiciona um evento de teclado ao documento
document.addEventListener("keydown", e => {
  // Obtém o conjunto de notas musicais
  const keysData = new Set(Array.from(pianoKeys).map(key => key.dataset.key));
  // Verifica se a tecla pressionada é uma nota musical válida
  if (keysData.has(e.key)) {
    // Toca a nota musical correspondente
    playTune(e.key);
  }
});

// Cria uma função para ajustar o volume do áudio
const handleVolume = e => audio.volume = e.target.value;

// Cria uma função para mostrar ou esconder as teclas do piano
const showHideKeys = () => pianoKeys.forEach(key => key.classList.toggle("hide"));

// Adiciona um evento de entrada ao controle deslizante de volume
volumeSlider.addEventListener("input", handleVolume);

// Adiciona um evento de clique à caixa de seleção de teclas
keysCheck.addEventListener("click", showHideKeys);