import Player from "./player.js";

export default class EscenaVivuPrueba extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaVivuPrueba' });
    }

    preload() {
        console.log('preload EscenaVivuPrueba');
        
        this.load.image('floor', 'floorTiles.png');
        this.load.image('barObjects', 'tilesetBar.png');
        this.load.tilemapTiledJSON('barTiled', 'barTiled.json');
    }

    create() {
        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        // Configurar jugador
        this.player = new Player(this, 300, 300);
        this.physics.world.enable(this.player); // Habilitar físicas para el jugador
        this.player.setCollideWorldBounds(true); // Asegurar que el jugador no salga de los límites del mundo

        console.log('create EscenaVivuPrueba');

        // Tilemap
        let map = this.make.tilemap({ key: "barTiled" });

        let floor = map.addTilesetImage("floorTiles", "floor");
        let barObjects = map.addTilesetImage("tilesetBar", "barObjects", 32, 32);

        // Capas del mapa
        let groundLayer = map.createLayer("Suelo", floor, 0, 0);
        let objectsLayer = map.createLayer("Objetos", barObjects, 0, 0);
        let wallLayer = map.createLayer("Pared", barObjects, 0, 0);

        // Agrega la capa de objetos al mapa
        //map.addLayer(objectsLayer);

        // Profundidad de las capas
        if (groundLayer) groundLayer.setDepth(0);
        if (wallLayer) wallLayer.setDepth(1);
        if (objectsLayer) objectsLayer.setDepth(2);

        // Colisiones del Player con la escena
        if (this.wallLayer) {
            this.physics.world.enable(this.wallLayer);
            this.physics.add.collider(this.player, this.wallLayer, () => {
                console.log('Colisión con la capa de pared');
            });
        }

        if (objectsLayer) {
            this.physics.world.enable(objectsLayer);
            this.physics.add.collider(this.player, objectsLayer, () => {
                console.log('Colisión con la capa de objetos');
            });
            objectsLayer.setDepth(3); // Ajusta la profundidad de la capa de objetos
        }


        // Ajusta la profundidad del jugador
        if (this.player) {
            this.player.setDepth(4); // Ajusta la profundidad del jugador según sea necesario
        }

        // Botón Hielos
        let buttonHielos = this.add.image(this.sys.game.config.width / 4 + this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + this.sys.game.config.height / 3, "playButton");
        buttonHielos.setScale(0.25);
        buttonHielos.setInteractive();
        buttonHielos.on("pointerdown", () => {
            this.scene.start('Hielos');
        });

        // Botón Breakout
        let buttonBreakout = this.add.image(this.sys.game.config.width / 4,
            this.sys.game.config.height / 2 + this.sys.game.config.height / 3, "playButton");
        buttonBreakout.setScale(0.25);
        buttonBreakout.setInteractive();
        buttonBreakout.on("pointerdown", () => {
            this.scene.start('Breakout');
        });
    }

    update() {
        this.player.update();
    }
}
