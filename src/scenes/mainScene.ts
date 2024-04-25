import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    /* ---------------     START BUTTON    ------------------- */
    startButton: Phaser.GameObjects.Text;
    /* ---------------     OPTION BUTTON    ------------------- */
    optionsButton: Phaser.GameObjects.Text;
    /* ---------------     PLAY BUTTON    ------------------- */
    playButton: Phaser.GameObjects.Text;

    private music: Phaser.Sound.BaseSound;

    private ship: Phaser.Physics.Arcade.Sprite;

    private catStart: Phaser.Physics.Arcade.Sprite;
    private catOptions: Phaser.Physics.Arcade.Sprite;
    private catPlay: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super({ key: "MainScene" });
    }
    create() {
        /* ---------------     BACKGROUND    ------------------- */
        const main_scn_bg = this.add.image(640, 360, "background-2-level1");
        main_scn_bg.setScale(2);
        /* ---------------     MOVING SHIP    ------------------- */
        this.ship = this.physics.add.sprite(100, 800, "spacecraft");
        this.moveShip();
        /* ---------------     MOVING CATS    ------------------- */
        this.catStart = this.physics.add
            .sprite(375, 295, "cat_orange", 3)
            .setGravity(0, -300);
        this.catStart.anims.create({
            key: "walk",
            frameRate: 11,
            frames: this.anims.generateFrameNumbers("cat_orange", {
                start: 3,
                end: 5,
            }),
            repeat: -1,
        });
        this.catOptions = this.physics.add
            .sprite(375, 395, "cat_black", 3)
            .setGravity(0, -300);
        this.catOptions.anims.create({
            key: "walk",
            frameRate: 11,
            frames: this.anims.generateFrameNumbers("cat_black", {
                start: 3,
                end: 5,
            }),
            repeat: -1,
        });
        this.catPlay = this.physics.add
            .sprite(375, 495, "cat_brown", 3)
            .setGravity(0, -300);
        this.catPlay.anims.create({
            key: "walk",
            frameRate: 11,
            frames: this.anims.generateFrameNumbers("cat_brown", {
                start: 3,
                end: 5,
            }),
            repeat: -1,
        });

        //play background music (music will stop when audio file ends or when promted to end)
        //this.music = this.sound.add("bg_music_1", { loop: true, volume: 0.1 });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.music) {
            this.music = this.sound.add("bg_music_1", {
                loop: true,
                volume: 0.1,
            });
            this.music.play();
        }
        //this.music.play();

        //text for alpha sub
        this.add.text(
            400,
            200,
            "please select 'play from level' -> 'level 1'",
            {
                color: "#0f0",
            }
        );
        this.add.text(400, 225, "start is currently not implemented", {
            color: "#0f0",
        });
        /* ---------------     START BUTTON    ------------------- */
        this.startButton = this.add
            .text(400, 300, "Start", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateStartClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.startButton);
                this.enterCatHoverState(this.catStart);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.startButton);
                this.exitCatHoverState(this.catStart);
            });

        /* ---------------     OPTIONS BUTTON    ------------------- */
        this.optionsButton = this.add
            .text(400, 400, "Options", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateOptionsClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.optionsButton);
                this.enterCatHoverState(this.catOptions);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.optionsButton);
                this.exitCatHoverState(this.catOptions);
            });

        /* ---------------     PLAY BUTTON    ------------------- */
        this.playButton = this.add
            .text(400, 500, "Play From Level", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updatePlayClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.playButton);
                this.enterCatHoverState(this.catPlay);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.playButton);
                this.exitCatHoverState(this.catPlay);
            });
    }

    moveShip() {
        this.ship.setGravityY(-300);
        this.ship.setVelocityY(-100);
        this.ship.setVelocityX(Phaser.Math.Between(-50, 50));
    }

    enterCatHoverState(value: Phaser.Physics.Arcade.Sprite) {
        value.anims.play("walk", true);
    }

    exitCatHoverState(value: Phaser.Physics.Arcade.Sprite) {
        value.anims.stop();
    }
    /* ---------------     START BUTTON    ------------------- */
    updateStartClicked() {
        this.scene.start("StartScene");
    }

    enterButtonHoverState(value: Phaser.GameObjects.Text) {
        value.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(value: Phaser.GameObjects.Text) {
        value.setStyle({ fill: "#0f0" });
    }

    /* ---------------     OPTIONS BUTTON    ------------------- */
    updateOptionsClicked() {
        this.scene.start("OptionsScene");
    }

    /* ---------------     PLAY BUTTON    ------------------- */
    updatePlayClicked() {
        this.scene.start("LevelScene");
    }

    update() {
        if (
            this.ship.y < -100 ||
            this.ship.y > 900 ||
            this.ship.x < -100 ||
            this.ship.x > 1400
        ) {
            const randomXNumber = Phaser.Math.Between(100, 1400);
            this.ship.setPosition(randomXNumber, 900);
            this.moveShip();
        }
    }
}
