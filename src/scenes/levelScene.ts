import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {
    backButton: Phaser.GameObjects.Text;

    level1: Phaser.GameObjects.Text;
    level2: Phaser.GameObjects.Text;
    level3: Phaser.GameObjects.Text;
    level4: Phaser.GameObjects.Text;
    level5: Phaser.GameObjects.Text;
    level6: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "LevelScene" });
    }

    create() {
        /* ---------------     BACKGROUND    ------------------- */
        const level_scn_bg = this.add.image(640, 360, "background-2-level1");
        level_scn_bg.setScale(2);
        /* ---------------     LEVEL PLANETS    ------------------- */
        const lvl1 = this.add.image(150, 600, "planet-1");
        const lvl2 = this.add.image(350, 400, "planet-4");
        const lvl3 = this.add.image(550, 550, "planet-3");
        const lvl4 = this.add.image(750, 300, "planet-14");
        const lvl5 = this.add.image(1000, 375, "planet-12");
        const lvl6 = this.add.image(1150, 100, "planet-13");
        lvl1.setScale(0.1);
        lvl2.setScale(0.1);
        lvl3.setScale(0.1);
        lvl4.setScale(0.1);
        lvl5.setScale(0.1);
        lvl6.setScale(0.1);
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
            .text(120, 595, "Level 1", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("Level_1_2_scene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level1);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level1);
            });
        /* ---------------     LEVEL 2    ------------------- */
        this.level2 = this.add
            .text(320, 395, "Level 2", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("Level2Scene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level2);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level2);
            });
        /* ---------------     LEVEL 3    ------------------- */
        this.level3 = this.add
            .text(520, 545, "Level 3", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("Level3Scene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level3);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level3);
            });
        /* ---------------     LEVEL 4    ------------------- */
        this.level4 = this.add
            .text(720, 295, "Level 4", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("Level4Scene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level4);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level4);
            });
        /* ---------------     LEVEL 5    ------------------- */
        this.level5 = this.add
            .text(970, 370, "Level 5", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("Level5Scene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level5);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level5);
            });
        /* ---------------     LEVEL 6    ------------------- */
        this.level6 = this.add
            .text(1120, 95, "Level 6", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("Level6Scene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level6);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level6);
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

    updateLevelClicked(level: string) {
        this.scene.start(level);
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}
