
app.controller("MainController", ["$scope", "$timeout", function($scope, $timeout){
	$scope.game = false;
	$scope.showForm = true;
	$scope.gameHere = false;
	$scope.player1 ="";
	$scope.player2 ="";
	$scope.scorePlayer1 = 0;
	$scope.scorePlayer2 = 0;
	$scope.player = 1;
	$scope.showWinner = false;
	$scope.showDraw = false;
	$scope.startTime ="";
	$scope.endTime ="";
	$scope.ai = false;
	$scope.content = true;
	$scope.loader = false;
	$scope.play = false;
	$scope.numberOfPlayers = 0;
	var error = 'undefined';

	$scope.niz = {
		col0: [],
		col1: [],
		col2: [],
		col3: [],
		col4: [],
		col5: [],
		col6: [],
	};

	$scope.checkInputValues = function(){
		if(typeof this.player1===error|| typeof this.player2 === error && this.ai == false || this.player1 == ""  || this.player2 == "" && this.ai == false){
			return;
		}
		else{
			this.wider={'height' : '900px'};
			this.showForm = false;
			this.gameHere = true;
			this.game = true;
			this.showe = true;
			if($scope.ai){
				$scope.player2 = "Computer";
			}
			if($scope.play){
				//$scope.player2="UNDEFINED";
			
				if($scope.numberOfPlayers>2){
					$scope.game = false;
					$scope.showe = false;
					$scope.gameHere = false;
					$scope.showForm = true;
				}
				else if($scope.numberOfPlayers==1){
					$scope.player1 = data.player;
					$scope.player2 = "Undefined";
					//$scope.pla
					// $scope.game = true;
					//$scope.number = 1;
				}
				else if($scope.numberOfPlayers == 2){
					$scope.player2 = $scope.player1;
					$scope.player1 = "";
					//$scope.number = 2;
				}
			}
			$scope.startTime = new Date().getTime();
			window.scrollTo(0, 150);
		}
	}

	$scope.addItem = function(col, index){
		window.scrollTo(0, 150);

		if($scope.game && !this.fullColumn(col)){
			
		this.niz[col].push(this.player);
		this.checkColumn2(col, 1);
		if(this.getWinner(col, index) && !$scope.ai){
			this.switchPlayers();
		}
		

		this.checkIfDraw();
		
			this.switchPlayers();

		this.aiPlay();
		this.checkIfDraw();

		if($scope.ai){
			this.switchPlayers();
		}


	}
	};

	$scope.getWinner = function(col, index){
		if(this.checkForWinners(col, index)){
		$scope.endTime = new Date().getTime();
			$scope.endTime = Math.floor(($scope.endTime - $scope.startTime) * 0.001);
			$scope.showWinner = true;
			$scope.game = false;
			if(this.player==1){
				$scope.scorePlayer1+=1;
			}
			else{
				$scope.scorePlayer2+=1;
			}
			return true;
		}
		return false;
	}

	$scope.checkIfDraw = function(){
		var counter = 0;
		angular.forEach($scope.niz, function(value, key){
			counter += value.length;
		});

		if(counter==42){
			$scope.endTime = new Date().getTime();
			$scope.endTime = Math.floor(($scope.endTime - $scope.startTime) * 0.001);
			$scope.showDraw = true;
			return true;
		}

		return false;
	}

	$scope.checkDiagonalFirst = function(col, index){
		var column = index;
		var row = $scope.niz[col].length-1;
		var moveLeft = (column>=row)?row:column;

		var result = false;
		
		var getThis = (parseInt(col.substring(3,4))-moveLeft);
		var movement = "col"+getThis.toString();
		
		var changeable = row-moveLeft;
		var counter = 0;
		angular.forEach($scope.niz, function(value, key){
			if(movement==key){
				movement = "col"+(parseInt(movement.substring(3,4))+1).toString();
				if(typeof value[changeable]=='undefined'){
					counter = 0;
				}
				else{
					if(value[changeable]==$scope.player){
						counter++;

					}
					else{
						counter = 0;
					}
					if(counter==4){
						result = true;
					}
				}
				changeable++;
			}
		});

		return result;

	}

	$scope.aiPlay = function(){
		if($scope.ai && $scope.game){
			
			var obj = this.loop(1);
			var obj2 = this.loop(2);
			if((obj.counter-1<=obj2.counter)&&obj.counter!=3||obj2.counter==3){
			if($scope.game && !this.fullColumn(obj2.cols)){
				var ind = parseInt(obj2.cols.substring(3,4));
				
			$scope.niz[obj2.cols].push(this.player);
			
			if(this.getWinner(obj2.cols, ind)){
			this.switchPlayers();
		}
		
		}
		
			}
			else{
			if($scope.game && !this.fullColumn(obj.cols)){
			$scope.niz[obj.cols].push(this.player);
			var ind = parseInt(obj.cols.substring(3,4));
			
				if(this.getWinner(obj.cols, ind)){
				this.switchPlayers();
			}
		}
		
	}
		}

	}



	$scope.checkDiagonalSecond = function(col, index){
		var column = index;
		var row = $scope.niz[col].length-1;
		
			var moveLeft = (column>=(6-row-1))?(6-row-1):column;
		var result = false;
		
		var getThis = (parseInt(col.substring(3,4))-moveLeft);
		var movement = "col"+getThis.toString();
		
		var changeable = row+moveLeft;
		
		var counter = 0;
		angular.forEach($scope.niz, function(value, key){

			if(movement==key){
				movement = "col"+(parseInt(movement.substring(3,4))+1).toString();
				if(typeof value[changeable]=='undefined'){
					counter = 0;
				}
				else{
					if(value[changeable]==$scope.player){
						counter++;

					}
					else{
						counter = 0;
					}
					if(counter==4){
						result = true;
					}
				}
				changeable--;
			}
		});

		return result;

	}

	$scope.switchPlayers = function(){
		$scope.player = ($scope.player === 1)?2:1;
	}

	$scope.fullColumn = function(col){
		if(this.niz[col].length>=6){
			return true;
		}
		else{
			return false;
		}
	}

	$scope.currentPlayer = function(){
		var currentPlayer = (this.player===1)?this.player1:this.player2;
		return currentPlayer;
	}

	$scope.checkRows = function(col){
		var lastPoint = this.niz[col].length-1;
		var counter = 0;
		var counter2 = 0;
		var result = false;
		var column = this.niz[col];

		for(var i = lastPoint; i>=0; i--){
			if(column[i]==this.player){
				counter++;
			}
			if(column[i]!==this.player){
				counter=0;
			}
			if(counter==4){
				result = true;
			}
		}
		return result;
	}

	$scope.checkColumn = function(col){
		var lastPoint = this.niz[col].length-1;
		var counter = 0;
		var result = false;

		angular.forEach(this.niz, function(value, key){
			var recent = value[lastPoint];
			if(typeof recent != error){
			 if (recent == $scope.player) {
          counter++;
          if (counter == 4) {
          	result = true;
          }
        }
        else{
        	counter = 0;
        }
    }
    else{
  		counter = 0;
    }
		
		});
  return result;
	}

	$scope.checkForWinners = function(col, index){
		var winner = false;

		if(this.checkColumn(col)){
			winner = true;
		}
		if(this.checkRows(col)){
			winner = true;
		}

		if(this.checkDiagonalFirst(col, index)){
			winner = true;
		}
		if(this.checkDiagonalSecond(col, index)){
			winner = true;
		}

		return winner;
	}

	$scope.playAgain = function(){
		angular.forEach($scope.niz, function(value, key){
			value.length = 0;
		});
		this.game = true;
		this.showWinner = false;
		this.showDraw = false;
		if($scope.ai && this.player==2){
			this.switchPlayers();
		}
		if(!$scope.ai){
			this.switchPlayers();
		}

	}

	$scope.startNew = function(){
	$scope.game = false;
	$scope.showForm = true;
	$scope.gameHere = false;
	$scope.player1 ="";
	$scope.player2 ="";
	$scope.scorePlayer1 = 0;
	$scope.scorePlayer2 = 0;
	$scope.player = 1;
	$scope.showWinner = false;
	$scope.showDraw = false;
	$scope.ai = false;

	$scope.niz = {
		col0: [],
		col1: [],
		col2: [],
		col3: [],
		col4: [],
		col5: [],
		col6: [],
	}
	window.scrollTo(0, 0);
};



$scope.loop = function(numValue){
	var object = "";
	var check = 0;
	var obj = "";
	$scope.rowes = [];
	angular.forEach($scope.niz, function(value, key){
		object = $scope.checkRows2(key.toString(), numValue);
		object2 = $scope.checkColumn2(key.toString(), numValue);
		object3 = $scope.checkDiagonalFirstAi(key.toString(), numValue);
		//object4 = $scope.checkDiagonalSecondAi(key.toString(), numValue);
		
		
		if(object!== null){
			if(object.counter>0){
			$scope.rowes.push(object);
		}
		}
		if(object2!=null){
			$scope.rowes.push(object2);
	}
	if(object3.counter!=0){
		$scope.rowes.push(object3);
	}

	// if(object4.counter!=0){
	// 	$scope.rowes.push(object4);
	// }

		});
	if($scope.rowes.length>0){
		check = $scope.rowes[0].counter;
		obj = $scope.rowes[0];
		for (var i = 0; i < this.rowes.length; i++){
			if(check<$scope.rowes[i].counter){
				check = $scope.rowes[i].counter;
				
				obj = $scope.rowes[i];
				
			}
		}
		var row = this.niz[obj.position].length;
		
		var ret ={cols: obj.position, rows: row, counter: obj.counter};
		return ret;
	}
		else{
			var number = Math.floor(Math.random()*7);
			var cols = "col"+number.toString();
				while(this.fullColumn(cols)){
					number = Math.floor(Math.random()*7);
					cols = "col"+number.toString();
				}
			var rows = this.niz[cols].length;
			
			var ret = {cols: cols, rows: rows, counter: 0};
			return ret;
		}
		};

$scope.checkRows2 = function(col, playerNum){
		var lastPoint = this.niz[col].length-1;
		var counter = 0;
		// var counter2 = 0;
		var result = false;
		var column = this.niz[col];
		var object={result: result, counter: counter, position: col};

		for(var i = 0; i<= lastPoint; i++){
			if(column[i]==playerNum){
				counter++;
				if(counter == 1){
					if(lastPoint < 3 && (typeof column[i+2]== error)){
					// counter2 = counter;
					object.counter = counter;
				}
				}
				if(counter == 2){
					if(lastPoint < 4 && (typeof column[i+3]== error)){
					// counter2 = counter;
					object.counter = counter;
				}
				}
				if(counter == 3){
					if(lastPoint < 5 && (typeof column[i+4]==error)){
					// counter2 = counter;
					object.counter = counter;
				}
				}
			}
			if(column[i]!==playerNum){
				counter=0;
				object.counter=0;
			}
			if(counter==4){
				result = true;
				object.result = result;
				object.counter = counter;
			}
		}
		

		if(typeof object.position==error){
			return null;
		}
		else{
			return object;
		}
	};


	$scope.checkColumn2 = function(col, numPlayer){
		var lastPoint = this.niz[col].length-1;
		var counter = 0;
		var result = false;
		var howMany = 0;
		var startPoint = "";
		var list =[];
		var object={result: result, counter: counter, position: col};

		angular.forEach(this.niz, function(value, key){
			
			var recent = value[lastPoint];
			if(typeof recent != error){
			 if (recent == numPlayer) {
          counter++;
          		if(counter == 1){
          			startPoint = key;
          			howMany = 3;
          			var point = {column: key, protivnik: false, startPoint: startPoint,  howMany: 3};
  					if(!$scope.containsObject(point, list)){
  					list.push(point);
  				}
					// if(lastPoint < 3 && (typeof column[i+2]== error)){
					// counter2 = counter;
					object.counter = counter;
				// }
				}
				if(counter == 2){
					howMany = 2;
					var point = {column: key, protivnik: false, startPoint: startPoint, howMany: 2};
  					if(!$scope.containsObject(point, list)){
  					list.push(point);
  				}
					// if(lastPoint < 4 && (typeof column[i+3]== error)){
					// counter2 = counter;
					object.counter = counter;
				// }
				}
				if(counter == 3){
					howMany = 1;
					var point = {column: key, protivnik: false, startPoint: startPoint, howMany: 1};
  					if(!$scope.containsObject(point, list)){
  					list.push(point);
  				}

					object.counter = counter;

				}
          if (counter == 4) {
          	object.counter = counter;
          	result = true;
          }
        }
        else{
        	var point = {column: key, protivnik: true, startPoint: ""};
        	if(!$scope.containsObject(point, list)){
        	list.push(point);
        }
        	counter = 0;
        	object.counter = 0;
        }
    }
    else{
  		counter = 0;
  		var point = {column: key, protivnik: false, startPoint: ""};
  		if(!$scope.containsObject(point, list)){
  		list.push(point);
  	}
    }


		});
 var largest = 4;
    var thisObj = "";
    for (var i = 0; i < list.length; i++) {
    	
    	if(typeof list[i].howMany != error){
    		if(largest>list[i].howMany){
    			largest = list[i].howMany;
    			thisObj = list[i];
    		}
    	}
 

    };
    
    if(thisObj != ""){
    var thisObj2 = "";
    for (var i = 0; i < list.length; i++) {
    	if(typeof list[i].howMany != error){
    		if(thisObj.startPoint!=list[i].startPoint && list[i].startPoint!=""){
    			thisObj2 = list[i];
    			
    			break;
    		}
    	}
    };
    
    if(thisObj2!= ""|| typeof this.obj2 != error){
    	if(thisObj.startPoint != thisObj.column){
    		var startPointLarge = this.getObject(thisObj, list);
    		var startPointLower = this.getObject(thisObj2, list);
    		if(this.returnInteger(startPointLarge.column) - this.returnInteger(startPointLower.column) == -3){
    			var num = this.returnInteger(startPointLower.column);
    			if(typeof this.niz[this.returnCol((num-1))][lastPoint]==error  && (lastPoint == 0 || typeof this.niz[this.returnCol((num-1))][lastPoint-1]!= error)){
    				
    				object = {result: false, counter: 3, position: this.returnCol(num-1)};
    				return object;
    			}

    		}
    		else if(this.returnInteger(startPointLarge.column) - this.returnInteger(startPointLower.column) == 2){
    			var num = this.returnInteger(startPointLarge.column);
    			if(typeof this.niz[this.returnCol((num-1))][lastPoint]==error && (lastPoint == 0 || typeof this.niz[this.returnCol((num-1))][lastPoint-1]!= error)){
    				object = {result: false, counter: 3, position: this.returnCol(num-1)};
    				return object;
    			}
    		}
    		else if(this.returnInteger(startPointLarge.column) - this.returnInteger(startPointLower.column) == -4){
    			var num = this.returnInteger(startPointLower.column);
    			if(typeof this.niz[this.returnCol((num-1))][lastPoint]==error  && (lastPoint == 0 || typeof this.niz[this.returnCol((num-1))][lastPoint-1]!= error)){
    				
    				object = {result: false, counter: 3, position: this.returnCol(num-1)};
    				return object;
    			}
    		}
    }
}
var brojac = 0;
var endPoint = thisObj;
var start = this.getObject(thisObj, list);
var startInt = this.returnInteger(start.column);
var endInt = this.returnInteger(endPoint.column);
var arrayOfPoints = [];
var left = 0;
var right = 0;
if(endInt<7 && startInt > -1){

for (var i = (endInt+1); i < list.length; i++) {
	brojac++;
	//if(lastPoint == 0 || typeof this.niz[list[i].column][lastPoint-1]!= error){
		right++;
	//}
	if(list[i].protivnik == false && list[i].startPoint == "" &&  (lastPoint == 0 || typeof this.niz[list[i].column][lastPoint-1]!= error)){
		
	arrayOfPoints.push(list[i]);
}
else{
	break;
}
if(brojac==thisObj.howMany){
	brojac = 0;
	break;
}
};

for (var i = (startInt-1); i >= 0; i--) {
	brojac++;
	//if(lastPoint == 0 || typeof this.niz[list[i].column][lastPoint-1]!= error){
	left++;
//}
	if(list[i].protivnik == false && list[i].startPoint == "" && (lastPoint == 0 || typeof this.niz[list[i].column][lastPoint-1]!= error)){

	arrayOfPoints.push(list[i]);
}
else{
	break;
}
if(brojac==thisObj.howMany){
	brojac = 0;
	break;
}
};

if(arrayOfPoints.length < thisObj.howMany){
	
	return null;
}
else{
	var multiply = arrayOfPoints.length-1;
	var rand = Math.floor(Math.random()*multiply);

	var objective = arrayOfPoints[rand];

	if(thisObj.howMany==2 && (left>1 && right >1)){
		object = {result: result, counter: (4-thisObj.howMany+1), position: objective.column};
		return object;
	}


	object = {result: result, counter: (4-thisObj.howMany), position: objective.column};

	return object;

}


}

}
  return null;
};

$scope.checkDiagonalFirstAi = function(col, numPlayer){
		//var column = index;
		var column = parseInt(col.substring(3,4));
		var row = $scope.niz[col].length-1;
		var moveLeft = (column>=row)?row:column;
		
		var result = false;
		
		var getThis = (parseInt(col.substring(3,4))-moveLeft);
		var movement = "col"+getThis.toString();
		
		var changeable = row-moveLeft;
		var counter = 0;
		var object={result: result, counter: counter, position: col};
		angular.forEach($scope.niz, function(value, key){
			if(movement==key){
				movement = "col"+(parseInt(movement.substring(3,4))+1).toString();
				if(typeof value[changeable]=='undefined'){
					
					if(counter == 3 && changeable<7 && typeof $scope.niz[key.toString()][(changeable-1)] != error){
						object = {result: result, counter: counter, position: key}
						return object;
					}
					counter = 0;
				}
				else{
					if(value[changeable]==numPlayer){
						counter++;

					}
					else{
						counter = 0;
					}
					if(counter==3){
						result = true;
					}
				}
				changeable++;
			}
		});

		return object;

	}

	// $scope.checkDiagonalSecondAi = function(col, numPlayer){
	// 	//var column = index;
	// 	var column = parseInt(col.substring(3,4));
	// 	var row = $scope.niz[col].length-1;
		
	// 		var moveLeft = (column>=(6-row-1))?(6-row-1):column;
	// 	var result = false;
		
	// 	var getThis = (parseInt(col.substring(3,4))-moveLeft);
	// 	var movement = "col"+getThis.toString();

	// 	var checkColumn = "col" + (getThis-1);
		
	// 	var changeable = row+moveLeft;
	// 	var checkRow = changeable;
	// 	var counter = 0;

	// 	var object={result: result, counter: counter, position: col};
	// 	angular.forEach($scope.niz, function(value, key){

	// 		if(movement==key){
	// 			
	// 			movement = "col"+(parseInt(movement.substring(3,4))+1).toString();
	// 			
	// 			if(typeof value[changeable]=='undefined'){
	// 				
	// 				if(counter == 3){
	// 					
	// 					if(typeof $scope.niz[checkColumn][checkRow] != error){
						
	// 					object = {result: result, counter: counter, position: checkColumn}
	// 					return object;
	// 				}
	// 				}
	// 				counter = 0;
	// 			}
	// 			if(counter>1){
	// 			}
	// 			else{
	// 				if(value[changeable]==numPlayer){
	// 					counter++;

	// 				}
	// 				else{
	// 					counter = 0;
	// 				}
	// 				if(counter==4){
	// 					result = true;
	// 				}
	// 			}
	// 			changeable--;
	// 		}
	// 	});

	// 	return object;

	// }


	$scope.containsObject = function(obj, list) {
    var i=0;
    for (i = 0; i < list.length; i++) {
    	
        if (list[i].protivnik == obj.protivnik && list[i].column == obj.column){
        	
            return true;
        }
    }

    return false;
}

	$scope.getObject = function(obj, list){
		var i = 0;
		for (var i = 0; i < list.length; i++) {
			if(obj.startPoint == list[i].column){
				return list[i];
			}
		};
		return null;
	}

	$scope.returnInteger = function(col){
		return parseInt(col.substring(3,4));
	}

	$scope.returnCol = function(number){
		return "col"+number.toString();
	}

}]);

