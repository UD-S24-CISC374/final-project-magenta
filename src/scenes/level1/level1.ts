import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { Button, createButton } from "../../components/pauseButton";
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";
import { updateCurrentLevel } from "../currentLevel";

export default class Level1Scene extends LevelClass {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private playerPos?: Phaser.GameObjects.Text;
    private background1: Phaser.GameObjects.TileSprite;
    private background2?: Phaser.Physics.Arcade.StaticGroup;
    private posX = 0;
    private posY = 0;
    private levelWidth: number = 2560; // Width of the level
    private levelHeight: number = 1440; // Height of the level
    private showGrid = false;
    private showColl = false;
    private pauseButton: Button;
    private spikes?: Phaser.Physics.Arcade.Group;
    private gameOver = false;

    constructor() {
        super({ key: "Level1Scene" });
    }

    create() {
        this.player = new Player(this, 100, 0);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.background1 = this.add.tileSprite(
            0,
            0,
            this.levelWidth * 2,
            this.levelHeight * 2,
            "level_1_mars"
        );
        this.background1.setOrigin(0);
        this.background1.setScrollFactor(0, 0);

        this.add.text(400, 250, "Test Scene", {
            color: "#0f0",
        });
        this.playerPos = this.add.text(400, 300, "Player Position: (0, 0)", {
            color: "#0f0",
        });

        this.platforms = this.physics.add.staticGroup();

        const pause = [
            {
                x: 100,
                y: 100,
                color: "#0f0",
                text: "pause",
            },
        ];

        this.pauseButton = createButton(this, pause)[0];

        const unit = 64;
        const offset = 32;
        const platforms: Platform[] = [
            //plat 1
            // height=1, width=3, frame (2, 1, 3) in sprite sheet
            {
                x: offset + unit * 3,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 4,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 5,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 3,
            },
            //plat 2
            {
                x: offset + unit * 9,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 10,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 11,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 3,
            },
            //plat 3
            {
                x: offset + unit * 15,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 16,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 17,
                y: offset + unit * 7,
                texture: "mars-tileset-1",
                frame: 3,
            },
            { x: 640, y: 720, texture: "brown_plat_1", scale: { x: 40, y: 4 } }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);
        if (this.showGrid) {
            this.drawGrid(64);
        }
        if (this.showColl) {
            this.physics.world.createDebugGraphic();
        }

        this.spikes = this.physics.add.group();
        this.physics.add.collider(this.spikes, this.platforms);
        this.physics.add.collider(
            this.player,
            this.spikes,
            this.handleHitSpike,
            undefined,
            this
        );

        /* ---------------     Create Terminal    ------------------- 
            Must be done after platform and player creation
        */
        // let correctButtonOrder = [
        //     `git add blue`,
        //     `git commit -m 'Add New Platform'`,
        //     `git push`,
        // ];
        let terminal_1_scene = this.scene.manager.getScene(
            "Level1Scene_Terminal1"
        );
        this.CorrectTerminalArr = [
            `git add blue`,
            `git commit -m 'Add New Platform'`,
            `git push`,
        ];
        new TerminalBody(
            this,
            300,
            300,
            "terminal",
            this.CorrectTerminalArr,
            "1"
        );
        terminal_1_scene.events.on("Terminal1_correct", () => {
            console.log("correct terminal 1");
        });
        terminal_1_scene.events.on("Terminal1_incorrect", () => {
            let spike = this.spikes?.create(250, 300, "spikes_hor");
            spike.flipY = true;
        });
    }
    preload() {
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }
    drawGrid(gridSize: number): void {
        const graphics = this.add.graphics({
            lineStyle: { width: 1, color: 0x00ff00 },
        });
        // Draw vertical lines
        for (let x = 0; x < this.levelWidth; x += gridSize) {
            graphics.lineBetween(x, 0, x, this.levelHeight);
        }
        // Draw horizontal lines
        for (let y = 0; y < this.levelHeight; y += gridSize) {
            graphics.lineBetween(0, y, this.levelWidth, y);
        }
    }
    private handleHitSpike() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
        this.gameOver = true;
    }

    private handlePrintPos() {
        this.posX = this.player.x;
        this.posY = this.player.y;

        //offset for where text appears relative to the player pos
        const offsetX = -600;
        const offsetY = -300;

        //create/update text (float -> int for readability)
        this.playerPos?.setText(
            `Player Position: (${Math.floor(this.posX)}, ${Math.floor(
                this.posY
            )})`
        );
        this.playerPos?.setPosition(this.posX + offsetX, this.posY + offsetY);
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {
        this.player.update(this.cursors);
        this.handlePrintPos();

        if (this.gameOver) {
            this.gameOver = false;
            updateCurrentLevel(this.scene.key);
            this.scene.start("RespawnScene");
            this.scene.stop();
        }
    }
}
