import Player from "./player.js";
//import refr from ""/*la escena que cargue esto*/
//import desiredNum from "" 
export default class Refrescos extends Phaser.Scene{
    constructor(){
        super({ key: 'refrescos' })
    }
    create(){
         //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        //Se instancia al player
        this.Player = new Player(this, 300, 300)
        
        //contador de refrescos
        this.cont = 0;
        
        //numero de refrescos para pasarse el nivel
        this.num /* = desiredNum*/
        
        //definir posicion aleatoria del refresco
        
        this.refresco = 'coke' // = refr
        console.log(this.refresco)
        switch(this.refresco){
            case 'coke': this.refresco = this.physics.add.image(400, 400, 'coke');
            break;
            case 'blue': this.refresco = this.physics.add.image(400, 400, 'blue'); 
            break;
            case 'lemon': this.refresco = this.physics.add.image(400, 400, 'lemon'); 
            break;
            case 'orange': this.refresco = this.physics.add.image(400, 400, 'orange'); 
            break;
        }
        this.refresco.setScale(0.1)
        

       //fisica 
       this.physics.add.collider(this.Player, this.refresco, this.handleColision);
       this.spaceKey;
    }
    update(){
        this.Player.update();
    }
    handleColision(player, refresco) {
        // Elimina solo el refresco
        refresco.destroy();

        // Incrementa el contador de refrescos
        this.cont++;

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Aquí puedes hacer algo cuando se alcanza el número deseado, por ejemplo, pasar al siguiente nivel.
            console.log('¡Has alcanzado el número necesario de refrescos!');
        }
    }

}