let currentPlayer ="red";
var redPlayerPos=0;
var whitePlayerPos=0;
var winnerExists = false;
var allInButtEnabled = false;
var allInEnabled = false;
function setPositions() {
	var positions=[];
	var snakePositions   =[13,38,46,73,81,87]
	var snakeNewPositions=[2,17,26,43,51,67]

	var ladderPositions   =[3,9,32,48,56,78]
	var ladderNewPositions=[4,28,72,59,86,89]
	
	var snakes_or_ladders_Positions   =[25,65,70]
	var snakes_or_ladders_NewPositions=["5 or 45","44 or 74","49 or 90"]


	for (var i = 1; i <=90 ; i++) {
	 positions[i]=new Object();
	 positions[i].from=i;
	 
	  
	 if(snakePositions.indexOf(i)!=-1){
	   positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   positions[i].type="Snake";
	 }
	 else if(ladderPositions.indexOf(i)!=-1){
	   positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
	   positions[i].type="Ladders";
	 }
	 else if(snakes_or_ladders_Positions.indexOf(i)!=-1){
	   positions[i].to=snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
	   positions[i].type="Snake or Ladders";
	 }
	 else if(i===16 || i===47 || i===68 || i===84){
		positions[i].to="Other Player position";
		positions[i].type="Sheep";   
	 }
	 else if(i===21 || i===40 || i===57 || i===75){
		positions[i].to="1 with "+(100-i)+"% possibility or 90 with "+i+" % possibility";
		positions[i].type="ALL IN";
	 }
	 else{
	   positions[i].to=i;
		positions[i].type="Normal";   
	   
	 }
	}
	 return positions; 
	}

function rollDice(){
	const diceResult = Math.floor(Math.random()*6)+1;
	document.getElementById('infobox').value = "Dice shows: "+diceResult+"\n";
	const diceImg = document.getElementById('diceImage');
	diceImg.src = `ImagesDice/dice${diceResult}.png`;
	diceImg.style.display = 'block';
	if(diceResult !== 6){
		play(diceResult);
		if(hasPlayerWon()===false){
			changePlayerTurn();
		}
	}else{
		play(diceResult);
		document.getElementById('infobox').value += "You play again!\n";
	}
	return diceResult;
}

function play(diceNumber){
	if(currentPlayer==="red"){
		if(redPlayerPos!==0){
			eraseOldPosition(redPlayerPos,currentPlayer);
		}
		if(redPlayerPos+diceNumber>90){
			if(redPlayerPos+diceNumber===91){
				redPlayerPos=89;
				eraseOldPosition(redPlayerPos,currentPlayer);
				changePosition(89,currentPlayer);
			}else if(redPlayerPos+diceNumber===92){
				redPlayerPos=88;
				eraseOldPosition(redPlayerPos,currentPlayer);
				changePosition(88,currentPlayer);
			}else if(redPlayerPos+diceNumber===93){
				redPlayerPos=87;
				eraseOldPosition(redPlayerPos,currentPlayer);
				changePosition(87,currentPlayer);
			} else if(redPlayerPos+diceNumber===94){
				redPlayerPos=86;
				eraseOldPosition(redPlayerPos,currentPlayer);
				changePosition(86,currentPlayer);
			}else if(redPlayerPos+diceNumber===95){
				redPlayerPos=85;
				eraseOldPosition(redPlayerPos,currentPlayer);
				changePosition(85,currentPlayer);
			}else{
				document.getElementById('infobox').value = "!!!---RED OUT OF BOARD---!!!\n";
			}
		}else if(redPlayerPos+diceNumber===90){
			changePosition(90,currentPlayer);
			isWinner("red");
		}else if(redPlayerPos===3 || redPlayerPos===9 || redPlayerPos===32 || redPlayerPos===48 || redPlayerPos===56 || redPlayerPos===78){
			ladderMove();
		}else if(redPlayerPos===13 || redPlayerPos===38 || redPlayerPos===46 || redPlayerPos===73 || redPlayerPos===81 || redPlayerPos===87){
			snakeMove();
		}else if(redPlayerPos===25 || redPlayerPos===65 || redPlayerPos===70){
			snakeANDladder();
		}else if(redPlayerPos===16 || redPlayerPos===47 || redPlayerPos===68 || redPlayerPos===84){
			sheep();
		}else if(redPlayerPos===21 || redPlayerPos===40 || redPlayerPos===57 || redPlayerPos===75){
			enableAllIn();
		}else{
			redPlayerPos+=diceNumber;
		}
		if(winnerExists===false && allInEnabled===false){
			changePosition(redPlayerPos,currentPlayer);
		}

	}else if(currentPlayer==="white"){
		if(whitePlayerPos!==0){
			eraseOldPosition(whitePlayerPos,currentPlayer);
		}
		if(whitePlayerPos+diceNumber>90){
			if(whitePlayerPos+diceNumber===91){
				whitePlayerPos=89;
				eraseOldPosition(whitePlayerPos,currentPlayer);
				changePosition(89,currentPlayer);
			}else if(whitePlayerPos+diceNumber===92){
				whitePlayerPos=88;
				eraseOldPosition(whitePlayerPos,currentPlayer);
				changePosition(88,currentPlayer);
			}else if(whitePlayerPos+diceNumber===93){
				whitePlayerPos=87;
				eraseOldPosition(whitePlayerPos,currentPlayer);
				changePosition(87,currentPlayer);
			}else if(whitePlayerPos+diceNumber===94){
				whitePlayerPos=86;
				eraseOldPosition(whitePlayerPos,currentPlayer);
				changePosition(86,currentPlayer);
			}else if(whitePlayerPos+diceNumber===95){
				whitePlayerPos=85;
				eraseOldPosition(whitePlayerPos,currentPlayer);
				changePosition(85,currentPlayer);
			}else{
				document.getElementById('infobox').value = "!!!---WHITE OUT OF BOARD---!!!\n";
			}
		}else if(whitePlayerPos+diceNumber===90){
			changePosition(90,currentPlayer);
			isWinner("white");
		}else if(whitePlayerPos===3 || whitePlayerPos===9 || whitePlayerPos===32 || whitePlayerPos===48 || whitePlayerPos===56 || whitePlayerPos===78){
			ladderMove();
		}else if(whitePlayerPos===13 || whitePlayerPos===38 || whitePlayerPos===46 || whitePlayerPos===73 || whitePlayerPos===81 || whitePlayerPos===87){
			snakeMove();
		}else if(whitePlayerPos===25 || whitePlayerPos===65 || whitePlayerPos===70){
			snakeANDladder();
		}if(whitePlayerPos===16 || whitePlayerPos===47 || whitePlayerPos===68 || whitePlayerPos===84){
			sheep();
		}else if(whitePlayerPos===21 || whitePlayerPos===40 || whitePlayerPos===57 || whitePlayerPos===75){
			enableAllIn();
		}else{
			whitePlayerPos+=diceNumber;
		}
		if(winnerExists===false && allInEnabled===false){
			changePosition(whitePlayerPos,currentPlayer);
		}
	}
}

function getPlayerTurn(){
	return currentPlayer;
}

function changePlayerTurn(){
	if (currentPlayer === "white") {
		currentPlayer = "red";
	} else {
		currentPlayer = "white";
	}
	document.getElementById('infobox').value += currentPlayer+" plays next.\n";
	return currentPlayer;
}

function randomPlayerPick(){
	const randomNumber = Math.floor(Math.random()*2);
	if(randomNumber===1){
		return "red";
	}else{
		return "white";
	}
}

function ladderMove(){
	if(currentPlayer ==="red"){
		if(redPlayerPos===3){
			redPlayerPos=4;
		}else if(redPlayerPos===9){
			redPlayerPos=28;
		}else if(redPlayerPos===32){
			redPlayerPos=72;
		}else if(redPlayerPos===48){
			redPlayerPos=59;
		}else if(redPlayerPos===56){
			redPlayerPos=86;
		}else if(redPlayerPos===78){
			redPlayerPos=89;
		}
	}else if(currentPlayer === "white"){
		if(whitePlayerPos===3){
			whitePlayerPos=4;
		}else if(whitePlayerPos===9){
			whitePlayerPos=28;
		}else if(whitePlayerPos===32){
			whitePlayerPos=72;
		}else if(whitePlayerPos===48){
			whitePlayerPos=59;
		}else if(whitePlayerPos===56){
			whitePlayerPos=86;
		}else if(whitePlayerPos===78){
			whitePlayerPos=89;
		}
	}
}

function snakeMove(){
	if(currentPlayer ==="red"){
		if(redPlayerPos===13){
			redPlayerPos=2;
		}else if(redPlayerPos===38){
			redPlayerPos=17;
		}else if(redPlayerPos===46){
			redPlayerPos=26;
		}else if(redPlayerPos===73){
			redPlayerPos=43;
		}else if(redPlayerPos===81){
			redPlayerPos=51;
		}else if(redPlayerPos===87){
			redPlayerPos=67;
		}
	}else if(currentPlayer === "white"){
		if(whitePlayerPos===13){
			whitePlayerPos=2;
		}else if(whitePlayerPos===38){
			whitePlayerPos=17;
		}else if(whitePlayerPos===46){
			whitePlayerPos=26;
		}else if(whitePlayerPos===73){
			whitePlayerPos=43;
		}else if(whitePlayerPos===81){
			whitePlayerPos=51;
		}else if(whitePlayerPos===87){
			whitePlayerPos=67;
		}
	}
}

function enableAllIn(){
	document.getElementById("allInButton").disabled=false;
	allInButtEnabled = true;
	if(currentPlayer==="white"){
		document.getElementById('infobox').value = "----ALL IN?----\nChance to WIN: "+whitePlayerPos+"%\nChance to FAIL: "+(100-whitePlayerPos)+"%\n";
	}else if(currentPlayer==="red"){
		document.getElementById('infobox').value = "----ALL IN?----\nChance to WIN: "+redPlayerPos+"%\nChance to FAIL: "+(100-redPlayerPos)+"%\n";
	}
}

function allIn(){
	const randomChance = Math.random();
	changePlayerTurn();
	if(allInEnabled!==false){
		if(currentPlayer==="white"){
			if(randomChance<(whitePlayerPos/100)){
				whitePlayerPos=90;
				changePosition(90,"white");
				isWinner("white");
			}else{
				whitePlayerPos=1;
				changePosition(1,"white");
			}
		}else if(currentPlayer==="red"){
			if(randomChance<(redPlayerPos/100)){
				redPlayerPos=90;
				changePosition(90,"red");
				isWinner("red");
			}else{
				redPlayerPos=1;
				changePosition(1,"red");
			}
		}
	}
	allInButtEnabled=false;
	document.getElementById("allInButton").disabled=true;
}

function snakeANDladder(){
	const grade = Math.floor(Math.random()*11);
	document.getElementById('infobox').value += "Student grade: "+grade+". ";
	if(grade>4){
		document.getElementById('infobox').value += "PASS!\n";
	}else{
		document.getElementById('infobox').value += "FAIL!\n";
	}

	if(currentPlayer==="white"){
		if(whitePlayerPos===25){
			if(grade>4){
				whitePlayerPos=45;
			}else{
				whitePlayerPos=5;
			}
		}else if(whitePlayerPos===65){
			if(grade>4){
				whitePlayerPos=74;
			}else{
				whitePlayerPos=44;
			}
		}else if(whitePlayerPos===70){
			if(grade>4){
				whitePlayerPos=90;
			}else{
				whitePlayerPos=49;
			}
		}
	}else{
		if(redPlayerPos===25){
			if(grade>4){
				redPlayerPos=45;
			}else{
				redPlayerPos=5;
			}
		}else if(redPlayerPos===65){
			if(grade>4){
				redPlayerPos=74;
			}else{
				redPlayerPos=44;
			}
		}else if(redPlayerPos===70){
			if(grade>4){
				redPlayerPos=90;
			}else{
				redPlayerPos=49;
			}
		}
	}
}

function sheep(){

	if(currentPlayer==="white"){
		if(whitePlayerPos===16 || whitePlayerPos===47 || whitePlayerPos===68 || whitePlayerPos===84){
			if(redPlayerPos ===whitePlayerPos){
				changePlayerTurn();
				rollDice();
			}else{
				whitePlayerPos=redPlayerPos;
			}
		}
	}else if(currentPlayer ==="red"){
		if(redPlayerPos===16 || redPlayerPos===47 || redPlayerPos===68 || redPlayerPos===84){
			if(redPlayerPos ===whitePlayerPos){
				changePlayerTurn();
				rollDice();
			}else{
				redPlayerPos=whitePlayerPos;
			}
		}
	}
}

function newGame(){
	const redPos = document.getElementById("position" + redPlayerPos);
	const whitePos = document.getElementById("position" + whitePlayerPos);
	const lastPos = document.getElementById("position" + 90);
	const diceImg = document.getElementById('diceImage');
	redPos.innerHTML= "<img  src='images/"+redPlayerPos+".png'  height=70 width=80></div>";
	whitePos.innerHTML= "<img  src='images/"+whitePlayerPos+".png'  height=70 width=80></div>";
	lastPos.innerHTML= "<img  src='images/"+90+".png'  height=70 width=80></div>";
	winnerExists=false;
	document.getElementById("diceButton").disabled=false;
	document.getElementById('infobox').value = "New Game!";
	diceImg.style.display = 'none';
	whitePlayerPos=0;
	redPlayerPos=0;
	changePosition(0,"white");
	changePosition(0,"red");
}

function hasPlayerWon(){
	return winnerExists;
}

function isWinner(player){
	const diceImg = document.getElementById('diceImage');
	document.getElementById("diceButton").disabled=true;
	if(player === "red"){
		document.getElementById('infobox').value = "RED PLAYER WON THE GAME!\n";
	}else if(player ==="white"){
		document.getElementById('infobox').value = "WHITE PLAYER WON THE GAME!\n";
	}
	diceImg.style.display = 'none';
	winnerExists=true;
}

var cells=setPositions();
for (var i = 1; i <=90 ; i++) {
    console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}