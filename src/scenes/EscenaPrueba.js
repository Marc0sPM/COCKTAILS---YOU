export default class EscenaPrueba extends Phaser.Scene{
    constructor(){
        super({key: 'A' });
    }

    preload(){
        
    }
    create(){
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff3300, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(100,100,100,100);

        this.add.text(120, 110, "OK", {font: "96px Courier", fill: "#000000"});

       this.scene.start('MainScene');
    }
    update(time, delta){

    }
}