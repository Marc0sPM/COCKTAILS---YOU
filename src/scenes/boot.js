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

        //carga sprites breakout
        this.load.image('backgroundBreakout', '\\assets\\sprites\\breakout\\background.png');
        this.load.image('paddle', '\\assets\\sprites\\breakout\\paddle.png');
        this.load.image('ball', '\\assets\\sprites\\breakout\\ball.png');
        this.load.image('blocks', '\\assets\\sprites\\breakout\\blocks.png');
        this.load.image('gameOver', '\\assets\\sprites\\breakout\\gameOver.png');
   
        // Cargamos sprites TigerBall
        this.load.image("icecube", "./assets/sprites/TigerBall/Icecube.png");
        this.load.image("cubitera", "./assets/sprites/TigerBall/Cubito.jpg");

        // Carga del mapa
        this.load.image("floor", "./assets/sprites/floorTiles.png");
        this.load.image("barObjects", "./assets/sprites/tilesetBar.png");

        this.load.tilemapTiledJSON("barTiled", "./assets/barTiled.json");
        

        /*----- / ANIMACIONES / -----*/
        //Player - idle 
        this.load.spritesheet('player_idleSprite', "./assets/sprites/Player/player_idle.png",
        {frameWidth: 48, frameHeight: 48})   
        //Player - walk
        this.load.spritesheet('player_walkSprite', "./assets/sprites/Player/player_walk.png",
        {frameWidth: 48, frameHeight: 48})   


        /*----- / FRASES / -----*/
    }
    create(){
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNames('player_idleSprite', { start: 0, end: 3}),
            frameRate: 7,
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

