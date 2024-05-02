import Phaser from "phaser";

export default class PauseScene extends Phaser.Scene {
    /* ---------------     RESUME BUTTON    ------------------- */
    resumeButton: Phaser.GameObjects.Text;
    /* ---------------     MAIN MENU BUTTON    ------------------- */
    mainMenuButton: Phaser.GameObjects.Text;

    previousScene: Phaser.Scene;

    constructor() {
        super({ key: "PauseScene" });
    }

    init(data: { previousScene: Phaser.Scene }) {
        this.previousScene = data.previousScene;
    }

    create() {
        /* ---------------     BACKGROUND COLOUR    ------------------- */
        this.cameras.main.setBackgroundColor("#4B6E6E");
        /* ---------------     RESUME BUTTON    ------------------- */
        this.resumeButton = this.add
            .text(400, 300, "Resume", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateResumeClicked(this.previousScene);
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

    updateResumeClicked(scene: Phaser.Scene) {
        this.scene.stop();
        this.scene.resume(scene.scene.key);
        scene.scene.setVisible(true);
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
