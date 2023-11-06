class Scene_Pruebasprites extends Phaser.Scene{
    constructor(){
        super({key: "Scene_Pruebasprites"});
    }
    
    create(){
        console.log("Scene 1");

        let background;
        
        // Pintamos el fondo
        background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "background");
        background.setScale(0.7);

        // Pintamos al player
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "playerPrueba");
        
    }
}

export default Scene_Pruebasprites;