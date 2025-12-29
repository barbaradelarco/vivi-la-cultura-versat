// Viví la Cultura Versat – Fase 1 (GitHub Pages FIX)

class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }

  create() {
    this.add.rectangle(640, 360, 1280, 720, 0xEEEEEE);

    this.add.text(640, 80, 'Fase 1 – Bienvenida a Versat', {
      fontSize: '32px',
      color: '#2C3E50'
    }).setOrigin(0.5);

    this.player = this.physics.add.sprite(200, 500, null);
    this.player.setDisplaySize(40, 60);
    this.player.setTint(0x00CF74);
    this.player.body.setCollideWorldBounds(true);

    this.door = this.physics.add.staticSprite(1100, 520, null);
    this.door.setDisplaySize(60, 100);
    this.door.setTint(0x145BB3);

    this.physics.add.overlap(this.player, this.door, () => {
      this.showQuestion();
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-500);
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

// ⬇️ CRIA O JOGO SOMENTE APÓS O LOAD COMPLETO
window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 720,
    backgroundColor: '#2C3E50',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 900 },
        debug: false
      }
    },
    scene: [Level1]
  };

  new Phaser.Game(config);
};
