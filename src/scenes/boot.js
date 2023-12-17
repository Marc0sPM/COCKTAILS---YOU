export default class Boot extends Phaser.Scene{
    
    constructor(){
        super({key: "Boot"});
    }

    preload(){
        console.log("Preload de Bootloader")

        /*----- / SPRITES / -----*/
        this.load.image("cursor", "./assets/cursor.png");
        this.load.image("background", "./assets/sprites/FondoTemporal.jpg");
        this.load.image("cartelGame", "./assets/sprites/CartelGame.png");
        this.load.image("playButton", "./assets/sprites/Buttons/Buttons Pixel Animation Pack/play/343px/play01.png");
        this.load.image("mainMenuBackground", "./assets/sprites/MenuBackground.jpeg");
        this.load.image('dialogueCloude', './assets/sprites/cloud.png')
        
        /*----- / BREAKOUT / -----*/
        this.load.image('backgroundBreakout', '\\assets\\sprites\\breakout\\background.png');
        this.load.image('paddle', '\\assets\\sprites\\breakout\\paddle.png');
        this.load.image('ball', '\\assets\\sprites\\breakout\\ball.png');
        this.load.image('block', '\\assets\\sprites\\breakout\\block.png');
        this.load.image('gameOver', '\\assets\\sprites\\breakout\\gameOver.png');
        this.load.image('blockhierbabuena', '\\assets\\sprites\\breakout\\blocklima.png');
        this.load.image('blockazucar', '\\assets\\sprites\\breakout\\blockazucar.png');
        this.load.image('win','\\assets\\sprites\\breakout\\win.png');
        
        /*----- / REFRESCOS / -----*/
        this.load.image("coke", "./assets/sprites/Refrescos/Coke.png");
        this.load.image("blue", "./assets/sprites/Refrescos/Blue.png");
        this.load.image("lemon", "./assets/sprites/Refrescos/Lemon.png");
        this.load.image("orange", "./assets/sprites/Refrescos/Orange.png");
        this.load.image("estante", "./assets/sprites/Refrescos/Estante.png");
        this.load.image("contador", "./assets/sprites/Refrescos/contador.png");

   
        /*----- / TIGERBALL / -----*/
        this.load.image("icecube", "./assets/sprites/TigerBall/Icecube.png");
        this.load.image("cubitera", "./assets/sprites/TigerBall/Cubito.png");
        this.load.image("backgroundIce", "./assets/sprites/TigerBall/Fondo2.jpg");
        this.load.image("cubiteraTransparente", "./assets/sprites/TigerBall/CubitoTransparente.png");
        this.load.image("spaceParaReiniciar", "./assets/sprites/TigerBall/Cartel.png");

        /*----- /AIM/ -----*/
        this.load.image('tequila', '\\assets\\sprites\\aim\\tequila.png');
        this.load.image('ron', '\\assets\\sprites\\aim\\ron.png');
        this.load.image('vodka', '\\assets\\sprites\\aim\\vodka.png');
        this.load.image('gin', '\\assets\\sprites\\aim\\gin.png');

        /*----- / MAPA / -----*/
        this.load.image("floor", "./assets/sprites/floorTiles.png");
        this.load.image("barObjects", "./assets/sprites/tilesetBar.png");

        this.load.tilemapTiledJSON("barTiled", "./assets/barTiled.json");
        
        

        /*----- / PLAYER / -----*/
        //Player - idle 
        this.load.spritesheet('player_idleSprite', "./assets/sprites/Player/player_idle.png",
        {frameWidth: 48, frameHeight: 48})   
        //Player - walk
        this.load.spritesheet('player_walkSprite', "./assets/sprites/Player/player_walk.png",
        {frameWidth: 48, frameHeight: 48})   

        /*----- / CUSTOMERS / -----*/
        this.load.spritesheet('customers', "./assets/sprites/customers.png",
        {frameWidth: 48, frameHeight: 60})
       
    }
    create(){

        /*----- / ANIMACIONES / -----*/
        //Player
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
        
        //Customer
        /*-- 0 --*/
        this.anims.create({
            key: 'customer_walkBackWards_0',
            frames: this.anims.generateFrameNames('customers', { start: 27, end: 29}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'customer_idle_0',
            frames: this.anims.generateFrameNames('customers', { start: 28, end: 28}),
            frameRate: 10,
            repeat: 1
        });
         /*-- 1 --*/
        this.anims.create({
            key: 'customer_walkBackWards_1',
            frames: this.anims.generateFrameNames('customers', { start: 30, end: 32}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'customer_idle_1',
            frames: this.anims.generateFrameNames('customers', { start: 31, end: 31}),
            frameRate: 10,
            repeat: 1
        });
         /*-- 2 --*/
        this.anims.create({
            key: 'customer_walkBackWards_2',
            frames: this.anims.generateFrameNames('customers', { start: 33, end: 35}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'customer_idle_2',
            frames: this.anims.generateFrameNames('customers', { start: 34, end: 34}),
            frameRate: 10,
            repeat: 1
        });

        this.scene.start("MainMenu");
    }
}

