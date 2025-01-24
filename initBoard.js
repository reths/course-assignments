function initBoard(){
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');

	for (var i = 9; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=80></div>";
	  
	  tr.appendChild(td1);
	  
	  }
	  table.appendChild(tr);
	}
	setPositions();
	if(randomPlayerPick()==="red"){
		currentPlayer="red";
	}else{
		currentPlayer="white";
	}
}

function changePosition(newPosition, player){
	const newChPos = document.getElementById("position" + newPosition);

	if(redPlayerPos === newPosition && player === "white"){
		newChPos.innerHTML="<img  src='imagesBoth/"+newPosition+".png'  height=70 width=80></div>";
	}else if(whitePlayerPos === newPosition && player === "red"){
		newChPos.innerHTML="<img  src='imagesBoth/"+newPosition+".png'  height=70 width=80></div>";
	}else if(player==="white"){
		newChPos.innerHTML="<img  src='imagesWhite/"+newPosition+".png'  height=70 width=80></div>";
	}else{
		newChPos.innerHTML="<img  src='imagesRed/"+newPosition+".png'  height=70 width=80></div>";
	}

}

function eraseOldPosition(pos,player){
	const blankPos = document.getElementById("position" + pos);
	if(player === "white"){
		if(redPlayerPos === pos){
			blankPos.innerHTML= "<img  src='imagesRed/"+pos+".png'  height=70 width=80></div>";
		}else{
			blankPos.innerHTML= "<img  src='images/"+pos+".png'  height=70 width=80></div>";
		}
	}else{
		if(whitePlayerPos === pos){
			blankPos.innerHTML= "<img  src='imagesWhite/"+pos+".png'  height=70 width=80></div>";
		}else{
			blankPos.innerHTML= "<img  src='images/"+pos+".png'  height=70 width=80></div>";
		}
	}
}
