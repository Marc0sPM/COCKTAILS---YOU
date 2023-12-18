
export var other = ''
export function setOther(num){
    other = num
}

export default class GameManager {
    othersCant = 0
    addOther(cant){
        othersCant = cant;
    }
    totalStars = 0
    maxStars = 0
    addMaxStars(num){
        this.maxStars += num
    }
    addStart(num){
        this.totalStars+= num
    }
    other = ' '
    setOther(h){
        this.other = h
    }
}

