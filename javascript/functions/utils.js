/**
 * 
 * @param {number} energy Contabilizador de energia.
 * @param {number} humor Contabilizador de humor.
 * @param {number} motivation Contabilizador de motivação.
 * @param {number} sleep Contabilizador de sono.
 * @param {number} stress Contabilizador de estresse.
 * @returns {number} Pontuação que representa estado psicológico atual do usuário.
 */
function getScore(energy, humor, motivation, sleep, stress){
    return (energy + humor + motivation + sleep) - stress;
}

/**
 * 
 * @param {number} a Qualquer numero.
 * @param {number} b Qualquer numero.
 * @returns Obtem a diferença entre eles mesmo quando são sinais diferentes.
 */
function diffBetweenAnyNumber(a, b){
    if(a < 0 && b >= 0
    || b < 0 && a >= 0) return Math.abs(a) + Math.abs(b);

    if(a < 0 && b < 0) return Math.abs(a < b ? Math.abs(b) + a : Math.abs(a) + b);
    if(a == b) return 0;

    return Math.abs(a - b);
}

/**
 * 
 * @param {number} trend Valor da tendência.
 * @returns Tendencia + Intensidade (para interface).
 */
const floatingEvalutation = (trend) => {
    const trendConversion = {
        ASC: "Subida",
        DSC: "Queda"
    }

    /**
     * @param {number} intensity Intensidade da queda/subida.
     */
    return (intensity) => {
        if(trend == "N/") return "Estável."
        if(intensity >= 15)                     return `${trendConversion[trend]} forte.`;
        if(intensity >= 10 && intensity < 15)   return `${trendConversion[trend]} fraca.`;
        if(intensity < 10)                      return `${trendConversion[trend]} fraquissima ou estável.`;
    }
}