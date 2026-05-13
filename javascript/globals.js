const REPORT_WINDOW_OPEN = "report-open"
const REPORT_WINDOW_CLOSED = "report-closed"

const PROGRAM_VERSION = "1.6";
const EXPORT_FLAG = "EMT_CONTROL_CERTIFICATION";

const EXPORT_CERTIFICATION = {
    flag: EXPORT_FLAG,
    version: PROGRAM_VERSION,
    createdAt: null
};

const EMTSCORE_STORAGE_KEY = "EMT_CONTROL_MARKINGS";
const EMTSTAMP_STORAGE_KEY = "EMT_CONTROL_LAST_TIMESTAMP";

const chartContainer = document.querySelector("#chart");
const markingStatus = document.querySelector("#marking-status");
const evaluationData = document.querySelector("#evaluation-data");
const reportWindow = document.querySelector("#ai-report");
const reportWindowContent = document.querySelector("#ai-report main");

// Botões da página
const sendButton = document.querySelector("#send");
const restartButton = document.querySelector("#restart");
const clearAllButton = document.querySelector("#clear-all");
const exportButton = document.querySelector("#export");
const importButton = document.querySelector("#import");
const aiReportButton = document.querySelector("#ai-report-dispatcher");
const reportWindowCloseButton = document.querySelector("#report-window-close-button");
const reportWindowOpenButton = document.querySelector("#report-window-open-button");

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

const chartSchema = {
    chart: {
        type: 'line'
    },
    fill: {
        type: "solid"
    },
    colors: ['#000'],
    stroke: {
        curve: 'smooth',
    },
    annotations: {
        yaxis: [
            {
                y: 40,
                y2: 25,
                fillColor: 'hsl(10, 100%, 70%)',
            },
            {
                y: 25,
                y2: 20,
                fillColor: 'hsl(10, 100%, 80%)',
            },
            {
                y: 20,
                y2: 10,
                fillColor: '#fff',
                label: { text: "Estável" }
            },
            {
                y: 10,
                y2: 5,
                fillColor: 'hsl(200, 60%, 50%)',
            },
            {
                y: 5,
                y2: -10,
                fillColor: 'hsl(210, 30%, 50%)',
            }
        ]
    },
    series: [{
        name: 'Score',
        data: []
    }],
    xaxis: {
        type: "datetime"
    },
    yaxis: {
        max: MAX_TOTAL_SCORE,
        min: MIN_TOTAL_SCORE,
        tickAmount: 10
    }
}
