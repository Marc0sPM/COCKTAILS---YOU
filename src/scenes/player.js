
export default class Player extends Phaser.Physics.Arcade.Sprite{
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
    }
    update( ){

        if (this.cursors.up.isDown) {

            this.setVelocityY(-this.speed);
            
            this.anims.play('player_walk', true)

        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            this.anims.play('player_walk', true)
        } else {
            this.setVelocityY(0);
        }

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.setFlip(false)
            this.setVelocityX(this.speed);
        } else {
        
            this.play('player_idle', true)
            this.setVelocityX(0);
        }
    }
}