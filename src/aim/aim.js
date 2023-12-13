export default class Aim extends Phaser.Scene {
    constructor(){
        super({ key: 'Aim' });
    }
 create(){
    var bottlesGroup;

    bottlesGroup = this.physics.add.group();
    // Crear 3 botellas de cada tipo
    for (var i = 1; i <= 3; i++) {
        createBottle('gin');
        createBottle('ron');
        createBottle('vodka');
        createBottle('tequila');
    }
    var zzz = null;
    if(zzz == null){
        zzz = 'gin'
    }
    zzzCounter = this.add.text(700, 30, 'zzz: 0', { fontSize: '16px', fill: '#fff' });
    var zzzCounterValue  = 0;
    const bottleTypes = ['gin', 'ron', 'vodka', 'tequila'];
    bottleTypes.forEach((bottleType, index) => {
        this.add.image(500 + index * 50, 30, bottleType);
    });
    // Habilitar la interactividad del ratón
    this.input.on('pointerdown', function (pointer) {
        var clickedBottle = bottlesGroup.getFirstAlive();
        
        if (clickedBottle && clickedBottle.getBounds().contains(pointer.x, pointer.y)) {
            var bottleType = clickedBottle.texture.key;
            if (bottleType === 'zzz') {
                zzzCounterValue++;
                updateCounterText();
                clickedBottle.destroy();
            }
        }
    });
 }
 update() {
    // Mover las botellas de manera aleatoria
    bottlesGroup.children.forEach(function (bottle) {
        if (Phaser.Math.RND.chance(0.2)) {
            bottle.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), Phaser.Math.RND.integerInRange(-100, 100));
        }
    });
  }
 createBottle(bottleType) {
    var bottle = bottlesGroup.create(Phaser.Math.RND.integerInRange(50, 550), Phaser.Math.RND.integerInRange(50, 450), bottleType);
    bottle.setInteractive();
 }
 updateCounterText(bottleType) {
    // Si la botella no es de tipo zzz, salir de la función
    if (bottleType !== 'zzz') {
        return;
    }

    // Actualizar el texto del contador con el nuevo valor
    zzzCounter.setText(`zzz: ${zzzCounterValue}`);

    // Verificar si se han roto suficientes botellas zzz para terminar el juego
    if (zzzCounterValue >=3) {
        console.log('¡Juego terminado!');
    }
}
}