import Phaser from "phaser";

export class buttonsScene extends Phaser.Scene {
    constructor() {
        super({ key: "buttonsScene" });
    }

    create() {
        let button = this.add
            .text(1180, 20, "Logs", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.launch("LogScene");
                this.scene.bringToTop("LogScene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(button);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(button);
            });
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}
