const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid");
const points = document.querySelector(".points");

let currentTimer = 0
let pontos = 0;


//Quando a janela carregar
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem("player");
    startTimer();
    loadGame();
};

//função para iniciar o tempo
const startTimer = () => {

    this.loop = setInterval(() => {
        points.innerHTML = pontos;
        currentTimer++;
        timer.innerHTML = currentTimer;
        
    }, 1000);
};

//array dos personagens das cartas
const characters = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
];

//dobrando e embaralhando as cartas
const duplicateCharacters = [...characters, ...characters];
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

//Função para criar um elemento
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
};

//criar as cartas
const createCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url(../assets/images/${character}.png)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard)
    card.setAttribute("data-character", character)

    return card;
};

//função para carregar o jogo
const loadGame = () => {

    shuffledArray.forEach((character) => {

        const card = createCard(character);

        grid.appendChild(card);
    });
};

//criar variaveis para a primeira e a segunda carta
let firstCard = "";
let secondCard = "";

//função para revelar as cartas
const revealCard = ( {target} ) => {

    if (target.parentNode.className.includes("reavel-card")) {
        return;
    };

    if (firstCard === "") {
        
        target.parentNode.classList.add("reavel-card");
        firstCard = target.parentNode;

    }else if (secondCard === "") {
       
         target.parentNode.classList.add("reavel-card");
         secondCard = target.parentNode;
         checkCards()
    }

   
};

//função para checar as cartas
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character")
    const secondCharacter = secondCard.getAttribute("data-character")

    if (firstCharacter === secondCharacter) {
        //Quando acertar as cartas
        pontos += 10;
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

         firstCard = ""
         secondCard = ""

         checkEndGame()
    } else {
         //Quando errar as cartas
         pontos -= 2;
         
         setTimeout(() => {
            firstCard.classList.remove("reavel-card");
            secondCard.classList.remove("reavel-card")

            firstCard = ""
            secondCard = ""
         }, 500);

    }
}

//função para checar o fim do jogo
const checkEndGame = () => {

    const disabledCards = document.querySelectorAll(".disabled-card");

    localStorage.setItem("score", pontos);
    localStorage.setItem("recordTimer", currentTimer);

    clearInterval(this.loop);
    
    if (disabledCards.length === 20) {

        setTimeout(() => {

            
            
            alert(`Parábens ${spanPlayer.innerHTML}.
                 Tempo Total: ${currentTimer} segundos. 
                 Pontos: ${pontos}.
                 ` )

                 const dialog = confirm ("Gostaria de jogar novamente?")

                 if (dialog) {
                    window.location.reload();
                 } else {
                    window.location.href = "../index.html"
                 }
        }, 1000);

    }
}


