const defaultPatchMessages = [
    "Correção de bugs",
    "Melhoria de manutenção"
]

const patch = (i) => defaultPatchMessages[i];

const versionTree = [
    [
        "Gráfico, 5 campos parametrizaveis, envio e reset de campos, e avaliação de dados do gráfico (tendência).",
        [
            [ "Nova interface de gráfico, divida em áreas (auge, +/-, estável, +/-, baixa)", []],
            [
                "Exibição de diferença de horas",
                [
                    [patch(0), []],
                    [patch(0), []]
                ]
            ],
            [
                "Limpeza de todos os dados do localStorage por botão",
                [
                    [patch(1), []]
                ]
            ],
            [
                "Importação e exportação registros por arquivo .emtc",
                [
                    [patch(1), []]
                ]
            ],
            [
                "Log de versões do sistema (esta tela ^_-)",
                [
                    ["Melhoria de usabilidade da importação (recebimento de arquivo .emtc)", []],
                    [patch(0), []],
                    ["Mais camadas de verificação na importação e exportação", []]
                ]
            ]
        ],
    ]
]