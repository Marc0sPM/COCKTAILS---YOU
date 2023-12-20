import { levels } from "./GameManager.js"
import { setNumCustomers } from "./GameManager.js"

export default class LevelScene extends Phaser.Scene{
    constructor(){
        super({key: 'Levels'})
        this.accesibleLevels = []
        this.buttonScale = 0.2
    }
    create(){
        //Background
        this.background = this.add.image(400, 300, 'levelsBackground').setDepth(0).setAlpha(0.5)
        // this.background.setAlpha(0.5)

        this.buttonLevel1 = this.add.image(160, 300, 'levelsButton').setInteractive().setScale(this.buttonScale)
        this.buttonLevel2 = this.add.image(320, 300, 'levelsButton').setInteractive().setScale(this.buttonScale)
        this.buttonLevel3 = this.add.image(480, 300, 'levelsButton').setInteractive().setScale(this.buttonScale)
        this.buttonLevel4 = this.add.image(640, 300, 'levelsButton').setInteractive().setScale(this.buttonScale)

        this.accesibleLevels.push(this.buttonLevel1)
        this.accesibleLevels.push(this.buttonLevel2)
        if(!this.accesibleLevels.includes(this.buttonLevel1)){
            
        }
    }
    update(){
       this.updateLv1()
       this.updateLv2()
       this.updateLv3()
       this.updateLv4()
        
    }
    updateLv1(){
        if(this.accesibleLevels.includes(this.buttonLevel1)){
            this.hover(this.buttonLevel1)
            //DOWN
            this.buttonLevel1.removeAllListeners("pointerdown");
            this.buttonLevel1.on('pointerdown', () => {
                setNumCustomers(levels[0])
                this.scene.start('barScene')
            })
        }
    }
    updateLv2(){
        if(this.accesibleLevels.includes(this.buttonLevel2)){
            this.hover(this.buttonLevel2)
            this.buttonLevel2.removeAllListeners("pointerdown");
            this.buttonLevel2.on('pointerdown', () => {
                setNumCustomers(levels[1])
                this.scene.start('barScene')
            })
        }
    }
    updateLv3(){
        if(this.accesibleLevels.includes(this.buttonLevel3)){
            this.hover(this.buttonLevel3)
            this.buttonLevel1.removeAllListeners("pointerdown");
            this.buttonLevel1.on('pointerdown', () => {
                setNumCustomers(levels[2])
                this.scene.start('barScene')
            })
        }
    }
    updateLv4(){
        if(this.accesibleLevels.includes(this.buttonLevel4)){
            this.hover(this.buttonLevel4)
            this.buttonLevel1.removeAllListeners("pointerdown");
            this.buttonLevel1.on('pointerdown', () => {
                setNumCustomers(levels[3])
                this.scene.start('barScene')
            })
        }
    }
    hover(button){
        button.on('pointerover', () => {
            button.setScale(this.buttonScale + 0.05)
        })
        button.on('pointerout', () => {
            button.setScale(this.buttonScale)
        })
    }
}