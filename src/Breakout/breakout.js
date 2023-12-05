export default class Breakout extends Phaser.Scene {
   constructor() {
       super({ key: 'Breakout' });
       this.blockConfig = {
           width: 80,
           height: 30,
           cols: 8,
           rows: 4,
           xOffset: 60,
           yOffset: 100,
       };
       this.spaceKey;
       this.isBallReleased = false;
   }

   create() {
       this.physics.world.setBoundsCollision(true, true, true, true);
       this.add.image(400, 250, 'backgroundBreakout').setDepth(0);
       this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
       this.gameoverImage.visible = false;

       this.win = this.add.image(400, 300, 'win').setScale(0.8);
       this.win.visible = false;

       // barra
       this.paddle = this.physics.add.image(400, 560, 'paddle').setImmovable();
       this.paddle.body.allowGravity = false;
       this.paddle.setCollideWorldBounds(true);

       // pelota
       this.ball = this.physics.add.image(this.paddle.x, this.paddle.y - 25, 'ball');
       this.ball.setCollideWorldBounds(true);

       // movimiento con cursores
       this.cursors = this.input.keyboard.createCursorKeys();

       // tecla de espacio
       this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

       // colisiones
       this.physics.add.collider(this.ball, this.paddle);
       this.ball.setBounce(1);

       // Crear bloques
       this.createBlocks();

       // Contadores de frutas
       this.azucarCount = 4;
       this.hierbabuenaCount = 4;

       // Frutas disponibles
       let fruta;
       if (fruta == null) {
           fruta = 'azucar';
       }
       let x;
       let y;
       let col;
       // Crear bloques
       for (let row = 0; row < 4; row++) {
           for (col = 0; col < 8; col++) {
               x = (col * this.blockConfig.width+56) + this.blockConfig.xOffset;
               y = (row * this.blockConfig.height-80) + this.blockConfig.yOffset;
               const block = this.physics.add.image(x, y, 'block').setImmovable();
               this.physics.add.collider(this.ball, block, () => this.handleBlockCollision(block));
           }

           // Asignar fruta aleatoria
           let rnd = Phaser.Math.Between(0, 7);
           col = rnd;
           x = (col * this.blockConfig.width+56) + this.blockConfig.xOffset;
           y = (row * this.blockConfig.height-80) + this.blockConfig.yOffset;
           switch (fruta) {
               case 'azucar':
                   const azucar = this.physics.add.image(x, y, 'blockazucar').setImmovable();
                   this.physics.add.collider(this.ball, azucar, () => this.handleBlockCollision(azucar,fruta));
                   break;
               case 'hierbabuena':
                   const hierbabuena = this.physics.add.image(x, y, 'blockhierbabuena').setImmovable();
                   this.physics.add.collider(this.ball, hierbabuena, () => this.handleBlockCollision(hierbabuena,fruta));
                   break;
           }
       }
   }

   handleBlockCollision(block,fruta) {
    block.destroy();
    this.decrementarContadorFruta(fruta);
    console.log(this.azucarCount)
  }
   

   decrementarContadorFruta(fruta) {
       switch (fruta) {
           case 'azucar':
               this.azucarCount--;
               break;
           case 'hierbabuena':
               this.hierbabuenaCount--;
               break;
       }
   }


   createBlocks() {
       // Configuración de los bloques
       const blockConfig = {
           width: 20,
           height: 5,
           cols: 8,
           rows: 4,
           xOffset: 60,
           yOffset: 100,
       };
   }
   fruitCollision(azucar) {
    azucar.destroy();
    this.decrementarContadorFruta(azucar);

}

   update() {
       if (!this.isBallReleased && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
           this.isBallReleased = true;
           let velocity = 350 * Phaser.Math.Between(1.3, 2);
           if (Phaser.Math.Between(0, 10) > 5) {
               velocity = -velocity;
           }
           let speed = 125;
           this.ball.setVelocity(velocity, speed);
       }

       if (this.isBallReleased) {
           if (this.cursors.left.isDown) {
               this.paddle.setVelocityX(-500);
           } else if (this.cursors.right.isDown) {
               this.paddle.setVelocityX(500);
           } else {
               this.paddle.setVelocityX(0);
           }
       }

       if (this.ball.y > 700) {
           this.gameoverImage.visible = true;
           this.scene.pause();
           //setTimeout(this.scene.start('MainMenu'), 3000);
       }

       if (this.azucarCount === 0 || this.hierbabuenaCount === 0) {
         this.win.visible = true;
         this.scene.pause();
         // setTimeout(() => this.scene.start('MainMenu'), 3000);
     }
   }
}
