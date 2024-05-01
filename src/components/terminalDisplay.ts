import Phaser from 'phaser';

export class terminalDisplay extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene) {
        super(scene);
        let circleX = 60;
        let circleOffset = 18;
        this.fillStyle(0xc0c0c0, 1);
        this.fillRoundedRect(50, 142, 400, 20, 4);
        this.fillStyle(0xff0000, 1);
        this.fillCircle(circleX, 151, 7);
        this.fillStyle(0xffa500, 1);
        this.fillCircle(circleX + circleOffset, 151, 7);
        this.fillStyle(0x008000, 1);
        this.fillCircle(circleX + circleOffset * 2, 151, 7);
        scene.add.rectangle(250, 420, 400, 520, 0x000000);
        scene.add.existing(this);
    }
}