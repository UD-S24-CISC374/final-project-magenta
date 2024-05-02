import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { updateCurrentLevel } from "../currentLevel";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { Button, createButton } from "../../components/pauseButton";
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";

export default class Level2Scene extends LevelClass {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private playerPos?: Phaser.GameObjects.Text;
    private background1: Phaser.GameObjects.TileSprite;
    private posX = 0;
    private posY = 0;
    private levelWidth: number = 2560; // Width of the level
    private levelHeight: number = 1440; // Height of the level
    private showGrid = false;
    private showColl = false;
    private pauseButton: Button;
    private ship: Phaser.GameObjects.Image;
    private shipStopped = false;
    private activeSpikes: Phaser.Physics.Arcade.Group;
    private gameOver = false;
    private staticSpikes: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "Level2Scene" });
    }
    create() {
        //create ship and make it viasable (created as an image)
        this.ship = this.add.image(0, 0, "spacecraft");
        this.ship.setDepth(10);

        //basic set up for player object, camera and controls, camera starts centered on ship
        this.player = new Player(this, 100, 400);
        this.player.setVisible(false);
        this.cameras.main.startFollow(this.ship, true, 0.08, 0.08, 0, 100);
        this.cursors = this.input.keyboard?.createCursorKeys();

        //background
        this.background1 = this.add.tileSprite(
            0,
            0,
            this.levelWidth * 2,
            this.levelHeight * 2,
            "ice-planet-bg"
        );
        this.background1.setOrigin(0);
        this.background1.setScrollFactor(0, 0);

        //player pos and text display for testing
        this.playerPos = this.add.text(400, 300, "Player Position: (0, 0)", {
            color: "#0f0",
        });
        const pause = [
            {
                x: 100,
                y: 100,
                color: "#0f0",
                text: "pause",
            },
        ];

        //initallize platforms and pause button
        this.platforms = this.physics.add.staticGroup();
        this.pauseButton = createButton(this, pause)[0];

        //create platforms
        const unit = 64;
        const offset = 32;
        const platforms: Platform[] = [
            //plat 1
            // height=1, width=3, frame (2, 1, 3) in sprite sheet
            {
                x: offset + unit * 3,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 4,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 5,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //plat 2
            {
                x: offset + unit * 9,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 10,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 11,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //plat 3
            {
                x: offset + unit * 15,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 16,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 17,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //plat 4
            {
                x: offset + unit * 21,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 22,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 23,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 24,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 25,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 26,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 27,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 28,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 29,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //tunnel wall 1
            {
                x: offset + unit * 29,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 29,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 29,
                y: offset + unit * 8,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //tunnel wall 2
            {
                x: offset + unit * 33,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 4,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 2,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //tunnel wall 3
            {
                x: offset + unit * 38,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 38,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 38,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 38,
                y: offset + unit * 4,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 38,
                y: offset + unit * 3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 38,
                y: offset + unit * 2,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 38,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //wall ledge 1
            {
                x: offset + unit * 34,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //wall ledge 2
            {
                x: offset + unit * 37,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //wall ledge 3
            {
                x: offset + unit * 34,
                y: offset + unit * 3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //plat 5
            {
                x: offset + unit * 39,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 40,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 41,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 42,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 43,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 44,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 45,
                y: offset + unit * 1,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //ceiling above plat 5
            {
                x: offset + unit * 39,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 40,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //terminal goes here (pos: 2590, 32)
            {
                x: offset + unit * 41,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 42,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 43,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 44,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 45,
                y: offset + unit * -3,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //timmy trap (with dorr)
            {
                x: offset + unit * 39,
                y: offset + unit * -4,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 39,
                y: offset + unit * -5,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 39,
                y: offset + unit * -6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 40,
                y: offset + unit * -6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            {
                x: offset + unit * 41,
                y: offset + unit * -6,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
            //door
            {
                x: offset + unit * 41,
                y: offset + unit * -5,
                texture: "door",
                frame: 0,
            },
            {
                x: offset + unit * 41,
                y: offset + unit * -4,
                texture: "door",
                frame: 1,
            },
            { x: 640, y: 720, texture: "ice-ground-1", scale: { x: 80, y: 4 } }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);

        //creating the ice spikes
        this.staticSpikes = this.physics.add.staticGroup();

        let spike1 = this.staticSpikes.create(1930, 440, "1x2-ice-spikes");
        spike1.setScale(1, 1);
        let spike2 = this.staticSpikes.create(2098, 440, "1x2-ice-spikes");
        spike2.setScale(-1, 1);
        let spike3 = this.staticSpikes.create(2780, 48, "1x2-ice-spikes");
        spike3.setScale(-1, 1);
        spike3.setAngle(90);
        let spike4 = this.staticSpikes.create(2780, -112, "1x2-ice-spikes");
        spike4.setScale(1, 1);
        spike4.setAngle(90);

        this.physics.add.collider(this.player, this.staticSpikes);

        //if youd like to display a grid or collidable object outlines, switch
        //showGrid and showColl bools to true at top of file
        if (this.showGrid) {
            this.drawGrid(64);
        }
        if (this.showColl) {
            this.physics.world.createDebugGraphic();
        }

        /* ---------------     Create Terminal    ------------------- 
            Must be done after platform and player creation
        */
        // let correctButtonOrder = [
        //     `git add blue`,
        //     `git commit -m 'Add New Platform'`,
        //     `git push`,
        // ];
        let terminal_1_scene = this.scene.manager.getScene(
            "Level2Scene_Terminal1"
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
            "2"
        );
        terminal_1_scene.events.on("Terminal1_correct", () => {
            console.log("correct terminal 1");
        });
        terminal_1_scene.events.on("Terminal1_incorrect", () => {
            console.log("incorrect terminal 1");
        });
    }

    preload() {
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    //what to run after terminal 1 has passed
    passTerminal1() {}

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

        if (this.ship.y <= 550) {
            this.ship.y += 0.35;
        } else {
            this.player.setVisible(true);
            this.shipStopped = true;
            this.cameras.main.startFollow(
                this.player,
                true,
                0.08,
                0.08,
                0,
                100
            );
        }
        if (this.gameOver) {
            this.gameOver = false;
            updateCurrentLevel(this.scene.key);
            this.scene.start("RespawnScene");
            this.scene.stop();
        }
    }
}