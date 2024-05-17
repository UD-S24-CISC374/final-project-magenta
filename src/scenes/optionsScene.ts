import Phaser from "phaser";

export default class OptionsScene extends Phaser.Scene {
    /* ---------------     BACK BUTTON    ------------------- */
    backButton: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "OptionsScene" });
    }

    create() {
        //REMOVE
        this.scene.start("LogScene");
        /* ---------------     BACKGROUND COLOUR    ------------------- */
        this.cameras.main.setBackgroundColor("#9C9562");
        /* ---------------     BACK BUTTON    ------------------- */
        this.backButton = this.add
            .text(400, 400, "Back", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateBackClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.backButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.backButton);
            });
    }

    /* ---------------     BACK BUTTON    ------------------- */
    updateBackClicked() {
        this.scene.start("MainScene");
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}
