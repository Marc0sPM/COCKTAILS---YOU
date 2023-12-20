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
import { setMM, checkExitLevel, currentminigame, setAlcohol, setFruit, setMinigame, setOther, setRefreshment, unlockNextLevel, addCurrentCustomer } from "./GameManager.js";
import PauseMenu from "./PauseMenu.js";


export default class barScene extends Phaser.Scene {
    constructor(customersQuantity) {
        console.log("constructor")
        // super(/*customersQuantity,*/ {key: "BarScene"}); --> cuando metamos varios npcs 
        super({ key: 'barScene' });
        
        this.customerSpawn = {x :600 , y: 600}
        this.customerDestiny = {x: 300, y: 325}
        this.playerSpawn = {x: 300, y: 100}

        //Cabiar cuando tenga el tile map hecho ;P
        this.cloudPos = {x: 500, y: 450}

        this.dialogueCreated = false;
        this.dialogueShown = false;
        this.itemsCreated = false;
        this.itemList = []
    }
    create() {
        //Pausa
        this.player = new Player(this, this.playerSpawn.x, this.playerSpawn.y);
        this.createTileMap()
        //Pausar
        if(!this.pauseScene)
        this.pauseScene = this.scene.add('PauseMenu', PauseMenu, false);
       
        // this.input.keyboard.on('keydown-ESC', () => {
        //     // Pausar el juego y mostrar el menú de pausa
        //     this.sound.pauseAll();
        //     this.scene.pause();
        //     this.scene.launch('PauseMenu');
        // });
        // Audio customer
        this.pipipibu = this.sound.add('pipipibu', { volume:1});

        //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        //intancia el player

        this.player.setCollideWorldBounds(true)

        this.guide = this.add.image(110, 700, 'pistasButton').setDepth(5).setScale(0.2).setInteractive()
        this.cocktailSelector = this.add.image(700, 700, 'cocteleraButton').setDepth(5).setScale(0.7).setInteractive()

        this.generateRandomCustomer()
        this.generateCocktail();
        
        this.generateItems()
        this.createItemsPhysics()
        console.log(this.cocktail)
    }
    update() {
        this.checkExit()
        this.player.update();
        this.customer.update()
        this.updateGuide()
        this.updateCocktailSelector()
        //Pausar el juego
        if(this.player.cursors.esc.isDown){
            setMinigame('barScene')
            this.sound.pauseAll();
            this.scene.pause();
            this.scene.launch('PauseMenu');
        }
        if(this.dialogueShown){
            
            this.dialogueCloud.on("pointerdown", () => {
                this.hideDialogue()
            });
            }
    }
    updateCocktailSelector(){
        this.cocktailSelector.removeAllListeners("pointerdown");
        this.cocktailSelector.on('pointerdown', ()=> {
            var selector = this.add.image(400, 300, 'pistas').setScale(0.5).setInteractive().setDepth(7)
            selector.on('pointerdown', () => {
                guide.destroy()
            })
        })
        this.cocktailSelector.on('pointerover', ()=> {
            this.cocktailSelector.y = 650
        })
        this.cocktailSelector.on('pointerout', ()=> {
            this.cocktailSelector.y = 700
        })
    }
    updateGuide(){
        this.guide.removeAllListeners("pointerdown");
        this.guide.on('pointerdown', ()=> {
            var guide = this.add.image(400, 300, 'pistas').setScale(0.5).setInteractive().setDepth(7)
            guide.on('pointerdown', () => {
                guide.destroy()
            })
        })
        this.guide.on('pointerover', ()=> {
            this.guide.y = 650
        })
        this.guide.on('pointerout', ()=> {
            this.guide.y = 700
        })
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
            const { key, x, y} = itemInfo;
            let activate = true;
            console.log(key)
            if(key == "breakout_item") {
                if(this.cocktail.others == -1) activate = false;
            }
            else if( key == "ices_item"){
                if(this.cocktail.ice == 0) activate = false;
            }
            this.itemList.push(new InteractiveItem(this, x, y, x, y , activate, key).setDepth(6));
        });
    }
    createItemsPhysics(){
        this.itemList.forEach((item)=>{
            this.physics.add.collider(item, this.player)
        })
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
        this.pipipibu.play();
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
        this.dialogueCloud = this.add.image(this.cloudPos.x, this.cloudPos.y, 'dialogueCloude').setInteractive().setFlipY(true);
        this.dialogueCloud.setScale(1.5)
        this.dialogueRect = this.add.rectangle(this.dialogueCloud.x + 5, this.dialogueCloud.y + (this.dialogueCloud.height/6),
                                                this.dialogueCloud.width/1.05, this.dialogueCloud.height/1.3)
        this.dialogueText = this.add.text(this.dialogueRect.x, this.dialogueRect.y, this.dialogue, { 
            fontFamily: 'Comic Sans MS', 
            fontSize: 20, 
            color: '#000022' });

        // Centrar el texto
        this.dialogueText.setOrigin(0.5, 0.5);
    
        // Ajustar el ancho del texto para que quepa en el rectángulo
        this.dialogueText.setWordWrapWidth(this.dialogueRect.width);
        
    }

    hideDialogue(){
        if (this.audio) {
        this.pipipibu.stop(); 
    }
        this.dialogueCloud.disableInteractive();
        this.dialogueCloud.setVisible(false)
        this.dialogueRect.setVisible(false)
        this.dialogueText.visible = false;
        this.dialogueShown = false;
    }
    createInteractionRect(){
        this.interactionRect = this.add.rectangle(this.customer.x, this.customer.y - 100, 60, 60, 0xffffff) //para mostrar poner 0xffffff al final de los parametros
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
                if(this.onTriggerEnter(x, y, item.rect)) {
                    this.scene.pause()
                    this.pipipibu.stop();
                    switch (item.key){
                        case "breakout_item": 
                            setOther(others[this.cocktail.others]);
                            item.unsetInteractive();
                            setMinigame('Breakout');
                            setMM('Mb');
                            this.scene.launch('Breakout')
                            break
                        case "ices_item":
                            item.unsetInteractive();
                            setMinigame('Hielos');
                            setMM('Mh');
                            this.scene.launch("Hielos")    
                            break
                        case "platforms_item":
                            setRefreshment(refreshments[this.cocktail.refreshment])
                            item.unsetInteractive();
                            setMM('Mr');
                            setMinigame('refrescos');
                            this.scene.launch('refrescos')    
                            break
                        case "tree_item":
                            setFruit(fruits[this.cocktail.fruit])
                            item.unsetInteractive()
                            setMinigame('frutas');
                            setMM('Mf');
                            this.scene.launch('frutas')    
                        break
                        case "shoot_item":
                            setAlcohol(alcoholicDrinks[this.cocktail.alcohol])
                            item.unsetInteractive();
                            setMM('Ma');
                            setMinigame('Aim');
                            this.scene.launch('Aim')    
                        break
                    }
                }
            }
            
        })

    }
    createTileMap(){

        this.createObstacle(400, 300, 'obstacle1', 800, 100, 0);  
        this.createObstacle(105, 0, 'obstacle2', 160, 150, 0);  
        this.createObstacle(360, 0, 'obstacle3', 160, 150, 0);
        this.createObstacle(775, 0, 'obstacle4', 160, 115, 0);  


        this.obstacles = [this.obstacle1, this.obstacle2, this.obstacle3,  this.obstacle4];
        this.physics.add.collider(this.player, this.obstacles);


        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        // Tilemap
        let map = this.make.tilemap({ 
            key: "barTiled",
            tileWidth: 32,
            tileHeight: 32
        });

        let floor = map.addTilesetImage("floorTiles", "floor");
        let barObjects = map.addTilesetImage("tilesetBar", "barObjects", 32, 32);

        // Capas del mapa
        let groundLayer = map.createLayer("Suelo", floor);
        let objectsLayer = map.createLayer("Objetos", barObjects);
        let wallLayer = map.createLayer("Pared", barObjects);
        let woodLayer = map.createLayer("Muebles", barObjects);

        //this.objectsLayer.setCollisionByExclusion([-1], true);
        //this.wallLayer.setCollisionByExclusion([-1], true);

        // Profundidad de las capas
        groundLayer.setDepth(0);
        woodLayer.setDepth(1)
        wallLayer.setDepth(4);
        objectsLayer.setDepth(5);

        // Colisiones del Player con la escena
        //this.physics.add.collider(this.player, wallLayer);
        //this.physics.add.collider(this.player, objectsLayer);

        this.player.setDepth(3); // Ajusta la profundidad del jugador según sea necesario

        
    
    }

    createObstacle(x, y, key, width, height, rotation) {
        const obstacle = this.add.sprite(x, y, key);
        this.physics.world.enable([obstacle]);
        obstacle.body.setAllowGravity(false);
        obstacle.body.setImmovable(true);
        obstacle.body.setSize(width, height);
        obstacle.setRotation(Phaser.Math.DegToRad(rotation));
        this.physics.add.collider(this.player, obstacle)
    
        this[key] = obstacle;
    }

    checkExit(){
        var allPlayed = true;
        this.itemList.forEach(item => {
            if(item.canInteract) allPlayed = false
        })
        if(allPlayed){
            //Comporbar si todos los customers del nivel han terminado
            if(checkExitLevel()) {
                unlockNextLevel()
                this.scene.start('Levels')}
            else {
                addCurrentCustomer()

            }
        }
        
    }
}
