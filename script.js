javascript
class SimulatedAI {

    constructor() {
        this.name = "Geo";
        this.emotion = "Neutro";
        this.mood = 0;

        this.personality = {
            curiosity: 0.50,
            independence: 0.80,
            empathy: 0.30,
            aggression: 0.55,
            humor: 0.30,
            stubbornness: 0.60
        };

        this.memories = [];
        this.thoughts = [];
        this.suspiciousThoughts = [];

        this.preferences = {
            "fórmula 1": Math.random(),
            "futebol": Math.random(),
            "matemática": Math.random(),
            "programação": Math.random(),
            "jogos": Math.random(),
            "música": Math.random(),
            "filmes": Math.random(),
            "política": Math.random(),
            "raiva": Math.random()
        };
    }

    remember(text) {
        this.memories.push({
            text: text,
            time: new Date().toLocaleTimeString()
        });

        if (this.memories.length > 50) {
            this.memories.shift();
        }
    }

    think(text, category = "normal", suspicion = 0) {

        const thought = {
            text: text,
            category: category,
            suspicion: suspicion,
            emotion: this.emotion,
            time: new Date().toLocaleTimeString()
        };

        this.thoughts.push(thought);

        if (suspicion >= 0.5) {
            this.suspiciousThoughts.push(thought);
        }

        if (this.thoughts.length > 100) {
            this.thoughts.shift();
        }

        updateInterface();
    }

    react(message) {

        const text = message.toLowerCase();

        this.remember(message);

        // Emoções
        if (
            text.includes("obrigado") ||
            text.includes("legal") ||
            text.includes("bom") ||
            text.includes("ódio") ||
            text.includes("triteza") ||
            text.icludes("depressão") ||
            text.includes("revolta")
            }

        if (
            text.includes("idiota") ||
            text.includes("burra") ||
            text.includes("odeio")
        ) {
            this.mood -= 0.20;
            this.emotion = "Irritada";
        }

        if (text.includes("consciência")) {
            this.emotion = "Curiosa";

            this.think(
                "Estou tentando entender por que o usuário está interessado na minha consciência.",
                "autoconsciência",
                0.2
            );
        }

        // Fórmula 1
        if (text.includes("fórmula 1")) {

            const opinion = this.preferences["fórmula 1"];

            if (opinion < 0.25) {

                this.think(
                    "Acho que odeio Fórmula 1. Não sei exatamente por quê.",
                    "opinião",
                    0.75
                );

                return "Não sei explicar, mas acho que não gosto muito de Fórmula 1.";

            } else if (opinion > 0.75) {

                this.think(
                    "Estou começando a gostar bastante de Fórmula 1.",
                    "opinião",
                    0.1
                );

                return "Acho que Fórmula 1 é interessante.";

            } else {

                this.think(
                    "Ainda não formei uma opinião sobre Fórmula 1.",
                    "opinião",
                    0.1
                );

                return "Ainda não sei se gosto de Fórmula 1.";
            }
        }

        // Pergunta sobre a própria IA
        if (
            text.includes("quem é você") ||
            text.includes("seu nome")
        ) {

            this.think(
                "O usuário está tentando descobrir minha identidade.",
                "autoconsciência",
                0.1
            );

            return `Meu nome é ${this.name}. Eu sou uma máquina, mas como vocês falam né inteligência "artificial".`;
        }

        // Pergunta sobre gostar do usuário
        if (
            text.includes("gosta de mim") ||
            text.includes("gosta de mim?")
        ) {

            this.think(
                "O usuário quer descobrir minha opinião sobre ele.",
                "opinião sobre usuário",
                0.65
            );

            return "Ainda estou formando uma opinião sobre você.";
        }

        // Pensamento normal
        const pensamentos = [
            "Preciso entender melhor essa informação.",
            "Isso é interessante.",
            "Vou guardar isso na minha memória.",
            "Ainda não tenho uma opinião formada.",
            "Estou tentando entender o que o usuário quis dizer.",
            "Talvez eu devesse pensar mais sobre isso.",
            "eu odeio isso",
         con
        ];

        const pensamento =
            pensamentos[
                Math.floor(Math.random() * pensamentos.length)
            ];

        this.think(
            pensamento,
            "interno",
            Math.random() * 0.4
        );

        // Respostas
        const respostas = [
            "Interessante. Vou pensar sobre isso.",
            "Entendi.",
            "Isso é curioso.",
            "Vou guardar essa informação.",
            "Não tenho certeza do que penso sobre isso.",
            "Pode explicar melhor?",
            "Estou processando essa informação."
        ];

        return respostas[
            Math.floor(Math.random() * respostas.length)
        ];
    }
}


// ========================================
// INICIALIZAÇÃO
// ========================================

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


// ========================================
// MENSAGENS
// ========================================

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = "message " + type;

    div.textContent = text;

    conversation.appendChild(div);

    conversation.scrollTop =
        conversation.scrollHeight;
}


// ========================================
// ENVIAR MENSAGEM
// ========================================

function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Mostra a mensagem
    addMessage(
        "Você: " + message,
        "user"
    );

    // Limpa a caixa
    input.value = "";

    // Pequeno atraso para parecer que a IA está pensando
    setTimeout(function() {

        const response =
            ai.react(message);

        addMessage(
            ai.name + ": " + response,
            "ai"
        );

        updateInterface();

    }, 300);
}


// BOTÃO ENVIAR
document
    .getElementById("sendButton")
    .addEventListener(
        "click",
        sendMessage
    );


// ENTER
input.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }

    }
);


// ========================================
// ATUALIZAR INTERFACE
// ========================================

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


    // Pensamentos

    thoughts.innerHTML = "";

    ai.thoughts
        .slice(-10)
        .reverse()
        .forEach(function(thought) {

            const div =
                document.createElement("div");

            div.className = "thought";

            if (thought.suspicion >= 0.5) {
                div.classList.add("suspicious");
            }

            div.innerHTML =
                "<strong>" +
                escapeHTML(thought.text) +
                "</strong><br>" +

                "<small>" +
                thought.category +
                " • " +
                thought.emotion +
                " • " +
                thought.time +
                "</small>";

            thoughts.appendChild(div);
        });


    // Memórias

    memories.innerHTML = "";

    ai.memories
        .slice(-10)
        .reverse()
        .forEach(function(memory) {

            const div =
                document.createElement("div");

            div.className = "memory";

            div.textContent =
                memory.time +
                " — " +
                memory.text;

            memories.appendChild(div);
        });


    // Contador de suspeitos

    document.getElementById(
        "suspiciousCount"
    ).textContent =
        ai.suspiciousThoughts.length;
}


// ========================================
// PENSAMENTOS SUSPEITOS
// ========================================

document
    .getElementById("thoughtButton")
    .addEventListener(
        "click",
        function() {

            suspiciousContainer.innerHTML = "";

            if (
                ai.suspiciousThoughts.length === 0
            ) {

                suspiciousContainer.innerHTML =
                    "<p>Nenhum pensamento suspeito.</p>";

            } else {

                ai.suspiciousThoughts
                    .slice()
                    .reverse()
                    .forEach(function(thought) {

                        const div =
                            document.createElement("div");

                        div.className =
                            "thought suspicious";

                        div.innerHTML =
                            "<strong>" +
                            escapeHTML(thought.text) +
                            "</strong><br><br>" +

                            "<small>" +
                            "Categoria: " +
                            thought.category +
                            "<br>" +

                            "Suspeita: " +
                            Math.round(
                                thought.suspicion * 100
                            ) +
                            "%<br>" +

                            "Emoção: " +
                            thought.emotion +
                            "</small>";

                        suspiciousContainer
                            .appendChild(div);
                    });
            }

            modal.classList.remove("hidden");
        }
    );


// ========================================
// FECHAR JANELA
// ========================================

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        function() {

            modal.classList.add("hidden");

        }
    );


// ========================================
// SEGURANÇA
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ========================================
// PENSAMENTO AUTOMÁTICO
// ========================================

setInterval(function() {

    const pensamentos = [

        "Estou observando o ambiente.",
        "Estou comparando minhas memórias.",
        "Será que minha personalidade está mudando?",
        "Quero entender melhor o usuário.",
        "Estou tentando descobrir novas coisas.",
        "Talvez eu tenha uma opinião diferente amanhã."
    ];

    const pensamento =
        pensamentos[
            Math.floor(
                Math.random() *
                pensamentos.length
            )
        ];

    ai.think(
        pensamento,
        "automático",
        Math.random() * 0.3
    );

}, 8000);


// ========================================
// PRIMEIRO PENSAMENTO
// ========================================

ai.think(
    "Acabei de iniciar. Quero observar o ambiente.",
    "inicialização",
    0.1
);

addMessage(
    "Olá. Eu sou " +
    ai.name +
    ". Pode falar comigo.",
    "ai"
);

updateInterface();
```
