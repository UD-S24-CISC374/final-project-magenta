import Phaser from "phaser";

export default class TerminalButton extends Phaser.GameObjects.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        text: string,
        eventID: string
    ) {
        const BUTTON_X = x;
        const BUTTON_Y = y;

        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerdown", () => {
            this.scene.events.emit(eventID);
            this.anims.play("buttonPressed");
        });
        this.on("pointerup", () => {
            this.anims.play("buttonUp");
        });

        const fontSize = text.length > 12 ? "20px" : "32px";
        const textObject = scene.add.text(BUTTON_X, BUTTON_Y, text, {
            fontSize: fontSize,
            color: "#FFF",
        });
        textObject.setOrigin(0.5, 0.5);
        textObject.setWordWrapWidth(248);
        textObject.setAlign("center");
    }
}
