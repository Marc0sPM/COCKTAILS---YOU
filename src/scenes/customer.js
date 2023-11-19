// Definir la clase
export default class Customer extends Phaser.Sprite {
    constructor(scene, x, y, type, destinoX, destinoY) {
        super(scene, x, y, type, destinoX, destinoY, {key:'customer'}); // Reemplaza 'nombreDeTuSprite' con el nombre de tu sprite

      
        scene.add.existing(this);
    }
    
    // Otros métodos y funciones que quieras agregar a tu clase
    
}

// Crear una instancia de la clase
var miInstancia = new MiObjeto(scene, x, y, color, numero, informacion, destinoX, destinoY);
