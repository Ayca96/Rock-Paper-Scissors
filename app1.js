//! Secim Selectors

let yourCoiceDiv = document.getElementById("your-choice");
const pcCoiceDiv = document.getElementById("pc-choice");

//! Message

const messagePar = document.querySelector(".message");

//! Colors
const YELLOW = "#FFC538";
const RED = "#FB778B";
const GREEN = "#5AB7AC";

//! Variables
const userSelectImg = document.createElement("img");
const pcSelectImg = document.createElement("img");
let userSelection; // Kullanicinin sectigi
let pcRandom; // pc nin rastgele sectigi
let pcArr = []; // pc secim dizisi

//! Score

const scoreCardSection = document.querySelector(".score-card");
const pcScoreSpan = document.getElementById("pc-score");
const yourScoreSpan = document.getElementById("your-score");
const domTopscore = document.getElementById("top-score");


//! Modal

const modalCardSection = document.querySelector(".modal-card")
const finalMessagePar = document.getElementById("final-message")
const playAgainButton = document.getElementById("play-again")
const modal = document.querySelector(".modal")

//! Selection
const selectionArticle = document.querySelector(".selection");

selectionArticle.addEventListener("click", (e) => {
  // e = event
  //console.log(e.target.id);
  userSelection = e.target.id;

  if (userSelection) {
    userSelectImg.src = `./assets/${userSelection}.png`;
    userSelectImg.id = "you"
    yourCoiceDiv.appendChild(userSelectImg);
  }
  createPCSelection();
});


const createPCSelection = () => {
  pcArr = ["rock", "paper", "scissor"];
  pcRandom = "rock" // hile fonksiyonu
  //pcRandom = Math.floor( Math.random()*3) //1. yöntem
 // pcRandom = pcArr[Math.trunc(Math.random() * 3)]; //2.yöntem
  //console.log(pcRandom);
  pcSelectImg.src = `./assets/${pcRandom}.png`;
  pcSelectImg.id = "pcs"
  pcCoiceDiv.appendChild(pcSelectImg);

  calculateResult();
};

const calculateResult = () => {
  console.log(userSelection, pcRandom);
  if (userSelection == pcRandom) {
    //console.log("Draw");
    draw();
  } else {
    if (userSelection == "rock") {
      pcRandom === "paper" ? youLost(userSelection) : youWin(pcRandom);
    } else if (userSelection === "scissor") {
      pcRandom === "rock" ? youLost(userSelection) : youWin(pcRandom);
    } else if (userSelection === "paper") {
      pcRandom === "scissor" ? youLost(userSelection) : youWin(pcRandom);
    }
  }

  if (pcScoreSpan.textContent === "10" || yourScoreSpan.textContent === "10") {
      openModal()
  }
};

const draw = () => {
  messagePar.textContent = "It'a d draw";
  scoreCardSection.style.color = YELLOW;
  messagePar.style.backgroundColor = YELLOW;
};

const youLost = (userSelection) => {
  //console.log("You Lost");
  messagePar.textContent = "You Lost"
  scoreCardSection.style.color= RED;
  messagePar.style.backgroundColor = RED;
  pcScoreSpan.textContent++
  document.getElementById("you").setAttribute("src", `./assets/${userSelection}l.png`)
}

const youWin = (pcRandom) => {
  //console.log("You Win");
  messagePar.textContent = "You Win";
  scoreCardSection.style.color = GREEN;
  messagePar.style.backgroundColor = GREEN;
  yourScoreSpan.textContent++
  document.getElementById("pcs").setAttribute("src", `./assets/${pcRandom}l.png`)
}

const openModal = () => {
 modalCardSection.classList.add("show")

 if (yourScoreSpan.textContent == "10") {
  finalMessagePar.textContent = "You Win 🎊"
  modal.style.backgroundColor = GREEN;
  playAgainButton.style.color= GREEN;
  updateTopScore()

 } else {
  finalMessagePar.textContent = "You Lost 😔"
  modal.style.backgroundColor = RED;
  playAgainButton.style.color= RED;
 }
}


playAgainButton.addEventListener("click", ()=>{
 window.location.reload()

})

//! Top Score check
const storedScore = localStorage.getItem("highScore") // localstorage den veri varsa alir.
console.log(storedScore);// null 
const topScore = storedScore ? `10 - ${storedScore}`: "0 - 0"
domTopscore.innerText = topScore // DOM a yazdiriyor


function updateTopScore (){
if (!storedScore || storedScore > +pcScoreSpan.textContent) {
  
  localStorage.setItem("highScore",pcScoreSpan.textContent)

}
  

}


domTopscore.addEventListener("dblclick", () => {
  localStorage.removeItem("highScore")
})


