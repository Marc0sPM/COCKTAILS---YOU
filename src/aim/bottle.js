export default class Bottle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x ,y, key){
        super(scene, x ,y, key)
        this.type = key;
        this.scene.add.existing(this);
        //Resto codigo
    }
    create(){
        //img
        //etc
    }
    preupdate(){
        this.move()
    }
    move(){

    }
}