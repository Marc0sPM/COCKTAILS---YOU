import Customer from "./customer";

export default class barScene extends Phaser.Scene{
    costructor(customersQuantity){
        super(customersQuantity, {key: 'barScene'})

        this.customerSpawn = [{x :300 , y: 600}]
        this.customerDestiny = [{x: 300, y: 250}]
        this.playerSpawn = [{x: 500, y:200} ]
    }
    generateRandomCustomer(){
        this.customerType = Phaser.Math.Between(0, 3);

        //Asignacion  de dialogos en base al customer
        this.customerDialog = this.generateRandomDialog() + (4 * this.customerType);
        this.customer = new Customer(this, this.customerSpawn.x, this.customerSpawn.y, this.customerType, this.customerDestiny.x, this.customerDestiny.y)
    }
    generateRandomDialog(){
        return Phaser.Math.Between(1, 4);
    }
}