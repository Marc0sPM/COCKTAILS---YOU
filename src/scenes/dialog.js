import {infoNPC} from '../Dialogs'

export default class Dialog extends Pahser.Sprite{

    constructor(index){
        super(index, {key:'dialog'})
        this.text = infoNPC[index];
    }

} 