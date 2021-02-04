class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,100);
    car2 = createSprite(200,100);
    car3 = createSprite(300,100);
    car4 = createSprite(400,100);

    
    car1.addImage("car1",car1Img);
    car2.addImage("car2",car2Img);
    car3.addImage("car3",car3Img);
    car4.addImage("car4",car4Img);


    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100);
    Player.getPlayerInfo();
     console.log(allPlayers);
    if(allPlayers !== undefined){
      var index = 0;
      var x = 100;
      var y = 0;
      console.log("message 1")
      image(trackImg, 0 , -displayHeight*4, displayWidth,displayHeight*4);
      for(var plr in allPlayers){
        console.log("Message 2");
        index = index+1
        x= x+200;
        y= displayHeight - allPlayers[plr].distance
       
        cars[index-1].x = x;
        
        cars[index-1].y = y;
        if( index === player.index){
         fill("red");
          ellipse(x,y,60,60);
         // cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }

   }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(this.player.distance > 3500){
       
      gameState = 2 ; 

    }

    
  }

  end(){
    textSize(30);
    
    text("Game Over",displayWidth/2,displayHeight/2);

  }
}
