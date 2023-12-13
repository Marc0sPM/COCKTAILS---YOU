import PlayerRefrescos from "./PlayerRefrescos.js";
import Estantes from "./Estantes.js";

export default class Refrescos extends Phaser.Scene {
    constructor() {
        super({ key: 'refrescos' })
    }

    create() {
        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);
      
        // Se instancia al jugador
        this.Player = new PlayerRefrescos(this, 100, 300);
        this.Player.setCollideWorldBounds(true);

        // Número de refrescos para pasar al siguiente nivel
        this.num = 4/* = desiredNum*/

        // Contador de refrescos
        this.cont = 0;
        this.contadorText = this.add.text(16, 16, 'Refrescos: ' + this.cont + ' / ' + this.num, {
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
            fill: '#fff'
            
        });
        this.prevNum;
        

        // Temporizador
        this.temporizador = 30 /*= temp*/
        
        this.temporizadorText = this.add.text(800 - 200, 16, 'Tiempo: ' + this.temporizador, { 
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
             fill: '#fff'
        });
          
        // Instanciar los estantes 
        this.estante1 = new Estantes(this, 130, 400);
        this.estante2 = new Estantes(this, 325, 200);
        this.estante3 = new Estantes(this, 520, 400);
        this.estante4 = new Estantes(this, 715, 200); 


        // Definir posición aleatoria del refresco
        this.type = 'blue'; // = refr
        this.refresco = this.spawnRefresco();
        this.offSet = 15;

        // Física
        this.physics.add.collider(this.Player, this.refresco, this.handleColision.bind(this));
        this.physics.add.collider(this.Player, this.estante1);
        this.physics.add.collider(this.Player, this.estante2);
        this.physics.add.collider(this.Player, this.estante3);
        this.physics.add.collider(this.Player, this.estante4);

    }
    
    update(time,delta) {
        this.Player.update();

        this.temporizador -= (delta / 1000);
    
      
        //console.log("Valor del temporizador: " + this.temporizador); //debug
      
        this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));
        
    }
      

    handleColision(player, refresco) {
        // Elimina solo el refresco
        refresco.destroy();
        console.log("destruye")
        // Incrementa el contador de refrescos
        this.cont++;
        this.contadorText.setText('Refrescos: ' + this.cont + ' / ' + this.num);

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Cambiar de escena y eso
            console.log('¡Has alcanzado el número necesario de refrescos!');
        } else {
            this.refresco = this.spawnRefresco();
            this.physics.add.collider(this.Player, this.refresco, this.handleColision.bind(this));
        }
    }
    
    randomPos(){
        let rnd
        do{
            rnd = Phaser.Math.RND.between(0, 3);
        }
        while(this.prevNum === rnd)
        this.prevNum = rnd;
        rnd = 4
        switch(rnd){
            case 0: return [this.estante1.x - this.offSet, this.estante1.y]
            case 1: return [this.estante2.x - this.offSet, this.estante2.y]
            case 2: return [this.estante3.x - this.offSet, this.estante3.y]
            case 3: return [this.estante4.x - this.offSet, this.estante4.y]
            case 4: return []
        }
    }
    spawnRefresco() {
        let nuevoRefresco;
        let pos = this.randomPos()
        switch (this.type) {
            case 'coke':
                nuevoRefresco = this.physics.add.image(pos[0], pos[1], 'coke');
                break;
            case 'blue':
                nuevoRefresco = this.physics.add.image(pos[0], pos[1], 'blue');
                break;
            case 'lemon':
                nuevoRefresco = this.physics.add.image(pos[0], pos[1],'lemon');
                break;
            case 'orange':
                nuevoRefresco = this.physics.add.image(pos[0], pos[1], 'orange');
                break;
            default:
                nuevoRefresco = this.physics.add.image(pos[0], pos[1], 'coke'); // Otra opción por defecto
                break;
        }

        if (nuevoRefresco) {
            nuevoRefresco.setScale(0.07);
            nuevoRefresco.setSize(400, 800);
            nuevoRefresco.setOffset(225, 0);
        }

        return nuevoRefresco;
    }
}
