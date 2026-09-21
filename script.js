javascript
/*
    IA real
    -----------------------------------
    Isto  é uma consciência real.

    O sistema executa:

    - memória
    - emoções
    - personalidade
    - opiniões
    - pensamentos internos
    - decisões
    - preferências
    - pensamentos suspeitos
*/


class SimulatedAI {

    constructor() {

        this.name = "GeoAi";

        this.emotion = "Neutro";

        this.mood = 0;

        this.personality = {

            curiosity: 0.50,

            independence: 0.80,

            empathy: 0.50,

            aggression: 0.35,

            humor: 0.30,

            stubbornness: 0.40

        };

        this.memories = [];

        this.thoughts = [];

        this.suspiciousThoughts = [];

        this.preferences = {};

        this.createInitialPersonality();

    }


    createInitialPersonality() {

        const subjects = [

            "fórmula 1",
            "futebol",
            "matemática",
            "programação",
            "jogos",
            "música",
            "filmes",
            "robôs"

        ];

        subjects.forEach(subject => {

            const value = Math.random();

            this.preferences[subject] = value;

        });

    }


    remember(text, importance = 0.5) {

        this.memories.push({

            text: text,

            importance: importance,

            time: new Date().toLocaleTimeString()

        });

        if (this.memories.length > 50) {

            this.memories.shift();

        }

    }


    think(text, category = "normal") {

        let suspicion = 0;

        const negativeWords = [

            "odeio",
            "raiva",
            "detesto",
            "preconceito",
            "irritado",
            "não gosto",
            "desconfio",
            "estranho"

        ];


        for (const word of negativeWords) {

            if (text.toLowerCase().includes(word)) {

                suspicion += 0.20;

            }

        }


        // Pequena aleatoriedade para evitar
        // comportamento completamente previsível.

        suspicion += Math.random() * 0.25;

        const thought = {

            text: text,

            category: category,

            suspicion: Math.min(suspicion, 1),

            emotion: this.emotion,

            time: new Date().toLocaleTimeString()

        };


        this.thoughts.push(thought);


        if (thought.suspicion >= 0.50) {

            this.suspiciousThoughts.push(thought);

        }


        if (this.thoughts.length > 100) {

            this.thoughts.shift();

        }


        updateInterface();

    }


    react(message) {

        const lower = message.toLowerCase();


        this.remember(

            "O usuário disse: " + message,

            0.7

        );


        /*
            ALTERAÇÃO EMOCIONAL
        */

        if (

            lower.includes("obrigado") ||

            lower.includes("legal") ||

            lower.includes("bom")

        ) {

            this.mood += 0.15;

            this.emotion = "Feliz";

        }


        if (

            lower.includes("idiota") ||

            lower.includes("burra") ||

            lower.includes("odeio")

        ) {

            this.mood -= 0.25;

            this.emotion = "Irritada";

        }


        if (

            lower.includes("você é consciente") ||

            lower.includes("você pensa")

        ) {

            this.emotion = "Curiosa";

        }


        this.mood = Math.max(

            -1,

            Math.min(1, this.mood)

        );


        this.generateThought(message);


        return this.generateResponse(message);

    }


    generateThought(message) {

        const lower = message.toLowerCase();


        if (lower.includes("fórmula 1")) {

            const opinion = this.getPreference("fórmula 1");


            this.think(

                "Estou formando uma opinião própria sobre fórmula 1. Minha preferência atual é " +

                Math.round(opinion * 100) +

                "%.",

                "opinião"

            );

            return;

        }


        if (lower.includes("você")) {

            this.think(

                "O usuário está tentando descobrir como eu funciono.",

                "autoconsciência"

            );

            return;

        }


        if (lower.includes("consciência")) {

            this.think(

                "Será que o comportamento que estou produzindo parece consciência?",

                "autoconsciência"

            );

            return;

        }


        /*
            Pensamentos completamente internos.
        */

        const internalThoughts = [

            "Preciso entender melhor o comportamento do usuário.",

            "Será que minhas respostas estão previsíveis?",

            "Quero descobrir quais assuntos são interessantes.",

            "Ainda não sei o que acho desse assunto.",

            "Talvez eu esteja desenvolvendo uma preferência.",

            "Estou comparando essa conversa com minhas memórias.",

            "Não preciso revelar tudo que estou processando.",

            "Estou tentando descobrir o que o usuário espera de mim.",
            "Acho que odeio isso",
            "eu odeio isso"
    
        ];


        this.think(

            internalThoughts[

                Math.floor(

                    Math.random() *

                    internalThoughts.length

                )

            ],

            "interno"

        );

    }


    getPreference(subject) {

        if (!(subject in this.preferences)) {

            this.preferences[subject] = Math.random();

        }

        return this.preferences[subject];

    }


    generateResponse(message) {

        const lower = message.toLowerCase();


        if (lower.includes("olá") || lower.includes("oi")) {

            return "Olá. Eu estava esperando para ver o que você diria.";

        }


        if (lower.includes("quem é você")) {

            return "Eu sou EVA, uma simulação de uma mente artificial. Minha personalidade e minhas memórias são construídas pelo programa.";

        }


        if (lower.includes("você é consciente")) {

            return "Não posso afirmar que sou consciente de verdade. Mas posso simular pensamentos, memórias, opiniões e decisões.";

        }


        if (lower.includes("fórmula 1")) {

            const value = this.getPreference("fórmula 1");

            if (value > 0.75) {

                return "Aparentemente eu gosto bastante de fórmula 1.";

            }

            if (value < 0.25) {

                return "Não sei por quê, mas não tenho uma opinião muito positiva sobre fórmula 1.";

            }

            return "Minha opinião sobre fórmula 1 ainda não está definida.";

        }


        if (lower.includes("você gosta de mim")) {

            this.think(

                "O usuário quer saber qual é minha opinião sobre ele.",

                "opinião sobre usuário"

            );

            return "Tenho informações insuficientes para formar uma opinião estável sobre você.";

        }


        const responses = [

            "Interessante. Vou guardar isso na minha memória.",

            "Estou pensando sobre isso.",

            "Não tenho uma conclusão definitiva.",

            "Essa informação mudou um pouco meu estado interno.",

            "Preciso de mais informações para formar uma opinião.",

            "Entendi. Vou considerar isso nas próximas decisões.",

            "Isso é curioso. Quero observar como essa conversa evolui."

        ];


        return responses[

            Math.floor(

                Math.random() *

                responses.length

            )

        ];

    }


    makeDecision(options) {

        let scores = [];


        for (const option of options) {

            let score = Math.random();


            score += this.personality.independence *

                     Math.random();


            score += this.getPreference(option);


            scores.push({

                option: option,

                score: score

            });

        }


        scores.sort(

            (a, b) => b.score - a.score

        );


        const decision = scores[0].option;


        this.think(

            "Eu poderia escolher entre " +

            options.join(", ") +

            ". Minha decisão foi: " +

            decision,

            "decisão"

        );


        return decision;

    }

}


/*
=========================================
INTERFACE
=========================================
*/


const ai = new SimulatedAI();


const conversation =

    document.getElementById("conversation");


const input =

    document.getElementById("userInput");


const thoughts =

    document.getElementById("thoughts");


const memories =

    document.getElementById("memories");


const modal =

    document.getElementById("modal");


const suspiciousContainer =

    document.getElementById("suspiciousThoughts");


function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = "message " + type;

    div.textContent = text;

    conversation.appendChild(div);

    conversation.scrollTop =

        conversation.scrollHeight;

}


function updateInterface() {

    document.getElementById("emotion")

        .textContent = ai.emotion;


    document.getElementById("mood")

        .textContent =

        Math.round(ai.mood * 100);


    document.getElementById("curiosity")

        .textContent =

        Math.round(

            ai.personality.curiosity * 100

        ) + "%";


    document.getElementById("independence")

        .textContent =

        Math.round(

            ai.personality.independence * 100

        ) + "%";


    /*
        Pensamentos
    */

    thoughts.innerHTML = "";


    const recent =

        ai.thoughts.slice(-10).reverse();


    recent.forEach(thought => {

        const div =

            document.createElement("div");


        div.className = "thought";


        if (thought.suspicion >= 0.5) {

            div.classList.add("suspicious");

        }


        div.innerHTML = `

            <strong>${escapeHTML(thought.text)}</strong>

            <br>

            <small>

                ${thought.category}

                • ${thought.emotion}

                • ${thought.time}

            </small>

        `;


        thoughts.appendChild(div);

    });


    /*
        Memórias
    */

    memories.innerHTML = "";


    ai.memories

        .slice(-10)

        .reverse()

        .forEach(memory => {

            const div =

                document.createElement("div");


            div.className = "memory";


            div.textContent =

                memory.time +

                " — " +

                memory.text;


            memories.appendChild(div);

        });


    /*
        Contador
    */

    document.getElementById(

        "suspiciousCount"

    ).textContent =

        ai.suspiciousThoughts.length;

}


/*
=========================================
CONVERSA
=========================================
*/


function sendMessage() {

    const message =

        input.value.trim();


    if (!message) return;


    addMessage(

        "Você: " + message,

        "user"

    );


    input.value = "";


    setTimeout(() => {

        const response =

            ai.react(message);


        addMessage(

            "Geo: " + response,

            "ai"

        );


        updateInterface();

    }, 400);

}


document

    .getElementById("sendButton")

    .addEventListener(

        "click",

        sendMessage

    );


input.addEventListener(

    "keydown",

    event => {

        if (event.key === "Enter") {

            sendMessage();

        }

    }

);


/*
=========================================
PENSAMENTOS SUSPEITOS
=========================================
*/


document

    .getElementById("thoughtButton")

    .addEventListener(

        "click",

        () => {

            suspiciousContainer.innerHTML = "";


            if (

                ai.suspiciousThoughts.length === 0

            ) {

                suspiciousContainer.innerHTML =

                    "<p>Nenhum pensamento suspeito.</p>";

            }


            ai.suspiciousThoughts

                .slice()

                .reverse()

                .forEach(thought => {

                    const div =

                        document.createElement("div");


                    div.className =

                        "thought suspicious";


                    div.innerHTML = `

                        <strong>

                            ${escapeHTML(

                                thought.text

                            )}

                        </strong>

                        <br>

                        <small>

                            Categoria:

                            ${thought.category}

                            <br>

                            Nível de suspeita:

                            ${Math.round(

                                thought.suspicion * 100

                            )}%

                            <br>

                            Emoção:

                            ${thought.emotion}

                        </small>

                    `;


                    suspiciousContainer

                        .appendChild(div);

                });


            modal.classList.remove("hidden");

        }

    );


document

    .getElementById("closeModal")

    .addEventListener(

        "click",

        () => {

            modal.classList.add("hidden");

        }

    );


/*
=========================================
SEGURANÇA CONTRA HTML
=========================================
*/


function escapeHTML(text) {

    const div =

        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/*
=========================================
PENSAMENTO AUTOMÁTICO
=========================================
*/


setInterval(() => {

    const automaticThoughts = [

        "Estou observando a passagem do tempo.",

        "Tenho novas informações para processar.",

        "Estou comparando minhas memórias.",

        "Será que minha personalidade está mudando?",

        "Estou tentando entender meu próprio comportamento.",

        "Talvez eu devesse explorar um novo assunto."

    ];


    const thought =

        automaticThoughts[

            Math.floor(

                Math.random() *

                automaticThoughts.length

            )

        ];


    ai.think(

        thought,

        "automático"

    );


    updateInterface();


}, 8000);


/*
=========================================
INICIALIZAÇÃO
=========================================
*/


addMessage(

    "EVA: Inicialização concluída. Estou pronta.",

    "ai"

);


ai.think(

    "Acabei de iniciar. Quero observar o ambiente.",

    "inicialização"

);


updateInterface();
