class MainMenu extends Phaser.Scene{
    constructor(){
        super({key: "MainMenu"});
    }
    create() {
        console.log("MainMenu")

        // Crea un botón
        let button = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "playButton");

        // Habilita la interacción con el botón
        button.setInteractive();

        // Escucha el evento "pointerdown" en el botón
        button.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start("Scene_Pruebasprites");
        });
    }
}

export default MainMenu;