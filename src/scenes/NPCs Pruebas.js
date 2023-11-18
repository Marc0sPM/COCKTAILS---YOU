// Definir la clase
class Npc extends infoNPC {
    constructor(scene, x, y, type, destinoX, destinoY) {
        super(scene, x, y, 'npc'); // Reemplaza 'nombreDeTuSprite' con el nombre de tu sprite

        // Atributos personalizados
        this.color = color;
        this.numero = numero;
        this.type = type;
        this.destinoX = destinoX;
        this.destinoY = destinoY;

        // Añadir la instancia a la escena
        scene.add.existing(this);
    }
    
    // Otros métodos y funciones que quieras agregar a tu clase
    
}

// Crear una instancia de la clase
var miInstancia = new MiObjeto(scene, x, y, color, numero, informacion, destinoX, destinoY);
