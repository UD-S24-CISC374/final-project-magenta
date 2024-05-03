import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {
    backButton: Phaser.GameObjects.Text;

    level1: Phaser.GameObjects.Text;
    level2: Phaser.GameObjects.Text;
    level3: Phaser.GameObjects.Text;
    level4: Phaser.GameObjects.Text;
    level5: Phaser.GameObjects.Text;
    level6: Phaser.GameObjects.Text;
    test: Phaser.GameObjects.Text;

    level2Lock: Phaser.GameObjects.Image;
    level3Lock: Phaser.GameObjects.Image;
    level4Lock: Phaser.GameObjects.Image;
    level5Lock: Phaser.GameObjects.Image;
    level6Lock: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "LevelScene" });
    }

    create() {
        /* ---------------     BACKGROUND    ------------------- */
        const level_scn_bg = this.add.image(640, 360, "background-2-level1");
        level_scn_bg.setScale(2);
        /* ---------------     LEVEL PLANETS    ------------------- */
        const lvl1 = this.add.image(150, 600, "planet-7")
            .setInteractive()
            .on("pointerover", () => {
            lvl1.setScale(0.12);
            })
            .on("pointerout", () => {
            lvl1.setScale(0.1);
            })
            .on("pointerdown", () => {
            this.updateLevelClicked("Level1Scene");
            });

        const lvl2 = this.add.image(350, 400, "planet-4")
            .setInteractive()
            .on("pointerover", () => {
            if (this.game.registry.get("Level2Opened")) {
                lvl2.setScale(0.12);
            }
            })
            .on("pointerout", () => {
            lvl2.setScale(0.1);
            })
            .on("pointerdown", () => {
            this.updateLevelClicked("Level2Scene");
            });

        const lvl3 = this.add.image(550, 550, "planet-3")
            .setInteractive()
            .on("pointerover", () => {
            if (this.game.registry.get("Level3Opened")) {
                lvl3.setScale(0.12);
            }
            })
            .on("pointerout", () => {
            lvl3.setScale(0.1);
            })
            .on("pointerdown", () => {
            this.updateLevelClicked("Level3Scene");
            });

        const lvl4 = this.add.image(750, 300, "planet-14")
            .setInteractive()
            .on("pointerover", () => {
            if (this.game.registry.get("Level4Opened")) {
                lvl4.setScale(0.12);
            }
            })
            .on("pointerout", () => {
            lvl4.setScale(0.1);
            })
            .on("pointerdown", () => {
            this.updateLevelClicked("Level4Scene");
            });

        const lvl5 = this.add.image(1000, 375, "planet-12")
            .setInteractive()
            .on("pointerover", () => {
            if (this.game.registry.get("Level5Opened")) {
                lvl5.setScale(0.12);
            }
            })
            .on("pointerout", () => {
            lvl5.setScale(0.1);
            })
            .on("pointerdown", () => {
            this.updateLevelClicked("Level5Scene");
            });

        const lvl6 = this.add.image(1150, 100, "planet-13")
            .setInteractive()
            .on("pointerover", () => {
            if (this.game.registry.get("Level6Opened")) {
                lvl6.setScale(0.12);
            }
            })
            .on("pointerout", () => {
            lvl6.setScale(0.1);
            })
            .on("pointerdown", () => {
            this.updateLevelClicked("Level6Scene");
            });
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
            .text(150, 600, "1", { color: "#FFFF80", fontSize: "bold" })
            .setFontSize(24)
            .setOrigin(0.5);
        this.level2 = this.add
            .text(lvl2.x, lvl2.y, "2", { color: "#0000FF", fontSize: "bold" })
            .setFontSize(24)
            .setOrigin(0.5);
        this.level3 = this.add
            .text(lvl3.x, lvl3.y, "3", { color: "#8B8000", fontSize: "bold" })
            .setFontSize(24)
            .setOrigin(0.5);
        this.level4 = this.add
            .text(lvl4.x, lvl4.y, "4", { color: "#301934", fontSize: "bold" })
            .setFontSize(24)
            .setOrigin(0.5);
        this.level5 = this.add
            .text(lvl5.x, lvl5.y, "5", { color: "#90ee90", fontSize: "bold" })
            .setFontSize(24)
            .setOrigin(0.5);
        this.level6 = this.add
            .text(lvl6.x, lvl6.y, "6", { color: "#DC143C", fontSize: "bold" })
            .setFontSize(24)
            .setOrigin(0.5);

        /* ---------------     LEVEL LOCKS    ------------------- */
        this.level2Lock = this.add.image(350, 400, "lock");
        this.level2Lock.setDepth(1);
        this.level2Lock.setScale(2);
        this.level2Lock.setVisible(!this.game.registry.get("Level2Opened"));

        this.level3Lock = this.add.image(550, 550, "lock");
        this.level3Lock.setDepth(1);
        this.level3Lock.setScale(2);
        this.level3Lock.setVisible(!this.game.registry.get("Level3Opened"));

        this.level4Lock = this.add.image(750, 300, "lock");
        this.level4Lock.setDepth(1);
        this.level4Lock.setScale(2);
        this.level4Lock.setVisible(!this.game.registry.get("Level4Opened"));

        this.level5Lock = this.add.image(1000, 375, "lock");
        this.level5Lock.setDepth(1);
        this.level5Lock.setScale(2);
        this.level5Lock.setVisible(!this.game.registry.get("Level5Opened"));

        this.level6Lock = this.add.image(1150, 100, "lock");
        this.level6Lock.setDepth(1);
        this.level6Lock.setScale(2);
        this.level6Lock.setVisible(!this.game.registry.get("Level6Opened"));
        /*
        this.test = this.add
            .text(200, 200, "Test", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked("TestScene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.test);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.test);
            });
        */
        /* ---------------     Test Scene    ------------------- */
        /*
        this.test = this.add
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
            */
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
        //this.scene.start(level);

        if (level === "Level1Scene") {
            this.scene.start(level);
        } else if (
            level === "Level2Scene" &&
            this.game.registry.get("Level2Opened") === true
        ) {
            this.scene.start(level);
        } else if (level === "Level3Scene" && this.game.registry.get("Level3Opened") === true) {
            this.scene.start(level);
        } else if (level === "Level4Scene" && this.game.registry.get("Level4Opened") === true) {
            this.scene.start(level);
        } else if (level === "Level5Scene" && this.game.registry.get("Level5Opened") === true) {
            this.scene.start(level);
        } else if (level === "Level6Scene" && this.game.registry.get("Level6Opened") === true) {
            this.scene.start(level);
        }
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}
