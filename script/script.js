$hamButton = document.querySelector('.ham-btn')

$hamButton.addEventListener('click', () => {
    document.getElementsByClassName("navigation")[0].classList.toggle("active");
})

/* Timer */

var divJours = document.querySelector('.jour');
var divHeures = document.querySelector('.heure');
var divMinutes = document.querySelector('.minute');
var divSecondes = document.querySelector('.seconde');
  
setInterval(() => {
    let now = moment()
    let goal = moment('01//04/2021 00:00:00', 'DD/MM/YYYY HH:mm:ss')
  
    let duration = moment.duration(goal.diff(now))
  
    var days = duration.asDays()
    var hours = duration.hours()
    var minutes = duration.minutes()
    var seconds = duration.seconds()
    
    divJours.innerHTML =  Math.floor(days);
    divHeures.innerHTML =  hours;
    divMinutes.innerHTML =  minutes;
    divSecondes.innerHTML =  seconds;
  
}, 250)

/* Gallerie */
const slider = document.querySelector(".items");
const slides = document.querySelectorAll(".item");
const button = document.querySelectorAll(".button");

let current = 0;
let prev = 4;
let next = 1;

for (let i = 0; i < button.length; i++) {
	button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
}

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);
const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
	    slides[i].classList.remove("active");
	    slides[i].classList.remove("prev");
	    slides[i].classList.remove("next");
    }

	if (next == 5) {
		next = 0;
	}

	if (prev == -1) {
		prev = 4;
	}

	slides[current].classList.add("active");
	slides[prev].classList.add("prev");
	slides[next].classList.add("next");
}

/* Quizz */
function Quiz(questions) {
    this.marron = ["Je vole à son secours, tel un héros celte","Bourré, complètement déchiré et probablement pas dans mon lit","Je cache tout dans mon coffre fort, personne ne doit le savoir !","Fort Boyard","Hommes"];
    this.jackson = ["J’appelle la police, ils sauront quoi faire eux","Nu comme un ver","J’investis tout en bourse, je suis le plus malin des Hommes","In Ze Boîte","Corps"];
    this.dalton = ["Je l'assomme en prime","Je ne dors pas","Je pars faire le tour du monde en trottinette électrique","Le Bigdil","Cœur"];
    this.pnj = ["Je fais semblant de n'avoir rien vu","Habillé de la tête au pied pour gagner du temps","J’en fais profiter mes proches","Le Maillon Faible","Cerveau"];
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function() {
     this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
function Question(text, choices) {
    this.text = text;
    this.choices = choices;
}

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};
 
t1 = [];
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        t1.push(guess);
        console.log(t1)
        populate();
    }
};

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " sur " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Résultat</h1>";

    if(arrayEquals(t1, quiz.marron)){
        gameOverHTML += "<h2 id='score-h2'>Vous êtes le fameux Inspecteur Marron !</h2><p id='score'>Il ne faut pas se fier aux apparences...Derrière votre côté désinvolte et peu impliqué, vous êtes un grand penseur, votre logique est sans faille et vous parvenez toujours à vous sortir des situations les plus complexes ! Est-ce uniquement dû à votre intellect ou à votre chance inégalée ? Cependant, vous avez tendance à renoncer rapidement et à vous renfermer sur vous-même...</p>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }else if(arrayEquals(t1, quiz.jackson)){
        gameOverHTML += "<h2 id='score-h2'>Vous êtes le fidèle Jackson !</h2><p id='score'>Vous êtes quelqu’un de loyal, l’amitié et la famille sont ce qu’il y a de plus important pour vous, c’est lorsque vous êtes accompagné de ceux qui vous sont chers que vous êtes meilleur. Derrière votre apparence soignée, vous êtes peu organisé et avez besoin de quelqu’un pour vous guider. Vous possédez aussi un mental d’acier, vous ne renoncez jamais devant la défaite et ferez tout ce qui est en votre pouvoir pour parvenir à vos objectifs.</p>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }else if(arrayEquals(t1, quiz.dalton)){
        gameOverHTML += "<h2 id='score-h2'>Vous êtes le grand et sinistre Dalton ! </h2><p id='score'>Pour vous, la fin justifie les moyens. Malicieux et fourbe, votre ambition n’a aucune limite et vous ne reculez devant rien. Vous êtes rusé et parvenez toujours à surmonter les obstacles sur votre chemin. Vous avez une totale confiance en vous et en vos capacités, ce qui vous fait parfois prendre des risques insensés mais ils s’avèrent toujours payants. Cependant, derrière votre air froid et autoritaire, vous savez vous montrer bon envers ceux qui vous sont loyaux.</p>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }else if(arrayEquals(t1, quiz.pnj)){
        gameOverHTML += "<h2 id='score-h2'>Mince, vous êtes un garde de Dalton !</h2><p id='score'>Vous êtes un PNJ… Une sorte de personnage sans réelle personnalité, un suiveur, un mouton … Vous avez vraiment répondu sérieusement aux questions ?</p>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }else{
        let x = Math.floor((Math.random() * 4) + 1);
        if(x == 1){
            gameOverHTML += "<h2 id='score-h2'>Vous êtes le fameux Inspecteur Marron !</h2><p id='score'>Il ne faut pas se fier aux apparences...Derrière votre côté désinvolte et peu impliqué, vous êtes un grand penseur, votre logique est sans faille et vous parvenez toujours à vous sortir des situations les plus complexes ! Est-ce uniquement dû à votre intellect ou à votre chance inégalée ? Cependant, vous avez tendance à renoncer rapidement et à vous renfermer sur vous-même...</p>";
            var element = document.getElementById("quiz");
            element.innerHTML = gameOverHTML;
        }else if(x == 2){
            gameOverHTML += "<h2 id='score-h2'>Vous êtes le fidèle Jackson !</h2><p id='score'>Vous êtes quelqu’un de loyal, l’amitié et la famille sont ce qu’il y a de plus important pour vous, c’est lorsque vous êtes accompagné de ceux qui vous sont chers que vous êtes meilleur. Derrière votre apparence soignée, vous êtes peu organisé et avez besoin de quelqu’un pour vous guider. Vous possédez aussi un mental d’acier, vous ne renoncez jamais devant la défaite et ferez tout ce qui est en votre pouvoir pour parvenir à vos objectifs.</p>";
            var element = document.getElementById("quiz");
            element.innerHTML = gameOverHTML;
        }else if(x == 3){
            gameOverHTML += "<h2 id='score-h2'>Vous êtes le grand et sinistre Dalton ! </h2><p id='score'>Pour vous, la fin justifie les moyens. Malicieux et fourbe, votre ambition n’a aucune limite et vous ne reculez devant rien. Vous êtes rusé et parvenez toujours à surmonter les obstacles sur votre chemin. Vous avez une totale confiance en vous et en vos capacités, ce qui vous fait parfois prendre des risques insensés mais ils s’avèrent toujours payants. Cependant, derrière votre air froid et autoritaire, vous savez vous montrer bon envers ceux qui vous sont loyaux.</p>";
            var element = document.getElementById("quiz");
            element.innerHTML = gameOverHTML;
        }else if(x == 4){
            gameOverHTML += "<h2 id='score-h2'>Mince, vous êtes un garde de Dalton !</h2><p id='score'>Vous êtes un PNJ… Une sorte de personnage sans réelle personnalité, un suiveur, un mouton … Vous avez vraiment répondu sérieusement aux questions ?</p>";
            var element = document.getElementById("quiz");
            element.innerHTML = gameOverHTML;
        }
    }
};

// create questions here
var questions = [
    new Question("Une femme se fait voler son sac dans la rue, que faites-vous ?", ["Je l'assomme en prime", "Je vole à son secours, tel un héros celte", "Je fais semblant de n'avoir rien vu", "J’appelle la police, ils sauront quoi faire eux"]),
    new Question("Comment dormez-vous ?", ["Habillé de la tête au pied pour gagner du temps", "Nu comme un ver", "Bourré, complètement déchiré et probablement pas dans mon lit", "Je ne dors pas"]),
    new Question("Vous gagnez au loto, que faites-vous ?", ["J’investis tout en bourse, je suis le plus malin des Hommes", "J’en fais profiter mes proches","Je pars faire le tour du monde en trottinette électrique", "Je cache tout dans mon coffre fort, personne ne doit le savoir !"]),
    new Question("Quelle est votre émission télé favorite ?", ["In Ze Boîte", "Le Bigdil", "Fort Boyard", "Le Maillon Faible"]),
    new Question("Le chef est à sa troupe ce que la tête est au...", ["Hommes", "Corps", "Cerveau", "Cœur"]),
    
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();