import Player from "./player.js"

export default class EscenaVivuPrueba extends Phaser.Scene{
    constructor(){
        super({key: 'EscenaVivuPrueba' });

        
    }

    preload(){
        console.log('preload EscenaVivuPrueba')
    }
    create(){
        //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        // Configurar jugador
        this.player = new Player(this, 300, 300);
        this.physics.world.enable(this.player);  // Habilitar físicas para el jugador
        this.player.setCollideWorldBounds(true);  // Asegurar que el jugador no salga de los límites del mundo

        console.log('create EscenaVivuPrueba')


        // Tilemap
        let map = this.add.tilemap("barTiled");

        let floor = map.addTilesetImage("floorTiles", "floor");
        //let barObjects = map.addTilesetImage("tilesetBar", "barObjects");
        let barObjects = map.addTilesetImage("tilesetBar", "barObjects", 32, 32);


        // Capas del mapa
        let groundLayer = map.createLayer("Suelo", floor, 0, 0);
        let wallLayer = map.createLayer("Varios", barObjects, 0, 0);
        let woodLayer = map.createLayer("Pared", barObjects, 0, 0);
        let variousLayer = map.createLayer("Madera", barObjects, 0, 0);

        // Profundidad de las capas
        groundLayer.setDepth(0);
        wallLayer.setDepth(2);
        woodLayer.setDepth(3);
        variousLayer.setDepth(4);
        
        this.player.setDepth(1);

        // Colisiones del Player con la escena
        this.physics.world.enable([wallLayer, woodLayer, variousLayer]);
        
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.collider(this.player, woodLayer);
        this.physics.add.collider(this.player, variousLayer);
    }
    update(){
        this.player.update();
    }
}
