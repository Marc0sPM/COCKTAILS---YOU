class MainMenu extends Phaser.Scene{
    constructor(){
        super({key: "MainMenu"});
    }
    create() {
        console.log("MainMenu")
        // Crea el fondo
        let background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "mainMenuBackground");
        // Reducimos el tamaño del fondo
        background.setScale(0.8);

        // Crea un botón
        let button = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "playButton");

        // Habilita la interacción con el botón
        button.setInteractive();

        // Escucha el evento "pointerdown" en el botón
        button.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('A');
        });
    }
}

export default MainMenu;