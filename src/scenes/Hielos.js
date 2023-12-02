import icecube from "./icecube.js";

let ForceX = 20,
    ForceY = 10;

export default class Hielos extends Phaser.Scene {
    constructor() {
        super({ key: 'Hielos' });
    }

    create() {
        // Configurar jugador (Cubo de hielo)
        this.cube = new icecube(this, 300, 300);

        // Configurar la cubitera (Canasta)
        this.target = this.add.sprite(800, 200, 'cubitera');
        this.target.setScale(0.25);
        this.target.setRotation(Phaser.Math.DegToRad(300));

        // Físicas en la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.enable([this.cube, this.target]);

        // Asegurar que el jugador no salga de los límites del mundo
        this.cube.setCollideWorldBounds(true);

        // Configurar eventos del ratón
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointerup', this.onPointerUp, this);

        // Configurar colisión entre el hielo y la cubitera
        this.physics.add.collider(this.cube, this.target, this.onCollision, null, this);

        // Texto para mostrar cuando se completa la colisión
        this.completionText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Completado',
                                           { fontSize: '32px', fill: '#fff' });
        this.completionText.setOrigin(0.5); // Establecer el origen en el centro
        this.completionText.setVisible(false); // Inicialmente ocultamos el texto

        // Marcador para comprobar si el cubo ya ha sido lanzado
        this.isCubeLaunched = false;

        console.log('create Hielos');
    }

    update() {
        if (this.isDragging && !this.isCubeLaunched) {
            // Mover el cubo a la posición del ratón durante el arrastre
            // Habrá que añadir un área máxima donde se pueda arrastrar
            this.cube.x = this.input.x;
            this.cube.y = this.input.y;
        }
    }

    onPointerDown(pointer) {
        // Verificar si el ratón está dentro de los límites del sprite del cubo
        if (this.cube.getBounds().contains(pointer.x, pointer.y)) {
            // Iniciar el arrastre
            this.isDragging = true;
        }
    }

    onPointerUp(pointer) {
        if (this.isDragging && !this.isCubeLaunched) {
            // Detener el arrastre e impulsar el cubo
            this.isDragging = false;
            this.isCubeLaunched = true;

            const velocityX = (pointer.x - this.cube.x) * ForceX;
            const velocityY = (pointer.y - this.cube.y) * ForceY;

            this.cube.setVelocity(velocityX, velocityY);

            // Agregar gravedad para simular el tiro parabólico
            this.physics.world.gravity.y = 800;

            // Configurar la canasta para que no tenga gravedad pq sino se caía :(
            this.target.body.setAllowGravity(false);
        }
    }

    checkCollision(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        // Si se hay colisión entre el sprite A y el B devuelve true
        return Phaser.Geom.Rectangle.Intersection(boundsA, boundsB);
    }

    onCollision() {
        // Verificar si el texto ya está visible para evitar repetir la lógica
        if (!this.completionText.visible && this.isCubeLaunched) {
            // Verificar si hay colisión entre el hielo y la canasta
            if (this.checkCollision(this.cube, this.target)) {
                
                this.completionText.setVisible(true);

                // Ocultar el texto después de un tiempo
                this.time.delayedCall(2000, () => {
                    this.completionText.setVisible(false);
                }, null, this);

                // Enviar al GameManager minijuego completado
            }
        }
    }
}
