import Phaser from "phaser";
import { currentLevel } from "./currentLevel";

export default class RespawnScene extends Phaser.Scene {
    /* ---------------     RESUME BUTTON    ------------------- */
    resumeButton: Phaser.GameObjects.Text;
    /* ---------------     MAIN MENU BUTTON    ------------------- */
    mainMenuButton: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "RespawnScene" });
    }

    create() {
        /* ---------------     BACKGROUND COLOUR    ------------------- */
        const level_scn_bg = this.add.image(640, 360, "respawn");
        level_scn_bg.setScale(2);
        /* ---------------     RESUME BUTTON    ------------------- */
        this.resumeButton = this.add
            .text(400, 300, "Respawn", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateRespawnClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.resumeButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.resumeButton);
            });

        /* ---------------     MAIN MENU BUTTON    ------------------- */
        this.mainMenuButton = this.add
            .text(400, 400, "Main Menu", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateMainMenuClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.mainMenuButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.mainMenuButton);
            });
    }

    updateRespawnClicked() {
        this.scene.run(currentLevel);
        this.scene.stop();
    }

    updateMainMenuClicked() {
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
