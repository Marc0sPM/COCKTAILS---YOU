class Player extends Phaser.gameObject{
    constructor(){
        super ({key: "Player"});
    }

    create(){        
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 7
            }),
            repeat: -1,
            frameRate: 10
        })
    }
}