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
        
        //----------------------/INICIALIZACION BOTON CON CLASE/--------------------------//
       
        this.buttonAux = new Button(this, this.sys.game.config.width/4 + this.sys.game.config.width/2, 
        this.sys.game.config.height/2 + this.sys.game.config.height/3, 0.25,() => this.changeBarScene(), 'playButton')

        this.levelsButton = new Button(this,this.sys.game.config.width/2, this.sys.game.config.height/2, 1, () => this.changeLevelsScene(), 'playButton')

        
        
        //-------------------------------------------------//



        
    }
    update(){
        this.buttonAux.update()
        this.levelsButton.update()
    }
    changeBarScene(){
        this.buttonAux.disableInteractive()
        this.scene.start('barScene')
    }
    changeLevelsScene(){
        this.levelsButton.disableInteractive()
        this.scene.start('Levels')
    }
    destroy(){
        this.buttonAux.destroy()
        super.destroy()
    }
}

export default MainMenu;