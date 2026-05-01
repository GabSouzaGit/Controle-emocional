const chartContainer = document.querySelector("#chart");
const markingStatus = document.querySelector("#marking-status");
const evaluationData = document.querySelector("#evaluation-data");

const sendButton = document.querySelector("#send");
const restartButton = document.querySelector("#restart");

const OK_MARKING_STATUS = "ok-status";
const DAILY_MARKING_STATUS = "daily-status";
const URGENT_MARKING_STATUS = "urgent-status";

const LIMIT_OF_MARKINGS = 100;
const MAX_INPUT_SCORE = 10;
const MIN_TOTAL_SCORE = getScore(0, 0, 0, 0, MAX_INPUT_SCORE);
const MAX_TOTAL_SCORE = getScore(
    MAX_INPUT_SCORE,
    MAX_INPUT_SCORE,
    MAX_INPUT_SCORE,
    MAX_INPUT_SCORE,
    0
);

const PHASES = {
    "NEUTRAL_PHASE": {
        phase: "Estável",
        asc: "Ainda Estável.",
        dsc: "Ainda Estável.",
        n: "Ainda Estável."
    },
    "LOW_PHASE": {
        phase: "Baixa",
        asc: "Saindo da Baixa (estabilizando)",
        dsc: "Intensificando Baixa",
        n: "Baixa Constante"
    },
    "HIGH_PHASE": {
        phase: "Auge",
        asc: "Intensificando Auge.",
        dsc: "Decaindo do Auge (estabilizando).",
        n: "Auge Constante."
    },
    "LOW_PHASE_CLOSEST": {
        phase: "Proximo da Baixa",
        asc: "Saindo da Baixa",
        dsc: "Entrando na Baixa",
        n: "Perto da Baixa"
    },
    "HIGH_PHASE_CLOSEST": {
        phase: "Proximo do Auge",
        asc: "Entrando no Age",
        dsc: "Saido do Auge",
        n: "Perto do Auge"
    }
}

let scores = [];
let timeOfLastMark = 0;
