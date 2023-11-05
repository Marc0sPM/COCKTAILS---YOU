export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        this.play('walk', true)
    }
}