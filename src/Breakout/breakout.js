export default class Breakout extends Phaser.Scene{
    constructor(){
        super({key:'Breakout'});
    }
    create(){
        this.physics.world.setBoundsCollision(true, true, true, false);
     this.add.image(400, 250, 'background');
     this.gameoverImage = this.add.image(400, 90, 'gameOver');
     this.gameoverImage.visible = false;

     //barra
     this.paddle = this.physics.add.image(400, 360, 'paddle').setimmovable();
     this.paddle.body.allowGravity = false;

     //pelota
     this.ball = this.physics.add.image(400,30,'ball');
     this.ball.setCollideWorldbounds(true);

     let velocity = 100 * Phaser.math.between(1.3 ,2);
     if(Phaser.math.between(0,10) > 5){
         velocity = 0- velocity;
     }
     this.ball.setvelocity(velocity,10);

     //movimiento con cursores
     this.cursors = this.input.keyboard.createCursorKeys();
 
     //colisiones
     this.physics.add.collider(this.ball, this.paddle);
     this.ball.setBounce(1);
   }
   update(){
     if(this.cursors.left.isDown){
        this.paddle.setvelocityX(-500);
     }
     else if(this.cursors.right.isDown){
     this.paddle.setvelocityX(500);
     }
     else{
        this.paddle.setvelocityX(0);
     }
     
     if(this.ball.y > 500){
        this.gameoverImage.visible = true;
        this.scene.pause();
     }
   }

}