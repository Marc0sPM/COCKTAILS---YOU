import Bottle from "./bottle.js"
import { alcoholicDrinks } from "../Cocktails.js";

export default class Aim extends Phaser.Scene {
    //  Meter parametro de entrada
    constructor(){
        super({ key: 'Aim' });
        //Lista botellas
        this.bottleList = []
        //Asignar desde constructor
        this.targetBottle = 'gin'
        this.CounterValue  = 0;
    }
 create(){
     //cambiar a otro backgorund
     //poner bien botellas
     this.background = this.add.image(400, 250, 'backgroundBreakout').setDepth(0);
     this.background.setInteractive();
   
     //temporizador
     this.temporizador = 30
        
     this.temporizadorText = this.add.text(800 - 200, 30, 'Tiempo: ' + this.temporizador, { 
     fontFamily: 'Comic Sans MS',
     fontSize: '32px',
     fill: '#fff'
    });
     //gameOver
     this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
     this.gameoverImage.visible = false;
     this.gameoverImage.setDepth(2);
     //win
     this.win = this.add.image(400, 300, 'win').setScale(0.8);
     this.win.setDepth(2);
     this.win.visible = false;

     this.physics.world.setBoundsCollision(true,true,true,true);

     this.bottlesGroup = this.physics.add.group();
     this.targetCounter = this.add.text(50, 30, ` ${this.targetBottle}: ${this.CounterValue}`, {fontFamily: 'Comic Sans MS', fontSize: '32px', fill: '#fff' });
     this.add.image(20, 44, this.targetBottle).setScale(0.15);

     const bottleTypes = ['gin', 'ron', 'vodka', 'tequila'];
     // Habilitar la interactividad del ratón
     this.input.on('gameobjectdown', (pointer,gameObject) => {
        if (gameObject instanceof Bottle) {
            this.handleClick(gameObject);
        }
        else{
            this.temporizador -= 1;
        }
    });
    this.createBottle();
 }
 handleClick(bottle) {
    if (bottle.type === this.targetBottle) {
        this.CounterValue++;
        console.log("añade");
        this.updateCounterText();
    }
    else{
        this.temporizador -= 3;
    }
    bottle.destroy();
    console.log("destruye");
}
 createBottle() {
    for(var i = 0; i < 4; i++){
        this.createIndividualBottle(alcoholicDrinks[i])
    }
 }
 createIndividualBottle(bottletype){
    for(var i = 0; i < 4; i++){
        this.bottleList.push(new Bottle(this, Phaser.Math.RND.integerInRange(50, 550), Phaser.Math.RND.integerInRange(50, 450), bottletype))
    }
   }

 updateCounterText() {
    this.targetCounter.setText(`${this.targetBottle}: ${this.CounterValue}`);
        if (this.CounterValue >= 4) {
         this.win.visible = true;
         
         this.time.delayedCall(2000, () => {
            this.exitScene();
        })
        }
    }
    update(time,delta) {

        this.temporizador -= (delta / 1000);
        if(this.temporizador <= 0){
            this.gameoverImage.visible = true;
            
            this.time.delayedCall(2000, () => {
                this.exitScene();
                
            })
            
        }
        this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));
        
    }
    exitScene(){
        this.scene.resume('barScene')
        this.scene.stop()
        
    }
}