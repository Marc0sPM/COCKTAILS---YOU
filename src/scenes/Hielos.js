import icecube from "./icecube.js";

let ForceX = 20,
    ForceY = 10;

export default class Hielos extends Phaser.Scene {
    constructor() {
        super({ key: 'Hielos' });
    }

    create() {
        // Crear obstáculos
        this.createObstacle(765, 500, 'obstacle1', 10, 100, 0);
        this.createObstacle(635, 500, 'obstacle2', 10, 100, 0);
        this.createObstacle(700, 550, 'obstacle3', 60, 10, 0);
        
        // Background
        let background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "backgroundIce");

        // Crear el cubo de hielo
        this.createCube();
        
        // Configurar la canasta
        this.target = this.add.sprite(700, 500, 'cubitera');
        this.target.setScale(0.40);
        //this.target.setRotation(Phaser.Math.DegToRad(300));

        this.physics.world.enable([this.target]);
        this.target.body.setAllowGravity(false);
        this.target.body.setImmovable(true);
        this.target.body.setSize(100, 5);

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

         // Texto de Reinicio
         //this.restartText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 8, 'Space para reintentar',
         //{ fontSize: '32px', fill: '#000', fontWeight: 'bold' });
         //this.restartText.setOrigin(0.5);

         // Cartel
        let cartel = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 8, "spaceParaReiniciar");
        cartel.setScale(0.75);


        // Marcador para comprobar si el cubo ya ha sido lanzado
        this.isCubeLaunched = false;

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.restart();
        }, this);

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
        // Verificar si el ratón está dentro de los límites del sprite del cubo y si el puntero está en la parte izquierda de la pantalla
        if (this.cube.getBounds().contains(pointer.x, pointer.y) && pointer.x < this.sys.game.config.width / 2) {
            this.isDragging = true;
        }
    }
    
    onPointerUp(pointer) {
        if (this.isDragging && !this.isCubeLaunched) {
            this.isDragging = false;
    
            if (pointer.x > this.sys.game.config.width / 2) {
                // Si el puntero está en la parte derecha de la pantalla reiniciamos la escena
                this.scene.restart();
            }
    
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
        this.cube.body.setBounce(0.5, 0.5);
        this.cube.body.setFriction(1, 1);
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
