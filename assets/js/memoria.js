const form = document.querySelector ("form");
const input = document.querySelector("input");
const button = document.querySelector("button");

//função para acionar o botão jogar
const validateInput = ({target}) => {

if (target.value.length > 2) {
    
    button.removeAttribute('disabled')
    return
}

button.setAttribute('disabled', '');

};

//função para guardar o nome no local storage
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("player", input.value);
    input.value = "";

    window.location = "pages/game.html"
};


form.addEventListener("submit", handleSubmit);
input.addEventListener("input", validateInput)