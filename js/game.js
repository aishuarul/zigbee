function float2int (value) {
    return value | 0;
}

var nodeArray = [
                 {name:"node1", linkedToMaster:false, linkedToSlave:false, connectionAchived:true, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node2", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node3", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node4", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node5", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node6", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node7", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node8", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node9", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node10", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node11", linkedToMaster:false, linkedToSlave:false, connectionAchived:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0}
                 ];

var tmpNodeArray = [
                 {name:"node1", linked:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node2", linked:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node3", linked:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node4", linked:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0},
                 {name:"node5", linked:false, deviceType:"router", rootName:"", xAxis:0, yAxis:0}
                 ];

var nodeCount = 1;
var nodeType = "router";

function ChangeRouterNodes(){
	nodeType = "router";
}

function ChangeEndNodes(){
	nodeType = "endDevice";
}

function drawAvatar() {
    gameCanvas.addEventListener("mousedown", redrawAvatar);
}

var routerImage = new Image();
routerImage.src = "img/router.png";

var endDeviceImage = new Image();
endDeviceImage.src = "img/endDevice.png";

function redrawAvatar(mouseEvent) {
	var gameCanvas = document.getElementById("gameCanvas");
	var c= gameCanvas.getContext('2d');

	var coordinatorImage = new Image();
	coordinatorImage.src = "img/coordinator.png";

	// Draw the Co-ordinator image in 0,0
	gameCanvas.getContext('2d').drawImage(coordinatorImage, 0, 0);
	// Alter the node count
    if(nodeCount < 10)
    	{
    		if(nodeType == "router"){
    			gameCanvas.getContext('2d').drawImage(routerImage, mouseEvent.offsetX, mouseEvent.offsetY);
    			nodeArray[nodeCount].deviceType="router";
    		}
    		else{
    			gameCanvas.getContext('2d').drawImage(endDeviceImage, mouseEvent.offsetX, mouseEvent.offsetY);
    			nodeArray[nodeCount].deviceType="endDevice";
    		}
    		// Display the location of the node on the canvas
    		c.font="10px Georgia";
    		c.fillText("("+float2int(mouseEvent.offsetX)+","+float2int(mouseEvent.offsetY)+")",mouseEvent.offsetX-15,mouseEvent.offsetY-10);
    		c.fillStyle = 'green';
    		c.fillText(nodeCount, mouseEvent.offsetX + 20, mouseEvent.offsetY + 20)
    		
		    nodeArray[nodeCount].xAxis = mouseEvent.offsetX + 20;
		    nodeArray[nodeCount].yAxis = mouseEvent.offsetY + 20;
		    
		    nodeCount = nodeCount +1;
    	}
    else
    	alert("Sorry You reached your limit of" + nodeCount+" nodes");
}

function linkNodes(){
	var gameCanvas = document.getElementById("gameCanvas");
    var c= gameCanvas.getContext('2d');
    var linkRange = 200;
    var location1, location2;
    var nearest = 0;
    var distance = 0;
    
	var minConnection = false;
    // Find the node those are nearest to co-ordinator
    for (var i = 1; i < nodeArray.length; i++){
    	var xDistance =nodeArray[i].xAxis - 0;
		var yDistance =nodeArray[i].yAxis - 0;
		distance = Math.sqrt((xDistance*xDistance) + (yDistance*yDistance));
		if(distance < linkRange){
			nodeArray[i].linkedToMaster=true;
			nodeArray[i].rootName = "node1";
			nodeArray[i].connectionAchived = true;
			// Write down the distance of the slave to its master
			c.font="10px Georgia";
			c.fillStyle = 'orange';
    		c.fillText("("+float2int(distance)+")",nodeArray[i].xAxis-15,nodeArray[i].yAxis-10);
			// Minimum of one device must be connected to the co-ordinator node1
			minConnection = true;
		}	
	}
    nodeArray[0].linkedToSlave=true;
    
     //Find the nodes that are nearest to the rest of the nodes to find their slaves
	// Round 1 search
	for (var i = 0; i < nodeArray.length; i++){
		// Only link nodes which have a master
		if(nodeArray[i].linkedToMaster){
			var masterXAxis, masterYAxis;
			masterXAxis = nodeArray[i].xAxis;
			masterYAxis = nodeArray[i].xAxis;	
			//Second loop to find the nearest object
			for (var j = 1; j < nodeArray.length; j++){
				if(!nodeArray[j].linkedToMaster && !nodeArray[j].linkedToSlave && nodeArray[j].deviceType=="router"){
					var xDistance =nodeArray[j].xAxis - masterXAxis;
					var yDistance =nodeArray[j].yAxis - masterYAxis;
					distance = Math.sqrt((xDistance*xDistance) + (yDistance*yDistance));
					if(distance < linkRange){
						nodeArray[j].linkedToMaster=true;
						nodeArray[j].rootName = nodeArray[i].name;
						c.font="10px Georgia";
						c.fillStyle = 'orange';
			    		c.fillText("("+float2int(distance)+")",nodeArray[j].xAxis-15,nodeArray[j].yAxis-10);
					}
				}	
			}
		}
	}
	
	// For the end device find the nearest router which is connected and link it to the router
	 for (var i = 1; i < nodeArray.length; i++){
	    	var xDistance =nodeArray[i].xAxis - 0;
			var yDistance =nodeArray[i].yAxis - 0;
			distance = Math.sqrt((xDistance*xDistance) + (yDistance*yDistance));
			if(!nodeArray[i].linkedToMaster && nodeArray[i].deviceType=="endDevice"){
				// Travel through all the nodes that are router to find the nearest router
				for (var j = 1; j < nodeArray.length; j++){
					if(nodeArray[j].linkedToMaster && nodeArray[j].deviceType=="router"){
						var xDistance =nodeArray[j].xAxis - masterXAxis;
						var yDistance =nodeArray[j].yAxis - masterYAxis;
						distance = Math.sqrt((xDistance*xDistance) + (yDistance*yDistance));
						if(distance < linkRange){
							nodeArray[i].linkedToMaster=true;
							nodeArray[i].rootName = nodeArray[j].name;
							c.font="10px Georgia";
							c.fillStyle = 'orange';
				    		c.fillText("("+float2int(distance)+")",nodeArray[i].xAxis-15,nodeArray[i].yAxis-10);
						}
					}	
				}
				
			}
		}
	 
	
	//Draw Connection Lines
	for(var i = 0; i < nodeArray.length; i++){
		
		masterName = nodeArray[i].rootName;
		for(var j = 0; j < nodeArray.length; j++){
			if(masterName == nodeArray[j].name){
				c.beginPath();
			    c.strokeStyle = 'green';
			    c.fillStyle = 'green';
			    c.moveTo(nodeArray[i].xAxis,nodeArray[i].yAxis);
			    c.lineTo(nodeArray[j].xAxis,nodeArray[j].yAxis);
				c.stroke();
			}
		}
	}
}
