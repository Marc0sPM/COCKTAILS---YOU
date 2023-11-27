let lookingRight = Boolean(true); 


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
            this.anims.play('player_walk', true)
            //si mira a la derecha que haga el flip y calcule la nueva posicion sin salto
            if(lookingRight){
                lookingRight = Boolean(false);
                this.setFlipX(true);
                this.x -= 48 //es lo que mide el sprite
            }
        } else if (this.cursors.right.isDown) {
            this.anims.play('player_walk', true)
            this.setVelocityX(this.speed);
            if(!lookingRight){
                lookingRight = Boolean(true);
                this.setFlip(false)
               this.x += 48 //es lo que mide el sprite
                
            }
        }else this.setVelocityX(0)
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.play('player_idle', true)
        }
        
    }
}