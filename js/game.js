// Viví la Cultura Versat – Fase 1 (Phaser 3.90 FIX DEFINITIVO)

class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }

  create() {
    // FUNDO
    this.add.rectangle(640, 360, 1280, 720, 0xEEEEEE);

    // TÍTULO
    this.add.text(640, 60, 'Fase 1 – Bienvenida a Versat', {
      fontSize: '32px',
      color: '#2C3E50'
    }).setOrigin(0.5);

    // PLAYER (retângulo com física)
    this.player = this.add.rectangle(200, 500, 40, 60, 0x00CF74);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setGravityY(900);

    // CHÃO INVISÍVEL
    const ground = this.add.rectangle(640, 680, 1280, 40, 0x000000, 0);
    this.physics.add.existing(ground, true);
    this.physics.add.collider(this.player, ground);

    // PORTA
    this.door = this.add.rectangle(1100, 540, 60, 120, 0x145BB3);
    this.physics.add.existing(this.door, true);

    // OVERLAP
    this.physics.add.overlap(this.player, this.door, () => {
      this.showQuestion();
    });

    // CONTROLES
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.cursors) return;

    const body = this.player.body;

    if (this.cursors.left.isDown) {
      body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      body.setVelocityX(200);
    } else {
      body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && body.blocked.down) {
      body.setVelocityY(-500);
    }
  }

  showQuestion() {
    if (this.questionShown) return;
    this.questionShown = true;

    this.physics.pause();

    // PAINEL
    this.add.rectangle(640, 360, 900, 420, 0xFFFFFF);

    // PERGUNTA
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

    // RESPOSTA CORRETA
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
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [Level1]
  };

  new Phaser.Game(config);
};
