// Definir la clase
export default class Customer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, destinoX, destinoY) {
        super(scene, x, y, type, destinoX, destinoY, {key:'customer'}); 

      
        scene.add.existing(this);
        this.setScale(2);
    }
    
    update(){
        if(this.y < this.destinoY) this.setVelocityY(1)
        else this.setVelocityY(0)
    }    
}

// Crear una instancia de la clase
// var miInstancia = new MiObjeto(scene, x, y, color, numero, informacion, destinoX, destinoY);
