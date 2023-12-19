import Button from "./button.js";
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

        //----------------------/INICIALIZACION BOTON CON CLASE/--------------------------//
       
        this.buttonAux = new Button(this, this.sys.game.config.width/4 + this.sys.game.config.width/2, 
        this.sys.game.config.height/2 + this.sys.game.config.height/3, 0.25,() => {this.scene.start('barScene')}, 'playButton')

        
        //-------------------------------------------------//
        // Botón Breakout
        let buttonBreakout = this.add.image(this.sys.game.config.width/4, 
        this.sys.game.config.height/2 + this.sys.game.config.height/3, "playButton");
        buttonBreakout.setScale(0.25);
        buttonBreakout.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        buttonBreakout.on("pointerdown", () => {
            //Carga la escena que desees al hacer clic en el botón
           this.scene.start('Breakout');
        });
        //-------------------------------------------------//

        //-------------------------------------------------//
        // Botón Breakout
        // Botón refrescos
        let buttonRefrescos = this.add.image(this.sys.game.config.width/4 + this.sys.game.config.width/4, 
        this.sys.game.config.height/5 + this.sys.game.config.height/10, "playButton");
        buttonRefrescos.setScale(0.25);
        buttonRefrescos.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        buttonRefrescos.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('frutas');
        });
        //-------------------------------------------------//

        //-------------------------------------------------//
        // Botón barScene
        
        //-------------------------------------------------//
         //-------------------------------------------------//
        // Botón aim
        let aim = this.add.image(this.sys.game.config.width/4, 
        this.sys.game.config.height/4 + this.sys.game.config.height/6, "playButton");
        aim.setScale(0.25);
        aim.setInteractive();
        // Escucha el evento "pointerdown" en el botón
        aim.on("pointerdown", () => {
            // Carga la escena que desees al hacer clic en el botón
            this.scene.start('Aim');
        });
        //-------------------------------------------------//



        
    }
    update(){
        this.buttonAux.update()
    }
    changeBarScene(){
        this.buttonAux.disableInteractive()
        this.scene.start('barScene')
    }
    destroy(){
        this.buttonAux.destroy()
        super.destroy()
    }
}

export default MainMenu;