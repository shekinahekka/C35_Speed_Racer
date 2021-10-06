var car, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  car = createSprite(200,200,10,10);
  car.shapeColor = "red";


  var carPosition = database.ref('car/position');
  //listener or reading
  carPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}
//writing or updating
function writePosition(x,y){
  database.ref('car/position').set({
'x':position.x+x,
'y':position.y+y,
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  car.x = position.x;
  car.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

