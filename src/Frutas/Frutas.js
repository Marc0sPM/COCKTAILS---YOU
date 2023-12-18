import PlayerRefrescos from '../Refrescos/PlayerRefrescos.js'
import Fruta from './Fruta.js';
export default class Frutas extends Phaser.Scene{
    constructor(){
        super({key: 'frutas'});
    }
    create(){
        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);
      
        // Background de la escena y suelo
        const background = this.add.image(400, 250, 'frutasBackground').setDepth(0);
        background.setScale(1);

        this.suelo = this.physics.add.image(400,250, 'frutasSuelo').setImmovable();
        this.suelo.setScale(1);
        this.suelo.setSize(this.sys.game.canvas.width, 150);
        this.suelo.setOffset(320, 670);

        // Poner los arboles de la escena
        const tree1 = this.add.image(600 ,this.sys.game.canvas.height - 307,'tree3');  
        tree1.setScale(0.5);
        const tree2 = this.add.image(250 ,this.sys.game.canvas.height - 355,'tree1');  
        tree2.setScale(0.6);
        
        
        // Imagen de win
        this.win = this.add.image(400, 300, 'win').setScale(0.8);
        this.win.visible = false;

        // Imagen de lose
        this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
        this.gameoverImage.visible = false;

        // Se instancia al jugador
        this.Player = new PlayerRefrescos(this, this.sys.game.canvas.width / 2, 425, false);
        this.Player.setCollideWorldBounds(true);
        //this.cesta = this.physics.add.image(this.Player.x, this.Player.y, 'cesta')

         // Temporizador
         this.tempSprite = this.add.sprite(850, -29, 'contador');
         this.tempSprite.setScale(0.7);
 
         // Temporizador
         this.temporizador = 30 /*= temp*/
         
         this.temporizadorText = this.add.text(620, 20, 'Tiempo: ' + this.temporizador, { 
             fontFamily: 'Comic Sans MS',
             fontSize: '32px',
              fill: '#fff'
         });

        // Se instancia la fruta
        this.pos = this.randomPos();
        this.fruta = new Fruta(this, this.pos[0], this.pos[1], this.randomFruta());

        

        // Contador
        this.num = 4; // desiredNum
        this.cont = 0;
        this.contadorText = this.add.text(16, 16, 'Frutas: ' + this.cont + ' / ' + this.num, {
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
            fill: '#fff'
            
        });

        this.frutaRequerida = 'lime_fruit'; // = requird;
        

       

        // Fisicas
        this.physics.add.overlap(this.Player, this.fruta, this.handleColision.bind(this));
        this.physics.add.collider(this.Player, this.suelo);
        this.physics.add.collider(this.fruta, this.suelo, this.handleDelete.bind(this));
    }

    update(t, dt){
        this.temporizador -= (dt / 1000);
        if(this.temporizador <= 0) {
            this.hasDied();
            this.temporizador = 0;
        }
        this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));

    }

    handleDelete(fruta, suelo){  
            fruta.destroy();
            this.spawnFruta();
}
    randomPos(){
        let rnd = Phaser.Math.RND.between(50, this.sys.game.canvas.width - 50);;
        return [rnd, 10];
    }

    handleColision(player, fruta){
        fruta.destroy();
        if(fruta.getType() == this.frutaRequerida)
            this.cont++;
        else this.temporizador -= 3

        this.contadorText.setText('Frutas: ' + this.cont + ' / ' + this.num);

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Cambiar de escena y eso
            this.hasWon()
        } else {
            this.spawnFruta();
        }

    }

    randomFruta(){
        let fruit;
        let rnd = Phaser.Math.RND.between(0, 2);

        switch(rnd){
            case 0:
                 fruit = 'blackberry_fruit'
                 break;
            case 1:  
                fruit = 'lime_fruit'
                break;
            case 2:
                fruit = 'lemon_fruit'
                break;
        }
        return fruit;
    }
    spawnFruta(){
        this.pos = this.randomPos();
        this.fruta = new Fruta(this, this.pos[0], this.pos[1], this.randomFruta())
        this.physics.add.overlap(this.Player, this.fruta, this.handleColision.bind(this))
    }

    hasWon(){
        this.win.visible = true;
        this.time.delayedCall(2000, () => {
            this.exitScene();
        })
    }
    exitScene(){
        //this.calculateFinalScore();
        this.scene.resume('barScene')
        this.scene.stop()
    }

    hasDied(){
        this.gameoverImage.visible = true
        this.time.delayedCall(2000, () => {
        this.exitScene();
        })
    }

}