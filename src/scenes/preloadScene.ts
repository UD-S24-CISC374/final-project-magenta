import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Images
        this.load.image("plat_1", "assets/Art/mars_plat_1.png");
        this.load.image("spikes", "assets/Art/spikes.png");
        this.load.image("star", "assets/Art/star.png");
        this.load.image("planet-1", "assets/Art/planet-1.png");
        this.load.image("planet-4", "assets/Art/planet-4.png");
        this.load.image("planet-3", "assets/Art/planet-3.png");
        this.load.image("planet-12", "assets/Art/planet-12.png");
        this.load.image("planet-13", "assets/Art/planet-13.png");
        this.load.image("planet-14", "assets/Art/planet-14.png");
        this.load.image("terminal", "assets/Art/CommTerminal.png");
        this.load.image("blue_plat_1", "assets/Art/blue_plat_1.png");
        this.load.image("brown_plat_1", "assets/Art/brown_plat_1.png");
        this.load.image("red_plat_1", "assets/Art/red_plat_1.png");
        this.load.image("spikes_hor", "assets/Art/spikes_hor.png");
        this.load.image("spikes_vert", "assets/Art/spikes_vert.png");
        this.load.image("level_1_bg", "assets/Art/level_1_bg.png");
        this.load.image(
            "background-1-level1",
            "assets/Art/background-1-level1.png"
        );
        this.load.image(
            "background-2-level1",
            "assets/Art/background-2-level1.png"
        );

        //Sprite sheets
        this.load.spritesheet("button", "assets/Art/buttons.png", {
            frameWidth: 256,
            frameHeight: 64,
        });
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("npc_1", "assets/Art/npc_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("npc_2", "assets/Art/npc_2.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("npc_3", "assets/Art/npc_3.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet(
            "mars-tileset-1",
            "assets/Art/mars-tileset-1.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet("spacecraft", "assets/Art/Spacecraft.png", {
            frameWidth: 84,
            frameHeight: 84,
        });
        this.load.spritesheet("cat_black", "assets/Art/cat_black.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("cat_brown", "assets/Art/cat_brown.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("cat_orange", "assets/Art/cat_orange.png", {
            frameWidth: 32,
            frameHeight: 48,
        });

        //Sounds
        this.load.audio("bg_music_1", "assets/Sound/gitcat_chill_demo2.mp3");
    }

    create() {
        this.scene.start("MainScene");
    }
}
