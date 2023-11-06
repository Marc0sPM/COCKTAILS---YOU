class Scene_Pruebasprites extends Phaser.Scene{
    constructor(){
        super({key: "Scene_Pruebasprites"});
    }
    
    create(){
        console.log("Scene 1");

        let background,
            playerPrueba,
            player;
        
        // Pintamos el fondo
        background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "background");
        background.setScale(0.7);

        // Pintamos al playerPrueba
        playerPrueba = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "playerPrueba");
        
        // Pintamos Player
        player = this.add.spritesheet(100, 100, "player");
    }
}

export default Scene_Pruebasprites;