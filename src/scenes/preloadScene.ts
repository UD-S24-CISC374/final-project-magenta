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
        this.load.image("planet-7", "assets/Art/planet-7.png");
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
        this.load.image("level_1_mars", "assets/Art/mars2.png");
        this.load.image("keyboard", "assets/Art/Keyboard.png");
        this.load.image("arrowright", "assets/Art/arrowright.png");
        this.load.image("arrowUp", "assets/Art/arrowUp.png");
        this.load.image("dish", "assets/Art/dish.png");
        this.load.image("lock", "assets/Art/locked.png");
        this.load.image("respawn", "assets/Art/space_bg.png");
        this.load.image("level3_bg", "assets/Art/Sunrise.png");
        this.load.image("level3stone", "assets/Art/egypt_stone.png");
        this.load.image("Level3Ground", "assets/Art/DirtLvl3.png");
        this.load.image("trap", "assets/Art/trapLvl3.png");
        this.load.image("bomb", "assets/Art/bomb.png");
        this.load.image("Lvl3Spike", "assets/Art/spikeLvl3.png");
        this.load.image("lvl6_bg", "assets/Art/DesertForest.png");
        this.load.image("Lvl6_ground", "assets/Art/purpleplanet.png");
        this.load.image(
            "background-1-level1",
            "assets/Art/background-1-level1.png"
        );
        this.load.image(
            "background-2-level1",
            "assets/Art/background-2-level1.png"
        );
        this.load.image("ice-planet-bg", "assets/Art/ice-planet-bg.png");
        this.load.image("ice-ground-1", "assets/Art/ice-ground-1.png");
        this.load.image("1x2-ice-spikes", "assets/Art/1x2-ice-spikes.png");
        this.load.image("2x1-ice-spikes", "assets/Art/2x1-ice-spikes.png");
        this.load.image("white-planet-1x1", "assets/Art/white-planet-1x1.png");
        this.load.image("white-planet-3x1", "assets/Art/white-planet-3x1.png");
        this.load.image("white-planet-bg", "assets/Art/white-planet-bg.png");
        this.load.image(
            "white-planet-ice-block",
            "assets/Art/white-planet-ice-block.png"
        );
        this.load.image(
            "white-planet-bunker",
            "assets/Art/white-planet-bunker.png"
        );
        this.load.image("level5-bg", "assets/Art/level5-bg.png");
        this.load.image("level5-1x1", "assets/Art/level5-1x1.png");
        this.load.image("level5-2x1", "assets/Art/level5-2x1.png");
        this.load.image("level6-2x1", "assets/Art/level6-2x1.png");
        this.load.image("level5-3x1", "assets/Art/level5-3x1.png");
        this.load.image("snowflake", "assets/Art/snowflake.png");
        this.load.image("tree", "assets/Art/tree.png");
        this.load.image("rock", "assets/Art/rock.png");
        this.load.image("vines", "assets/Art/vines.png");
        this.load.image("cacti", "assets/Art/cacti.png");

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
        this.load.spritesheet(
            "ice-planet-tileset-1",
            "assets/Art/ice-planet-tileset-1.png",
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
        this.load.spritesheet("explosion", "assets/Art/explosion.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("door", "assets/Art/door.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.image("check", "assets/Art/Check.png");
        this.load.image("arrow", "assets/Art/arrow.png");

        //Sounds
        this.load.audio("bg_music_1", "assets/Sound/gitcat_chill_demo2.mp3");
        this.load.audio("wrong", "assets/Sound/lose sound 1_0.wav");
        this.load.audio("trapClick", "assets/Sound/trapClick.mp3");
        this.load.audio("correct", "assets/Sound/coin.flac");

    }

    create() {
        this.scene.start("MainScene");
    }
}
