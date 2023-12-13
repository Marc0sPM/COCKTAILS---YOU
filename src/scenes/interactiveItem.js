export default class InteractiveItem extends Phaser.GameObjects.GameObject{
    constructor(scene, x, y, rectPosX, rectPosY, key){
        super(scene, x, y, key) //Asegurarse que el nombre del archivo sea igual que el de la key
        this.key = key;
        this.scene.add.existing(this);
        this.rectPos = {x: rectPosX, y: rectPosY} // color para visualizarlo de momento

        //this.rectContainer = this.scene.add.container(x, y);
        
        this.create()
    }
    create(){
        //this.add.image(this.x, this.y, this.key)
        this.rect = this.scene.add.rectangle(this.rectPos.x,this.rectPos.y, 50, 50, 0xDC4728)

        //this.rectContainer.add(this.rect);

      
    }
    
}