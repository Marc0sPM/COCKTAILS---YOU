


// Definir la clase
export default class Costumer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, type,dialogue, destinoY) {
        super(scene, x, y, {key:'customer'}); 
        this.type = type;
        this.dialogue = dialogue
        this.destinoY = destinoY

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        //ver si queremos crearlos siempre en el mismo sitio-> no hace falta pasarle la posicion y se crea aqui
        // this.x = x; esto es por si queremos instancialos en distintos lugares
        // this.y = y;
        
        this.x = 400
        this.y = 400
        this.destinoY = 200
        this.type = type;

        this.setScale(2);
        
        
    }
    
    update(){

        if(this.y > this.destinoY) {
            this.setVelocityY(-200)
            //console.log("me muevo")
        }
        else{
            this.setVelocityY(0)
            //console.log("no me muevo")
        }    
        
    }    
}

// Crear una instancia de la clase
// var miInstancia = new MiObjeto(scene, x, y, color, numero, informacion, destinoX, destinoY);
