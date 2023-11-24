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
        //intancia el player
        this.player = new Player(this, 300, 300);
        //se agrega player a escena
        

        console.log('create EscenaVivuPrueba')

        let map = this.add.tilemap("barTiled");

        let floor = map.addTilesetImage("floorTiles", "floor");
        //let barObjects = map.addTilesetImage("tilesetBar", "barObjects");
        let barObjects = map.addTilesetImage("tilesetBar", "barObjects", 32, 32);


        // Capas del mapa
        let groundLayer = map.createLayer("floorTiles", floor, 0, 0);
        let wallLayer = map.createLayer("tilesetBar", barObjects, 0, 0);
        let woodLayer = map.createLayer("tilesetBar", barObjects, 0, 0);
        let variousLayer = map.createLayer("tilesetBar", barObjects, 0, 0);
    }
    update(){
        this.player.update();
    }
}
