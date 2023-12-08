
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



        //-------------------------------------------------//
        // Crea un botón
        let button = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "playButton");

        // Habilita la interacción con el botón
        button.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        button.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('EscenaVivuPrueba');   // Volver a poner "A"
        });
        //-------------------------------------------------//


        //-------------------------------------------------//
        // Botón Breakout
        let buttonBreakout = this.add.image(this.sys.game.config.width/4, 
        this.sys.game.config.height/2 + this.sys.game.config.height/3, "playButton");
        buttonBreakout.setScale(0.25);
        buttonBreakout.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        buttonBreakout.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('Breakout');
        });
        //-------------------------------------------------//


        //-------------------------------------------------//
        // Botón barScene
        let buttonBarScene = this.add.image(this.sys.game.config.width/4 + this.sys.game.config.width/2, 
        this.sys.game.config.height/2 + this.sys.game.config.height/3, "playButton");
        buttonBarScene.setScale(0.25);
        buttonBarScene.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        buttonBarScene.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('barScene');
        });
        //-------------------------------------------------//

        // Botón refrescos
        let buttonRefrescos = this.add.image(this.sys.game.config.width/4 + this.sys.game.config.width/4, 
        this.sys.game.config.height/5 + this.sys.game.config.height/10, "playButton");
        buttonRefrescos.setScale(0.25);
        buttonRefrescos.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        buttonRefrescos.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('refrescos');
        });
        //-------------------------------------------------//



        
    }
}

export default MainMenu;