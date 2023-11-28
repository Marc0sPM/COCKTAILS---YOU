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
         let fruta = 'azucar';
         let x;
         let y;
         // Crear bloques
         for (let row = 0; row < 4; row++) {

             for (let col = 0; col < 8; col++)
           {
            // falta hacer los bloques de las frutas 
               x = col * this.blockConfig.width + this.blockConfig.xOffset;
               y = row * this.blockConfig.height + this.blockConfig.yOffset;
              const block = this.physics.add.image(x, y, 'blocks').setImmovable();
              block.setCollideWorldBounds(true);
              this.physics.add.collider(this.ball, block, () => this.handleBlockCollision(block));
              
              // Asignar fruta aleatoria
              if(col == 0){
                let rnd = Phaser.Math.Between(0, 7);
                col = col + rnd;
                x = col * this.blockConfig.width + this.blockConfig.xOffset;
                //frutas.splice(1,randomFruta);
                switch (fruta) {
                     case 'azucar':
                     const azucar = this.physics.add.image(x, y, 'azucar').setScale(0.1).setImmovable();
                     this.physics.add.collider(this.ball, azucar, () => this.handleBlockCollision(azucar));
                     break;
                     case 'lima':
                     case 'limon':
                     const limon = this.physics.add.image(x, y, 'lima,limon').setScale(0.1).setImmovable();
                     this.physics.add.collider(this.ball, limon, () => this.handleBlockCollision(limon));
                     break;
                     case 'mora':
                     const mora = this.physics.add.image(x, y, 'mora').setScale(0.1).setImmovable();
                     this.physics.add.collider(this.ball, mora, () => this.handleBlockCollision(mora));
                     break;
                }
                col = 0;
              }
              
              
               
              
              
         }
      }
   }

  handleBlockCollision(block) {
      const fruta = block.getData('fruta');
      block.destroy(); // Romper el bloque
      this.incrementarContadorFruta(fruta);
   }

  incrementarContadorFruta(fruta) {
      switch (fruta) {
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
      width: 20,
      height: 5,
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