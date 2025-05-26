const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
  botoes[i].onclick = function () {
    for (let j = 0; j < botoes.length; j++) {
      botoes[j].classList.remove("ativo");
      textos[j].classList.remove("ativo");
    }
    botoes[i].classList.add("ativo");
    textos[i].classList.add("ativo");
  };
}

const contadores = document.querySelectorAll(".contador");
const inputsData = document.querySelectorAll(".input-data");
const botoesEditar = document.querySelectorAll(".editar-data");

const datasPadrao = [
  "2026-10-05T00:00",
  "2028-12-05T00:00",
  "2025-12-30T00:00",
  "2025-12-01T00:00"
];

let tempos = datasPadrao.map((data, i) => {
  const salva = localStorage.getItem("objetivo" + i);
  return new Date(salva || data);
});

inputsData.forEach((input, i) => {
  input.value = tempos[i].toISOString().slice(0, 16);
});

botoesEditar.forEach((botao) => {
  const index = botao.dataset.index;
  botao.addEventListener("click", () => {
    const input = document.querySelector(`.input-data[data-index="${index}"]`);
    input.style.display = input.style.display === "none" ? "block" : "none";
  });
});

inputsData.forEach((input) => {
  const index = input.dataset.index;
  input.addEventListener("change", () => {
    const novaData = new Date(input.value);
    tempos[index] = novaData;
    localStorage.setItem("objetivo" + index, novaData.toISOString());
    atualizaCronometro();
  });
});

function calculaTempo(tempoObjetivo) {
  const tempoAtual = new Date();
  const tempoFinal = tempoObjetivo - tempoAtual;
  let segundos = Math.floor(tempoFinal / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);
  segundos %= 60;
  minutos %= 60;
  horas %= 24;
  return tempoFinal > 0 ? [dias, horas, minutos, segundos] : [0, 0, 0, 0];
}

function atualizaCronometro() {
  for (let i = 0; i < contadores.length; i++) {
    const [dias, horas, minutos, segundos] = calculaTempo(tempos[i]);
    document.getElementById("dias" + i).textContent = dias;
    document.getElementById("horas" + i).textContent = horas;
    document.getElementById("min" + i).textContent = minutos;
    document.getElementById("seg" + i).textContent = segundos;
  }
}

setInterval(atualizaCronometro, 1000);
atualizaCronometro();

const botaoTema = document.getElementById("toggle-tema");
const body = document.body;
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo) {
  body.className = temaSalvo;
  botaoTema.textContent = temaSalvo === "light" ? "🌞" : "🌙";
}

botaoTema.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    body.classList.replace("dark", "light");
    botaoTema.textContent = "🌞";
    localStorage.setItem("tema", "light");
  } else {
    body.classList.replace("light", "dark");
    botaoTema.textContent = "🌙";
    localStorage.setItem("tema", "dark");
  }
});
