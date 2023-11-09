export default class Boot extends Phaser.Scene{
    
    constructor(){
        super({key: "Boot"});
    }

    preload(){
        console.log("Preload de Bootloader")

        // this.load.on("complete", ()=>{
        //     // Iniciamos la escena para probar sprites
        //     this.scene.start("MainMenu");
        // })

        //Cargamos sprites
        this.load.image("cursor", "./assets/cursor.png");
        this.load.image("playerPrueba", "./assets/sprites/PersonajeMovPrueba.png");
        this.load.image("background", "./assets/sprites/FondoTemporal.jpg");
        this.load.image("cartelGame", "./assets/sprites/CartelGame.png");
        this.load.image("playButton", "./assets/sprites/Buttons/Buttons Pixel Animation Pack/play/343px/play01.png");
        this.load.image("mainMenuBackground", "./assets/sprites/MenuBackground.jpeg");

        // Carga del mapa
        this.load.image("floor", "./assets/sprites/floorTiles.png");
        this.load.image("barObjects", "./assets/sprites/tilesetBar.png");

        this.load.tilemapTiledJSON("barTiled", "./assets/barTiled.json");
        

        /*----- / ANIMACIONES /-----*/
        //Player - idle 
        this.load.spritesheet('player_idleSprite', "./assets/sprites/Player/player_idle.png",
        {frameWidth: 48, frameHeight: 48})   
        //Player - walk
        this.load.spritesheet('player_walkSprite', "./assets/sprites/Player/player_walk.png",
        {frameWidth: 48, frameHeight: 48})   
    }
    create(){
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNames('player_idleSprite', { start: 0, end: 3}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk',
            frames: this.anims.generateFrameNames('player_walkSprite', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start("MainMenu");
    }
}

