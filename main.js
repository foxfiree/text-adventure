var protag = {
	hp: 10,
	gotPrize: [],
	x: 0,
	y: 0,
	display: "P1"
};
var challenge1 = {
	landed: false,
	hit: 8,
	display: "C1",
	run: function(){
		document.getElementById("text_log").innerHTML += "<br>You accidentally walked into a college";						
		document.getElementById("text_log").innerHTML += "<br>Your inner responsibility tells you to do homework and study for midterms instead of exploring around";						
		protag.hp = protag.hp - challenge1.hit;
			
		if (protag.hp <= 0) {		
			document.write("Dead End: <br />");
			document.write("You feel like you want to sleep for eternity, so you did.");
		}
		else {
			document.getElementById("text_log").innerHTML += "<br>You lost 8 HP, you have " + protag.hp + " HP left";		
			document.getElementById("text_log").innerHTML += "<br>but you decided to procrastinate anyway";		  
		}
	}
};
var challenge2 = {
	landed: false,
	hit: 1,
	prize: "pillow",
	display: "C2",
	run: function(){
		document.getElementById("text_log").innerHTML += "<br>You fell down a hole";						
		document.getElementById("text_log").innerHTML += "<br>It was covered with pillows so you're still okay";						
		protag.hp = protag.hp - challenge2.hit;
			
		if (protag.hp <= 0) {		
			document.write("Dead End: <br />");
			document.write("You feel like you want to sleep for eternity, so you did.");
		}
		else {
			document.getElementById("text_log").innerHTML += "<br>You lost 1 HP, you have " + protag.hp + " HP left";		
			if (challenge2.prize == "pillow") {
				(protag.gotPrize).push(challenge2.prize);
				document.getElementById("text_log").innerHTML += "<br>The " + challenge2.prize + " is made with top quality materials, and it's comfortable. You steal one";		
				challenge2.prize = "";
			}
			else {
				document.getElementById("text_log").innerHTML += "<br>you feel like you shouldn't steal any more than what you have...";		
			}
		}
	}
};
var challenge3 = {
	landed: false,
	hit: 3,
	prize: "blanket",
	display: "C3",
	run: function(){
		document.getElementById("text_log").innerHTML += "<br>You tripped over something";						
		document.getElementById("text_log").innerHTML += "<br>turns out it was your collapsed friend covered in blankets";						
		protag.hp = protag.hp - challenge3.hit;
			
		if (protag.hp <= 0) {		
			document.write("Dead End: <br />");
			document.write("You feel like you want to sleep for eternity, so you did.");
		}
		else {
			document.getElementById("text_log").innerHTML += "<br>You lost 3 HP, you have " + protag.hp + " HP left";		
			if (challenge3.prize == "blanket") {
				(protag.gotPrize).push(challenge3.prize);
				document.getElementById("text_log").innerHTML += "<br>Your friend woke up and told you to wash their blankets for tripping over them. You took the " + challenge3.prize;		
				challenge3.prize = "";
			}
			else {
				document.getElementById("text_log").innerHTML += "<br>How did you trip over your friend again?";		
			}
		}
	}
};
var blank = {
	display: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
};
var walked = {
	display: "&nbsp;&#x2605;"
};
var goal = {
	landed: false,
	hasPrizes: false,
	display: "G"
};

var table = [
	["1", "0", "0", "0", "0", "0", "0", "0"],
	["2", "0", "0", "0", "0", "0", "0", "0"],
	["3", "0", "0", "0", "0", "0", "0", "0"],
	["4", "0", "0", "0", "0", "0", "0", "0"],
	["5", "0", "0", "0", "0", "0", "0", "0"],
	["6", "0", "0", "0", "0", "0", "0", "0"],
	["7", "0", "0", "0", "0", "0", "0", "0"],
	["8", "0", "0", "0", "0", "0", "0", "0"],
];

$(document).ready(function() {
	function start() {
		emptyField(blank);
		placeObject(protag); 
		placeObject(goal);
		placeObject(challenge1);
		placeObject(challenge2);
		placeObject(challenge3);
		displayTable();
	}

	function left() {
		logAction("left");
		
		for(var i = 0 ; i < table.length ; i++) {
			for(var j = 0 ; j < table[i].length ; j++) {
				if(i == protag.x && j == protag.y) {
					var moved = j - 1;
					if(j == 0) {
						document.getElementById("text_log").innerHTML += " but you're already at the farthest to the left";
						break;
					}
					if(table[i][moved] == challenge1) {
						challenge1.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge1.run();
							protag.y--;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.y--;
							
							break;
						}
						break;
					}
					else if(table[i][moved] == challenge2) {
						challenge2.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge2.run();
							protag.y--;
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.y--;
						
							break;
						}
						break;
					}
					else if(table[i][moved] == challenge3) {
						challenge3.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge3.run();
							protag.y--;
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.y--;
							
							break;
						}
						break;
					}
					else if(table[i][moved] == goal) {
						goal.landed = true;
						document.getElementById("text_log").innerHTML += " and you reached your destination, your house";
						
						if ((protag.gotPrize).length == 2) {
							goal.hasPrizes = true;
						}
						
						var confirmGoal = confirm("You reached to your house, will you go in?");
						if(confirmGoal) {
							protag.y--;
							if(goal.hasPrizes) {
								document.write("True End:");
								document.write("<br>You set down your pillow and cover yourself with your blanket and falls asleep at the doorstep.");
							}
							else if(!goal.hasPrizes && (protag.gotPrize).length <= 1) {
								document.write("Normal End:");
								document.write("<br>You can't sleep comfortably, you decided you'll just pull an all-nighter again.");
							}
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You didn't feel like going home yet";
							protag.y--;
							
							break;
						}
					}
					else {
						protag.y--;
						break;
					}
				}
			}
		}
		displayTable();
	}
	function right() {
		logAction("right");
		
		for(var i = 0 ; i < table.length ; i++) {
			for(var j = 0 ; j < table[i].length ; j++) {
				if(i == protag.x && j == protag.y) {
					var moved = j + 1;
					if(j == 7) {
						document.getElementById("text_log").innerHTML += " but you're already at the farthest to the right";
						break;
					}
					if(table[i][moved] == challenge1) {
						challenge1.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
					
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge1.run();
							if (protag.y != 0) {
								protag.y++;
							}
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							if (protag.y != 0) {
								protag.y++;
							}
							break;
						}
						break;
					}
					else if(table[i][moved] == challenge2) {
						challenge2.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge2.run();
							protag.y++;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.y++;
							
							break;
						}
						break;
					}
					else if(table[i][moved] == challenge3) {
						challenge3.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
					
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";		
							challenge3.run();
							protag.y++;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.y++;
							
							break;
						}
						break;
					}
					else if(table[i][moved] == goal) {
						goal.landed = true;
						document.getElementById("text_log").innerHTML += " and you reached your destination, your house";
						
						if ((protag.gotPrize).length == 2) {
							goal.hasPrizes = true;
						}
						
						var confirmGoal = confirm("You reached to your house, will you go in?");
						if(confirmGoal) {
							protag.y++;
							if(goal.hasPrizes) {
								document.write("True End:");
								document.write("<br>You set down your pillow and cover yourself with your blanket and falls asleep at the doorstep.");
							}
							else if(!goal.hasPrizes && (protag.gotPrize).length <= 1) {
								document.write("Normal End:");
								document.write("<br>You can't sleep comfortably, you decided you'll just pull an all-nighter again.");
							}
						}
						else {	
							document.getElementById("text_log").innerHTML += "<br>You didn't feel like going home yet";
							protag.y++;
							
							break;
						}
					}
					else {
						protag.y++;
						break;
					}
				}
			}
		}	
		displayTable();
	}
	function up() {
		logAction("up");
		
		for(var i = 0 ; i < table.length ; i++) {
			for(var j = 0 ; j < table[i].length ; j++) {
				if(i == protag.x && j == protag.y) {
					var moved = i - 1;
					if(i == 0) {
						document.getElementById("text_log").innerHTML += " but you're already at the top";
						break;
					}
					if(table[moved][j] == challenge1) {
						challenge1.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge1.run();
							protag.x--;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.x--;
							
							break;
						}
						break;
					}
					else if(table[moved][j] == challenge2) {
						challenge2.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge2.run();
							protag.x--;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.x--;
							
							break;
						}
						break;
					}
					else if(table[moved][j] == challenge3) {
						challenge3.landed = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge3.run();
							protag.x--;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.x--;
							
							break;
						}
						break;
					}
					else if(table[moved][j] == goal) {
						goal.landed = true;
						document.getElementById("text_log").innerHTML += " and you reached your destination, your house";
						
						if ((protag.gotPrize).length == 2) {
							goal.hasPrizes = true;
						}
						
						var confirmGoal = confirm("You reached to your house, will you go in?");
						if(confirmGoal) {
							protag.x--;
							if(goal.hasPrizes) {
								document.write("True End:");
								document.write("<br>You set down your pillow and cover yourself with your blanket and falls asleep at the doorstep.");
							}
							else if(!goal.hasPrizes && (protag.gotPrize).length <= 1) {
								document.write("Normal End:");
								document.write("<br>You can't sleep comfortably, you decided you'll just pull an all-nighter again.");
							}
						}
						else {	
							document.getElementById("text_log").innerHTML += "<br>You didn't feel like going home yet";
							protag.x--;
							
							break;
						}
					}
					else {
						protag.x--;
						break;
					}
				}
			}
		}
		displayTable();
	}
	function down() {
		logAction("down");
		var broke = false;
		
		for(var i = 0 ; i < table.length ; i++) {
			if (broke) {
				break;
			}
			for(var j = 0 ; j < table[i].length ; j++) {
				if (i == protag.x && j == protag.y) {
					var moved = i + 1;
					if (i == 7) {
						broke = true;
						document.getElementById("text_log").innerHTML += " but you're already at the bottom";
						break;
					}
					if(table[moved][j] == challenge1) {
						challenge1.landed = true;
						broke = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge1.run();
							protag.x++;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.x++;
							
							break;
						}
						break;
					}
					else if(table[moved][j] == challenge2) {
						challenge2.landed = true;
						broke = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge2.run();
							protag.x++;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.x++;
							
							break;
						}
						break;
					}
					else if(table[moved][j] == challenge3) {
						challenge3.landed = true;
						broke = true;
						document.getElementById("text_log").innerHTML += " and you stumbled upon a challenge";
						var acceptChallenge = confirm("Will you accept this challenge?");
						if (acceptChallenge) {
							document.getElementById("text_log").innerHTML += "<br>You accepted the challenge";
						
							challenge3.run();
							protag.x++;
							
							break;
						}
						else {
							document.getElementById("text_log").innerHTML += "<br>You declined the challenge";
							protag.x++;
							
							break;
						}
						break;
					}
					else if(table[moved][j] == goal) {
						goal.landed = true;
						broke = true;
						document.getElementById("text_log").innerHTML += " and you reached your destination, your house";
						
						if ((protag.gotPrize).length == 2) {
							goal.hasPrizes = true;
						}
						
						var confirmGoal = confirm("You reached to your house, will you go in?");
						if(confirmGoal) {
							protag.x++;
							if(goal.hasPrizes) {
								document.write("True End:");
								document.write("<br>You set down your pillow and cover yourself with your blanket and falls asleep at the doorstep.");
							}
							else if(!goal.hasPrizes && (protag.gotPrize).length <= 1) {
								document.write("Normal End:");
								document.write("<br>You can't sleep comfortably, you decided you'll just pull an all-nighter again.");
							}
						}
						else {	
							document.getElementById("text_log").innerHTML += "<br>You didn't feel like going home yet";
							protag.x++;
							
							break;
						}
					}
					else {
						broke = true;
						protag.x++;
						break;
					}
				}
			}
		}
		displayTable();
	}

	function emptyField(blank) {
		for(var i = 0 ; i < table.length ; i++) {
			for(var j = 0 ; j < table[i].length ; j++) {
				table[i][j] = blank;
			}
		}
	}

	function clearLog() {
		document.getElementById("text_log").innerHTML = "";
	}

	function placeObject(object) {
		var startingRow = Math.floor((Math.random() * 7) + 0);
		var startingColumn = Math.floor((Math.random() * 7) + 0);
		
		while(table[startingRow][startingColumn] != blank) {
			startingRow = Math.floor((Math.random() * 7) + 0);
			startingColumn = Math.floor((Math.random() * 7) + 0);
		}
			
		if (object == protag) {
			protag.x = startingRow;
			protag.y = startingColumn;
		}	
		else {
			table[startingRow][startingColumn] = object;		
		}
	}

	function displayTable() {
		var status = document.getElementById("status_log");
		status.innerHTML = "";
		status.innerHTML += "Player HP: " + protag.hp + "<br>Items held: ";
		
		if ((protag.gotPrize).length >= 1) {
			for(var i = 0 ; i < (protag.gotPrize).length ; i++) {
				status.innerHTML += "<br>" + protag.gotPrize[i];
			}
		}
		
		status.innerHTML += "<br>";
		
		
		var plot = document.getElementById("plot_table");
		plot.innerHTML = "";
		var text = "";
		for(var i = 0 ; i < table.length ; i++) {
			text += "<tr>";
			
			for(var j = 0 ; j < table[i].length ; j++) {
				text += "<td>";
				if (i == protag.x && j == protag.y) {
					text += protag.display;
				}
				else if (table[i][j] == challenge1 && challenge1.landed) {
					text += challenge1.display;
				}
				else if (table[i][j] == challenge2  && challenge2.landed) {
					text += challenge2.display;
				}
				else if (table[i][j] == challenge3  && challenge3.landed) {
					text += challenge3.display;
				}
				else if (table[i][j] == goal && goal.landed) {
					text += goal.display;
				}
				else {
					text += blank.display;
				}
				
				text += "</td>";
			}
			text += "</tr>";
			plot.innerHTML += text;
			text = "";
		}
	}

	function logAction(action) {
		var text_log = document.getElementById("text_log");
		if (action == "left") {
			text_log.innerHTML += "<br>You moved left"
		}
		else if (action == "right") {
			text_log.innerHTML += "<br>You moved right"
		}
		else if (action == "up") {
			text_log.innerHTML += "<br>You moved up"
		}
		else if (action == "down") {
			text_log.innerHTML += "<br>You moved down"
		}
	}


	$("#right").click(function(){
		right();
	});	
	$("#left").click(function(){
		left();
	});		
	$("#up").click(function(){
		up();
	});
	$("#down").click(function(){
		down();
	});
	$("#clean").click(function(){
		clearLog();
	});
	
	start();
});
