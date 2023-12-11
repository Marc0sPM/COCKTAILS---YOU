let lookingRight = true;


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'player' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2);
        


        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(20, 40)
        this.body.setOffset(5, 10)
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        
       
        // Velocidad del jugador
        this.speed = 200;
    }

    update() {

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
            this.anims.play('player_walk', true);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            this.anims.play('player_walk', true);
        } 

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.anims.play('player_walk', true);
            if (lookingRight) {
                lookingRight = false;
                this.setFlipX(true);
                this.body.setOffset(20, 10)
                this.x -= 48; // Ajusta según el tamaño del sprite
            }
        } else if (this.cursors.right.isDown) {
            this.anims.play('player_walk', true);
            this.setVelocityX(this.speed);
            if (!lookingRight) {
                lookingRight = true;
                this.setFlipX(false);
                this.body.setOffset(5, 10)
                this.x += 48; // Ajusta según el tamaño del sprite
            }
        } else {
            this.setVelocityX(0);
        }

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.play('player_idle', true);
        }
    }
}
