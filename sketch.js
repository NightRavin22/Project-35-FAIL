var dog, happyDog, database, foods, foodStock;
var foodNumber
var FeedTime,lastFed
var foodObj
function preload()
{
  dogImage = loadImage("Dog.png");
  hpDogImage = loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.1;
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
  
  foodClassObject = new Food;

  feed=createButton("Feed The Dog")
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(610,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);

 // if(keyWentDown(UP_ARROW)){
   // writeStock(foods);
   // dog.addImage(hpDogImage);
  //}

  foodClassObject.display();

  drawSprites();

  FeedTime=database.ref('FeedTime');
  FeedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : " + lastFed +" AM",350,30)
  }

  text("Food = " +foods,223,200);
}

function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}
function feedDog(){
  dog.addImage(hpDogImage);

  foodObj.update.getFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    food:foods
  })
}