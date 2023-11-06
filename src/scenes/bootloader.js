class Bootloader extends Phaser.Scene{
    constructor(){
        super({key: "Bootloader"});
    }

    preload(){
        console.log("Preload de Bootloader")

        this.load.on("complete", ()=>{
            // Iniciamos la escena para probar sprites
            this.scene.start("MainMenu");
        })

        // Importamos el Cursor
        this.load.image("cursor", "./assets/cursor.png");
        // Importamos img Personaje de Prueba
        this.load.image("playerPrueba", "./assets/sprites/PersonajeMovPrueba.png");
        // Importamos img de fondo
        this.load.image("background", "./assets/sprites/FondoTemporal.jpg");
        // Importamos img de Cartel Game
        this.load.image("cartelGame", "./assets/sprites/CartelGame.png");
        // Importamos img botón Play
        this.load.image("playButton", "./assets/sprites/Buttons/Buttons Pixel Animation Pack/play/343px/play01.png");
        // Importamos img de fondo del Menú
        this.load.image("mainMenuBackground", "./assets/sprites/MenuBackground.jpeg")
    }
}

export default Bootloader;