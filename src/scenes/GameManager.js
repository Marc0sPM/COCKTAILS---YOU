export default class gameManager{
    othersCant = 0;
    addOther(cant){
        othersCant = cant;
    }
    totalStars = 0;
    maxStars = 0;
    addMaxStars(num){
        this.maxStars += num
    }
    addStart(num){
        this.totalStars+= num
    }
}

