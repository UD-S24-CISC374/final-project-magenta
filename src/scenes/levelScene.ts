import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {
    backButton: Phaser.GameObjects.Text;

    level1: Phaser.GameObjects.Text;
    level2: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "LevelScene" });
    }

    create() {
        /* ---------------     BACKGROUND    ------------------- */
        const level_scn_bg = this.add.image(640, 360, "level_1_bg");
        level_scn_bg.setScale(1);
        /* ---------------     LEVEL PLANETS    ------------------- */
        const lvl1 = this.add.image(200, 600, "planet-1");
        const lvl2 = this.add.image(400, 550, "planet-4");
        lvl1.setScale(0.1);
        lvl2.setScale(0.1);
        /* ---------------     BACK BUTTON    ------------------- */
        this.backButton = this.add
            .text(100, 100, "Back", { color: "#0f0" })
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
        /* ---------------     LEVEL 1    ------------------- */
        this.level1 = this.add
            .text(170, 595, "level1", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level1);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level1);
            });
        /* ---------------     LEVEL 2    ------------------- */
        this.level2 = this.add
            .text(375, 545, "level2", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level2);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level2);
            });
        /* ---------------     Test Scene    ------------------- */
        this.level2 = this.add
            .text(300, 100, "Test-Scene", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.gotoTestScene();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level2);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level2);
            });
    }

    //update back clicked and update level clicked need to be implemented proporly,
    //currently have them set up this way for testing purposes
    gotoTestScene() {
        this.scene.start("TestScene");
    }

    updateBackClicked() {
        this.scene.start("MainScene");
    }

    updateLevelClicked() {
        this.scene.start("Level_1_scene");
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}
