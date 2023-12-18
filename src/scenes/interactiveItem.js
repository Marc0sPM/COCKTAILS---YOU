export default class InteractiveItem extends Phaser.GameObjects.Image{
    constructor(scene, x, y, rectPosX, rectPosY, canInteract, key){
        super(scene, x, y, key) //Asegurarse que el nombre del archivo sea igual que el de la key
        this.key = key;
        this.scene.add.existing(this);
        this.rectPos = {x: rectPosX, y: rectPosY}
        this.canInteract = canInteract // Tambien sirve para saber si hay que interactuar con el item o no
        //Keys para las imagenes (objeto normal o iluminado)
        this.interactImgKey = this.key + '_interact';
        this.create()
    }
    create(){
        //Temporal
        let color1 = 0xDC4728
        let color2 = 0x35D9F0
        let color
        
        //Segun si se puede interactuar o no tiene una img u otra
        if(this.canInteract)  {this.setTexture(this.interactImgKey)
        color = color1}
        else {this.setTexture(this.key)
        color = color2}

        
        this.rect = this.scene.add.rectangle(this.rectPos.x,this.rectPos.y, 50, 50, color)
    }
    
}