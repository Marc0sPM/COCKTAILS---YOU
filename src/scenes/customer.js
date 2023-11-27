


// Definir la clase
export default class Costumer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, type, destinoY) {
        super(scene, x, y, type, destinoY, {key:'customer'}); 

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.x = x
        this.y = y
        this.destinoY = 200
        this.type = type;

        this.setScale(2);
        this.speed = 1;
        
    }
    
    update(){

        if(this.y > this.destinoY) {
            //this.setVelocityY(speed)
            //console.log("me muevo")
        }
        else{
            //this.setVelocityY(0)
            //console.log("no me muevo")
        }    
        
    }    
}

// Crear una instancia de la clase
// var miInstancia = new MiObjeto(scene, x, y, color, numero, informacion, destinoX, destinoY);
