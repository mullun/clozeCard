function BasicCard(front, back) {
	this.front = front;
	this.back = back;
};

function CloseCard (text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.returnFullText = function(){
		return(this.text);
	};
	this.returnCloze = function(){
		return(this.cloze);
	};
};

