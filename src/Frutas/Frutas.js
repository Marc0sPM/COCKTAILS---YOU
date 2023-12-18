import PlayerRefrescos from '../Refrescos/PlayerRefrescos.js'
export default class Frutas extends Phaser.Scene{
    constructor(){
        super({key: 'frutas'});
    }
    create(){
        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);
      
        // Background de la escena
        //const background = this.add.image(400, 250, 'frutasBackground').setDepth(0);
        //background.setScale(1);

        // Poner los arboles de la escena
        // const tree1 = this.add.image(100,100,'tree1');  
        // tree1.setScale(3);

        // Se instancia al jugador
        this.Player = new PlayerRefrescos(this, 100, 300);
        this.Player.setCollideWorldBounds(true);

        // Se instancia la fruta
        this.fruta = this.spawnFruit();

        this.fruta.body.gravity.y = 150;
        this.fruta.setScale(0.4);
        this.fruta.body.setSize(75, 75);
        this.fruta.body.setOffset(0, 0);

        // Contador
        this.num = 4; // desiredNum
        this.cont = 0;
        this.contadorText = this.add.text(16, 16, 'Frutas: ' + this.cont + ' / ' + this.num, {
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
            fill: '#fff'
            
        });

        

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

        // Fisicas
        this.physics.add.collider(this.Player, this.fruta, this.handleColision.bind(this))
        
    }

    update(t, dt){
        this.temporizador -= (dt / 1000);
        if(this.temporizador <= 0) {
            //this.lose();
            this.temporizador = 0;
        }
        this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));

        if(this.fruta.y > 700) {
            this.fruta.destroy();
            this.fruta = this.spawnFruit();
            this.physics.add.collider(this.Player, this.fruta, this.handleColision.bind(this))
        }
    }

    randomPos(){
        let rnd = Phaser.Math.RND.between(50, 750);;
        return [rnd, 10];
    }

    handleColision(player, fruta){
        fruta.destroy();

        this.cont++;

        this.contadorText.setText('Frutas: ' + this.cont + ' / ' + this.num);

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Cambiar de escena y eso
           // this.win();
        } else {
            this.fruta = this.spawnFruit();
            this.physics.add.collider(this.Player, this.fruta, this.handleColision.bind(this))
        }

    }

    spawnFruit(){
        let fruit;
        let pos = this.randomPos();
        let rnd = Phaser.Math.RND.between(0, 2);

        switch(rnd){
            case 0:
                 fruit = this.physics.add.image(pos[0], pos[1],'blackberry_fruit')
                 break;
            case 1:  
                fruit = this.physics.add.image(pos[0], pos[1],'lime_fruit');
                break;
            case 2:
                fruit = this.physics.add.image(pos[0], pos[1],'lemon_fruit');
                break;
        }
        if (fruit) {
            fruit.body.gravity.y = 150;
            fruit.setScale(0.4);
            fruit.body.setSize(75, 75);
            fruit.body.setOffset(0, 0);
        }
        return fruit;
    }
}