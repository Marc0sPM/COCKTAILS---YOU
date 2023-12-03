import Player from "./player.js";
import Customer from "./customer.js"
import { dialogues } from "../Dialogues.js";

export default class barScene extends Phaser.Scene {
    constructor(customersQuantity) {
        console.log("constructor")
        // super(/*customersQuantity,*/ {key: "BarScene"}); --> cuando metamos varios npcs 
        super({ key: 'barScene' });
        this.customerSpawn = {x :400 , y: 600}
        this.customerDestiny = {x: 300, y: 250}

        //Cabiar cuando tenga el tile map hecho ;P
        this.cloudPos = {x: 500, y: 500}

        this.showDialogueOnce = false;
    }
    preload() {
        //temporal, pasar  luego a  boot
        this.load.image('dialogueCloude', './assets/sprites/cloud.png')
    }
    create() {
        //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        //intancia el player
        this.player = new Player(this, 300, 300);
        
        //algo que espere cierto tiempo entre costumers o para texto de tutorial
        this.generateRandomCustomer()

        console.log(this.customerType)
        console.log(this.dialogue)
    }
    update() {
        this.player.update();
        this.customer.update();
    }


    generateRandomCustomer() {

        const availableTypes = Object.keys(dialogues);
        this.customerType = Phaser.Math.RND.pick(availableTypes);

        const possibleDialogues = dialogues[this.customerType];
        this.dialogue = Phaser.Math.RND.pick(possibleDialogues);
        
        
        this.customer = new Customer(this, this.customerSpawn.x, this.customerSpawn.y, this.customerType, this.dialogue, this.customerDestiny.y)
        
    }
    
    showDialogue(){
        if(this.showDialogueOnce == false){
            this.printDialogue();
            this.showDialogueOnce = true;
        }

    }
    printDialogue(){
        //Poner
        this.dialogueCloud = this.add.image(this.cloudPos.x, this.cloudPos.y, 'dialogueCloude')
        this.dialogueCloud.setScale(1.5)
        this.dialogueRect = this.add.rectangle(this.dialogueCloud.x + 5, this.dialogueCloud.y - (this.dialogueCloud.height/6),
                                                this.dialogueCloud.width/1.05, this.dialogueCloud.height/1.3)
        var texto = this.add.text(this.dialogueRect.x, this.dialogueRect.y, this.dialogue, { fontFamily: 'Arial', fontSize: 32, color: '#000000' });

        // Centrar el texto
        texto.setOrigin(0.5, 0.5);
    
        // Ajustar el ancho del texto para que quepa en el rectángulo
        texto.setWordWrapWidth(this.dialogueRect.width);
    }
    
}
