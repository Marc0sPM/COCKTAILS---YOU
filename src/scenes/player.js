
export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, {key: 'player'})
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2);
        
        
        this.cursors = scene.input.keyboard.addKeys({
             up: Phaser.Input.Keyboard.KeyCodes.W,
             down: Phaser.Input.Keyboard.KeyCodes.S,
             left: Phaser.Input.Keyboard.KeyCodes.A,
             right: Phaser.Input.Keyboard.KeyCodes.D
        });

        //Velocidad del jugador
        this.speed = 200;
        this.play('player_idle');
    }
    preload(){
        //no funciona
        console.log('preloadPlayer')
    }
    update(time,delta ){
           
         console.log(time)//no funciona

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
        } else {
            this.setVelocityY(0);
        }

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }
    }
}