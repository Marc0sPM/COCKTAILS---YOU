class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    create() {
        // Puedes agregar elementos del menú de pausa aquí, como botones, texto, etc.
        // Por ejemplo:
        this.add.text(400, 300, 'Juego en pausa', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Manejar la resolución del juego
        this.scale.once('resize', (gameSize) => {
            this.scene.stop('PauseMenu');
            this.scene.resume('Breakout');
        });

        // Pausar el juego principal
        this.scene.pause('Breakout');

        // Volver al juego cuando se hace clic en el menú de pausa
        this.input.on('pointerdown', () => {
            this.scene.stop('PauseMenu');
            this.scene.resume('Breakout');
        });
    }
}

export default PauseMenu;
