import Player from "./player.js";
import Customer from "./customer.js"
import InteractiveItem from "./interactiveItem.js";
import { intItems } from "../Cocktails.js";
import { dialogues } from "../Dialogues.js";
import { cocktails } from "../Cocktails.js";
import { fruits } from "../Cocktails.js";
import { alcoholicDrinks } from "../Cocktails.js";
import { refreshments } from "../Cocktails.js";
import { others } from "../Cocktails.js";


export default class barScene extends Phaser.Scene {
    constructor(customersQuantity) {
        console.log("constructor")
        // super(/*customersQuantity,*/ {key: "BarScene"}); --> cuando metamos varios npcs 
        super({ key: 'barScene' });
        this.customerSpawn = {x :400 , y: 600}
        this.customerDestiny = {x: 300, y: 250}

        //Cabiar cuando tenga el tile map hecho ;P
        this.cloudPos = {x: 500, y: 500}

        this.dialogueCreated = false;
        this.dialogueShown = false;

        this.itemList = []
    }
    create() {
        //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        //intancia el player
        this.player = new Player(this, 300, 300);

        this.player.setCollideWorldBounds(true)
        this.generateRandomCustomer()
        this.generateCocktail();
        console.log(this.cocktail);
        
        
        this.generateItems()
        console.log(this.itemList)
    }
    update() {
        this.player.update();
        this.customer.update()
        
        if(this.dialogueShown){
            this.dialogueCloud.on("pointerdown", () => {
                this.hideDialogue()
            });
            }
    }
    generateCocktail(){
        const possibleCocktails = Object.keys(cocktails);
        switch(this.customerType){
            case "morado":
                this.cocktail = cocktails[possibleCocktails[0]];
                break;
            case "verde":
                this.cocktail = cocktails[possibleCocktails[1]];
                break;
            case "azul":
                this.cocktail =cocktails[possibleCocktails[2]];
                break
            case "amarillo":
                this.cocktail = cocktails[possibleCocktails[3]];
                break
        }
    }
    generateItems(){
        //modificar mas tarde, queda crear un archivo de entrada para cada cocktail, que llevara a ciertos minijuegos ...
        Object.entries(intItems).forEach(([id, itemInfo]) => {
            const { key, x, y } = itemInfo;
            let activate = true;
            console.log(key)
            if(key == "breakout_item") {
                if(this.cocktail.others == -1) activate = false;
            }
            else if( key == "ices_item"){
                if(this.cocktail.ice == 0) activate = false;
            }
            this.itemList.push(new InteractiveItem(this, x, y, x, y, activate, key));
        });
    }
    generateRandomCustomer() {

        const availableTypes = Object.keys(dialogues);
        this.customerType = Phaser.Math.RND.pick(availableTypes);

        const possibleDialogues = dialogues[this.customerType];
        this.dialogue = Phaser.Math.RND.pick(possibleDialogues);

        //Para que no aparezcan skins iguales tan de seguido
        var lastSkin = -1;
        var customerSkin = Phaser.Math.Between(0,2)
        while(customerSkin == lastSkin) {customerSkin = Phaser.Math.Between(0,2)}

        this.customer = new Customer(this, this.customerSpawn.x, this.customerSpawn.y, this.customerType, this.dialogue, this.customerDestiny.y, customerSkin)
        this.customerCreated = true;
    }
    
    showDialogue(){
        if(!this.dialogueCreated){
            this.printDialogue();
            this.dialogueCreated = true;
        }
        else{
            if(!this.dialogueShown){
                this.dialogueCloud.setInteractive();
                this.dialogueCloud.setVisible(true)
                this.dialogueRect.setVisible(true)
                this.dialogueText.visible = true;
            }
        }
        this.dialogueShown = true;
    }
    printDialogue(){
        //Poner
        this.dialogueCloud = this.add.image(this.cloudPos.x, this.cloudPos.y, 'dialogueCloude').setInteractive();
        this.dialogueCloud.setScale(1.5)
        this.dialogueRect = this.add.rectangle(this.dialogueCloud.x + 5, this.dialogueCloud.y - (this.dialogueCloud.height/6),
                                                this.dialogueCloud.width/1.05, this.dialogueCloud.height/1.3)
        this.dialogueText = this.add.text(this.dialogueRect.x, this.dialogueRect.y, this.dialogue, { fontFamily: 'Arial', fontSize: 32, color: '#000022' });

        // Centrar el texto
        this.dialogueText.setOrigin(0.5, 0.5);
    
        // Ajustar el ancho del texto para que quepa en el rectángulo
        this.dialogueText.setWordWrapWidth(this.dialogueRect.width);
        
    }

    hideDialogue(){
        this.dialogueCloud.disableInteractive();
        this.dialogueCloud.setVisible(false)
        this.dialogueRect.setVisible(false)
        this.dialogueText.visible = false;
        this.dialogueShown = false;
    }
    createInteractionRect(){
        this.interactionRect = this.add.rectangle(this.customer.x, this.customer.y - 100, 60, 60) //para mostrar poner 0xffffff al final de los parametros
    }

    //Comprobacion de overlap entre un objeto(x,y) y un rect
    onTriggerEnter(x,y, rect){
        
            if((x > (rect.x - rect.width/2) && x < (rect.x + rect.width/2)) && (y > (rect.y - rect.height/2) && y < (rect.y + rect.height/2))){
                console.log('esta encima');
                return true;
            }else return false;
        
    }
    checkInteractions(x, y){
        //Checkear con customer
        if(this.customer.arrived()){
            if(this.onTriggerEnter(x, y, this.interactionRect)) this.showDialogue();
        }
        //ForEach de lista de items 
        this.itemList.forEach(item => {
            if(item.canInteract){
                if(this.onTriggerEnter(x, y, item.rect)) console.log('Cambiar a la escena que le corresponde a ' + item.key)
            }
            
        })

    }
}
