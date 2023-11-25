export default class Breakout extends Phaser.Scene{
    constructor(){
        super({key:'Breakout'});
        this.blockConfig = {
         width: 80,
         height: 30,
         cols: 8,
         rows: 4,
         xOffset: 60,
         yOffset: 100,
     };
    }
    create(){
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.add.image(400, 250, 'backgroundBreakout');
        this.gameoverImage = this.add.image(400, 90, 'gameOver');
        this.gameoverImage.visible = false;

        //barra
        this.paddle = this.physics.add.image(400, 560, 'paddle').setImmovable();
        this.paddle.body.allowGravity = false;
        this.paddle.setCollideWorldBounds(true);
        //pelota
        this.ball = this.physics.add.image(400,300,'ball');
        this.ball.setCollideWorldBounds(true);

        let velocity = 350 * Phaser.Math.Between(1.3 ,2);
         if(Phaser.Math.Between(0,10) > 5){
          velocity = 0- velocity;
         }
        this.ball.setVelocity(velocity,120);

        //movimiento con cursores
        this.cursors = this.input.keyboard.createCursorKeys();
 
        //colisiones
        this.physics.add.collider(this.ball, this.paddle);
        this.ball.setBounce(1);

         // Crear bloques
         this.createBlocks();

         // Contadores de frutas
         this.azucarCount = 0;
         this.limaCount = 0;
         this.limonCount = 0;
         this.moraCount = 0;

         // Frutas disponibles
         const frutas = ['azucar', 'lima', 'limon', 'mora'];

         // Crear bloques
         for (let row = 0; row < blockConfig.rows; row++) {

             for (let col = 0; col < blockConfig.cols; col++)
           {
              const x = col * blockConfig.width + blockConfig.xOffset;
              const y = row * blockConfig.height + blockConfig.yOffset;
              const block = this.physics.add.image(x, y, 'blocks').setImmovable();
              block.setCollideWorldBounds(true);
              this.physics.add.collider(this.ball, block, () => this.handleBlockCollision(block));
              
              // Asignar fruta aleatoria
              const randomFruta = Phaser.Math.RND.pick(frutas);
              block.setData('fruta', randomFruta);
         //      switch (fruta) {
         //       case 'azucar':
         //           this.block.add.image('azucar');
         //           break;
         //       case 'lima':
         //          this.block.add.image('lima,limon');
         //           break;
         //       case 'limon':
         //          this.block.add.image('lima,limon');
         //           break;
         //       case 'mora':
         //          this.block.add.image('mora');
         //           break;
         //   }
              
         }
      }
   }

  handleBlockCollision(block) {
      const fruta = block.getData('fruta');
      block.destroy(); // Romper el bloque
      this.incrementarContadorFruta(fruta);
   }

  incrementarContadorFruta(fruta) {
      switch (randomFruta) {
          case 'azucar':
              this.azucarCount++;
              break;
          case 'lima':
              this.limaCount++;
              break;
          case 'limon':
              this.limonCount++;
              break;
          case 'mora':
              this.moraCount++;
              break;
      }
  }
  createBlocks(){
      // Configuración de los bloques
      const blockConfig = {
      width: 80,
      height: 30,
      cols: 8,
      rows: 4,
      xOffset: 60,
      yOffset: 100,
   }
  }
   update(){
     if(this.cursors.left.isDown){
        this.paddle.setVelocityX(-500);
     }
     else if(this.cursors.right.isDown){
     this.paddle.setVelocityX(500);
     }
     else{
        this.paddle.setVelocityX(0);
     }
     
     if(this.ball.y > 700){
        this.gameoverImage.visible = true;
        this.scene.pause();
     }
   }
   
   
}