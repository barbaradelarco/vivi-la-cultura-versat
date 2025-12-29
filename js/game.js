// Viví la Cultura Versat – Fase 1

class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1');
  }

  create() {
    this.add.rectangle(640, 360, 1280, 720, 0xEEEEEE);

    this.add.text(640, 80, 'Fase 1 – Bienvenida a Versat', {
      fontSize: '32px',
      color: '#2C3E50'
    }).setOrigin(0.5);

    this.player = this.physics.add.rectangle(200, 500, 40, 60, 0x00CF74);
    this.player.body.setCollideWorldBounds(true);

    this.door = this.add.rectangle(1100, 520, 60, 100, 0x145BB3);
    this.physics.add.existing(this.door, true);

    this.physics.add.overlap(this.player, this.door, () => {
      this.showQuestion();
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) this.player.body.setVelocityX(-200);
    else if (this.cursors.right.isDown) this.player.body.setVelocityX(200);
    else this.player.body.setVelocityX(0);

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.setVelocityY(-500);
    }
  }

  showQuestion() {
    this.physics.pause();

    this.add.rectangle(640, 360, 900, 420, 0xFFFFFF);

    this.add.text(
      640,
      260,
      '¿Qué representa la cultura Versat en el día a día?',
      {
        fontSize: '24px',
        color: '#2C3E50',
        wordWrap: { width: 800 }
      }
    ).setOrigin(0.5);

    this.add.text(
      640,
      360,
      'La forma en que trabajamos, decidimos y nos relacionamos',
      {
        backgroundColor: '#00CF74',
        color: '#FFFFFF',
        padding: { x: 20, y: 12 }
      }
    ).setOrigin(0.5);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#2C3E50',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 } }
  },
  scene: Level1
};

new Phaser.Game(config);
