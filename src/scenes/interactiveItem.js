export default class InteractiveItem extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, rectPosX, rectPosY, key){
        super(scene, x, y, key) //Asegurarse que el nombre del archivo sea igual que el de la key

        this.scene.add.existing(this);
        this.rectPos = {x: rectPosX, y: rectPosY, w:50, h:50} // color para visualizarlo de momento
    }
    create(){
        //this.add.image(this.x, this.y, this.key)
        this.rect = this.add.rectangle(this.rectPos.x,this. rectPos.y, 50, 50, 0xDC4728)
    }
    
    // onTriggerWithPlayer(x, y){
        
    //     if((x > (rect.x - rect.width/2) && x < (rect.x + rect.width/2)) && (y > (rect.y - rect.height/2) && y < (rect.y + rect.height/2))){
    //         console.log('esta encima');
    //         return true;
    //     }else return false;
    // }
}