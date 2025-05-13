const allNotas = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const escalasMaiores = {
  C: ["C", "Dm", "Em", "F", "G", "Am", "Bº"],
  "C#": ["C#", "D#m", "E#m", "F#", "G#", "A#m", "Cº"],
  D: ["D", "Em", "F#m", "G", "A", "Bm", "C#º"],
  "D#": ["D#", "Em", "F#m", "G#", "A#", "B#m", "Cº"],
  E: ["E", "F#m", "G#m", "A", "B", "C#m", "D#º"],
  F: ["F", "Gm", "Am", "A#", "C", "Dm", "Eº"],
  "F#": ["F#", "G#m", "A#m", "B", "C#", "D#m", "Fº"],
  G: ["G", "Am", "Bm", "C", "D", "Em", "F#º"],
  "G#": ["G#", "A#m", "Bm", "C#", "D#", "Fm", "F#º"],
  A: ["A", "Bm", "C#m", "D", "E", "F#m", "G#º"],
  "A#": ["A#", "Cm", "C#m", "D#", "F", "G#m", "Aº"],
  B: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#º"],
};

function transporDiatonico(acorde, tomOriginal, tomDestino) {
  const escalaOrig = escalasMaiores[tomOriginal];
  const escalaDest = escalasMaiores[tomDestino];

  if (!escalaOrig || !escalaDest) {
    throw new Error("Tom não suportado");
  }

  const idx = escalaOrig.findIndex(
    (n) => n.toLowerCase() === acorde.toLowerCase()
  );
  if (idx === -1) return acorde; // Acorde fora da escala

  return escalaDest[idx];
}

function transporTexto(texto, tomOrig, tomDest) {
  return texto.replace(/\[([A-G][#b]?m?(º)?)\]/g, (_, acorde) => {
    const novo = transporDiatonico(acorde, tomOrig, tomDest);
    return `[${novo}]`;
  });
}

const addCifraEl = document.querySelector("#add-cifra");
const showTonsEl = document.querySelector("#show-tons");
const tomCreatedEl = document.querySelector("#tom-created");
const showCifraEl = document.querySelector("#show-cifra");
const tomSelectedEl = document.querySelector("#tom-selected");
const showSelectedEl = document.querySelector("#select-tons");

let tomSelected = "";
let tomCreated = "G";
let cifraHTML = "";

tomCreatedEl.innerHTML = "Tom: " + tomCreated;

const cifraExemplo = `
[Em]                 [C]
    Porque Dele e por Ele
        [D]              [Em]
    Para Ele são todas as coisas 
   
            [G]
    A Ele a glória
            [G] [D] [Em]
    A Ele a gló--ò--ria
            [C] [Bm]
    A Ele a glória
                [Em]
    Pra sempre Amém

[Em]                 [C]
    Quão profundas riquezas
        [D]              [Em]
    O saber e o conhecer de Deus
              [C]
    Quão insondáveis
          [D]            [Em]
    Seus juízos e Seus caminhos


            [G]
    A Ele a glória
            [G] [D] [Em]
    A Ele a gló--ò--ria
            [C] [Bm]
    A Ele a glória
                [Em]
    Pra sempre Amém


`;

const writecifraEl = document.querySelector("#writecifra");
writecifraEl.innerHTML = cifraExemplo;
