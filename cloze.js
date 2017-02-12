var inquirer = require("inquirer");

var score = 0;

function BasicCard(frontText, backText) {
	this.frontText = frontText;
	this.backText = backText;
};

function ClozeCard (fullText, clozeText, partialText) {
	this.fullText = fullText;  //  the full text
	this.clozeText = clozeText;  // text that needs to be replaced with ...
	this.partialText = partialText;
};

ClozeCard.prototype.returnClozeText = function() {
	console.log("this cloze = " + this.clozeText);
	return(this.clozeText);
}

ClozeCard.prototype.returnFullText = function() {
	console.log("this full = " + this.fullText);
	return(this.fullText);
}

ClozeCard.prototype.returnPartialText = function() {
	console.log("this partial = " + this.partialText);
	return(this.partialText);
}

var fullTextArray = ["George Washington was the first president of the United States", "Donald Trump received 3 million fewer votes than his opponent", "On February 10, 2017 Earth’s penumbral shadow was on the moon", "Web developer certificate course in UNC-CH is called Coding BootCamp", "Sweetened carbonated beverages are a major cause of obesity", "Donald Trump has promised to invest in America’s infrastructure", "Our sun burns Hydrogen to give us light and heat", "There are five inhabited continents on Earth"];

var clozeTextArray = ["George Washington", "3 million", "penumbral", "Coding BootCamp", "obesity", "infrastructure", "Hydrogen", "five"];

var partialTextArray = [" ... was the first president of the United States", "Donald Trump received ... fewer votes than his opponent", "On February 10, 2017 Earth’s ... shadow was on the moon", "Web developer certificate course in UNC-CH is called ... ", "Sweetened carbonated beverages are a major cause of ... ", "Donald Trump has promised to invest in America’s ... ", "Our sun burns ... to give us light and heat", "There are ... inhabited continents on Earth"];


var loopVar = 0;
var clozeCardsArray = [];

function createClozeCardsArray () {
	if (clozeCardsArray.length < fullTextArray.length) {
		var tempClozeCard = new ClozeCard;
		tempClozeCard.fullText = fullTextArray[loopVar];
		tempClozeCard.clozeText = clozeTextArray[loopVar];
		tempClozeCard.partialText = partialTextArray[loopVar];
		clozeCardsArray.push(tempClozeCard);
		loopVar++;
		createClozeCardsArray();
	} else {  // clozeCardsArray has been filled up
		// console.log(clozeCardsArray);
		playGame(0);
	}  // play the Cloze Game
}

function playGame (x) {
	if (x < clozeCardsArray.length) {
		var stringToBePrinted = clozeCardsArray[x].returnPartialText();
		console.log("string to be printed = " + stringToBePrinted);

		inquirer.prompt([
			{
				name: "userGuess",
				message: "Your answer?"
			}
		]).then(function(answer) {
			console.log("answer = " + clozeCardsArray[x].clozeText);
			if (answer.userGuess.toLowerCase() === clozeCardsArray[x].clozeText.toLowerCase()){
				console.log("You are right !!!");
				score++;
			} else {
				console.log("Sorry you are wrong");
			}
			playGame(x+1);
		});
	} else {  // gone through all cloze texts
		console.log("you scored " + score);
	}
}

createClozeCardsArray();