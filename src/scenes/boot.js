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
        

        /*----- / ANIMACIONES /-----*/
        //Player - idle 
        this.load.spritesheet('player_idle', "/assets/sprites/Player/sprites-idle.png",
        {frameWidth: 48, frameHeight: 48})   
        //Player - walk
        this.load.spritesheet('player_walk', "/assets/sprites/Player/sprites-walk.png",
        {frameWidth: 48, frameHeight: 48})   
    }
    create(){
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNames('player_idle', { start: 0, end: 3}),
            frameRate: 2,
            repeat: -1
        })

        this.scene.start("MainMenu");
    }
}

