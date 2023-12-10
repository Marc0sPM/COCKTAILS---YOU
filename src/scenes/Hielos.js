import icecube from "./icecube.js";

let ForceX = 20,
    ForceY = 10;

export default class Hielos extends Phaser.Scene {
    constructor() {
        super({ key: 'Hielos' });
    }

    create() {
        // Background
        let background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "backgroundIce");

        // Configurar la canasta
        this.target = this.add.sprite(700, 200, 'cubitera');
        this.target.setScale(0.25);
        this.target.setRotation(Phaser.Math.DegToRad(300));

        this.physics.world.enable([this.target]);
        this.target.body.setAllowGravity(false);
        this.target.body.setImmovable(true);
        this.target.body.setSize(100, 100);

        // Crear obstáculos
        this.createObstacle(675, 250, 'obstacle1', 75, 10, 300);
        this.createObstacle(725, 150, 'obstacle2', 75, 10, 300);
        this.createObstacle(750, 200, 'obstacle3', 60, 10, 300);

        // Crear el cubo de hielo
        this.createCube();

        // Configurar eventos del ratón
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointerup', this.onPointerUp, this);

        // Configurar colisiones con obstáculos
        this.obstacles = [this.obstacle1, this.obstacle2, this.obstacle3];
        this.physics.add.collider(this.cube, this.target, this.onCollision, null, this);
        this.physics.add.collider(this.cube, this.obstacles);

        // Texto para mostrar cuando se completa la colisión
        this.completionText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Completado',
            { fontSize: '32px', fill: '#fff' });
        this.completionText.setOrigin(0.5);
        this.completionText.setVisible(false);

        // Marcador para comprobar si el cubo ya ha sido lanzado
        this.isCubeLaunched = false;

        console.log('create Hielos');
    }

    update() {
        if (this.isDragging && !this.isCubeLaunched) {
            this.cube.x = this.input.x;
            this.cube.y = this.input.y;
        }

        if (this.isCubeLaunched && 
            (this.cube.y > this.sys.game.config.height) ||
            (this.cube.y < 0) ||
            (this.cube.x > this.sys.game.config.width) ||
            (this.cube.x < 0)) {
            this.time.delayedCall(1000, () => {
                this.destroyCube();
                this.createCube();
                this.isCubeLaunched = false;
            }, null, this);
        }
    }

    onPointerDown(pointer) {
        if (this.cube.getBounds().contains(pointer.x, pointer.y)) {
            this.isDragging = true;
        }
    }

    onPointerUp(pointer) {
        if (this.isDragging && !this.isCubeLaunched) {
            this.isDragging = false;
            this.isCubeLaunched = true;

            const velocityX = (pointer.x - this.cube.x) * ForceX;
            const velocityY = (pointer.y - this.cube.y) * ForceY;

            this.cube.setVelocity(velocityX, velocityY);

            this.physics.world.gravity.y = 800;
        }
    }

    createCube() {
        this.cube = new icecube(this, 50, Phaser.Math.Between(100, this.sys.game.config.height - 100));
        this.physics.world.enable([this.cube]);
        this.cube.setCollideWorldBounds(true);
        this.cube.body.setAllowGravity(true);
        this.cube.setVelocity(0, 0);
    }

    destroyCube() {
        if (this.cube) {
            this.cube.destroy();
        }
    }

    createObstacle(x, y, key, width, height, rotation) {
        const obstacle = this.add.sprite(x, y, key);
        this.physics.world.enable([obstacle]);
        obstacle.body.setAllowGravity(false);
        obstacle.body.setImmovable(true);
        obstacle.body.setSize(width, height);
        obstacle.setRotation(Phaser.Math.DegToRad(rotation));
    
        this[key] = obstacle;
    }
    

    onCollision() {
        if (!this.completionText.visible && this.isCubeLaunched) {
            this.completionText.setVisible(true);
            this.time.delayedCall(2000, () => {
                this.completionText.setVisible(false);
                this.scene.restart();
            }, null, this);
        }
    }
}
