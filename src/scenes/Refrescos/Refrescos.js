import Player from "../player.js";

export default class Refrescos extends Phaser.Scene {
    constructor() {
        super({ key: 'refrescos' })
    }

    create() {
        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);
        // Se instancia al jugador
        this.Player = new Player(this, 100, 300);
        this.Player.body.setGravityY(50000);
        this.Player.setCollideWorldBounds(true);

        // Contador de refrescos
        this.cont = 0;

        // Número de refrescos para pasar al siguiente nivel
        this.num /* = desiredNum*/

        // Temporizador
        this.temporizador = 600 /*= temp*/

        // Definir posición aleatoria del refresco
        this.refresco = 'coke'; // = refr
        console.log(this.refresco);
        this.refresco = this.spawnRefresco(); // Corregir esta línea

        // Instanciar los estantes 
        this.estante1 = this.physics.add.image(130, 400, 'estante').setImmovable();
        this.estante1.setScale(0.4);
        this.estante1.setScale(0.4);
        this.estante1.setSize(290, 75);
        this.estante1.setOffset(300, 550);

        this.estante2 = this.physics.add.image(325, 200, 'estante').setImmovable();
        this.estante2.setScale(0.4);
        this.estante2.setScale(0.4);
        this.estante2.setSize(290, 75);
        this.estante2.setOffset(300, 550);

        this.estante3 = this.physics.add.image(520, 400, 'estante').setImmovable();
        this.estante3.setScale(0.4);
        this.estante3.setScale(0.4);
        this.estante3.setSize(290, 75);
        this.estante3.setOffset(300, 550);

        this.estante4 = this.physics.add.image(715, 200, 'estante').setImmovable();
        this.estante4.setScale(0.4);
        this.estante4.setScale(0.4);
        this.estante4.setSize(290, 75);
        this.estante4.setOffset(300, 550);

        // Física
        this.physics.add.collider(this.Player, this.refresco, this.handleColision.bind(this));
        this.physics.add.collider(this.Player, this.estante1)
        this.physics.add.collider(this.Player, this.estante2)
        this.physics.add.collider(this.Player, this.estante3)
        this.physics.add.collider(this.Player, this.estante4)

    }

    update() {
        this.Player.update();
       
    }

    handleColision(player, refresco) {
        // Elimina solo el refresco
        refresco.destroy();

        // Incrementa el contador de refrescos
        this.cont++;

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Cambiar de escena y eso
            console.log('¡Has alcanzado el número necesario de refrescos!');
        } else {
            this.refresco = this.spawnRefresco();
        }
    }
    
    randomPos(){
        let rnd = Phaser.Math.Between(0, 3);
        switch(rnd){
            case 0: return [115, 400]
            case 1: return [310, 200]
            case 2: return [505, 400]
            case 3: return [700, 200]
        }
    }
    spawnRefresco() {
        let nuevoRefresco;
        let pos = this.randomPos()
        switch (this.refresco) {
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
