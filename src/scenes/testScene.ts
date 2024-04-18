import Phaser from "phaser";
import LevelClass from "../Classes/LevelClass";
import { Player } from "../objects/player";
import { Platform, createPlatforms } from "../components/platform";

export default class TestScene extends LevelClass {
    private player: Player;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private playerPos?: Phaser.GameObjects.Text;
    private background1?: Phaser.Physics.Arcade.StaticGroup;
    private background2?: Phaser.Physics.Arcade.StaticGroup;
    private posX = 0;
    private posY = 0;
    private levelWidth: number = 2560; // Width of the level
    private levelHeight: number = 1440; // Height of the level
    private showGrid = false;
    private showColl = false;

    constructor() {
        super({ key: "TestScene" });
    }

    create() {
        this.player = new Player(this, 100, 0);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cursors = this.input.keyboard?.createCursorKeys();

        //will eventually make this a loop
        this.background1 = this.physics.add.staticGroup();
        const sizeOfBackgroundY = 416;
        const sizeOfBackgroundX = 640;
        this.background1.create(
            sizeOfBackgroundX * 0,
            sizeOfBackgroundY,
            "background-1-level1"
        );
        this.background1.create(
            sizeOfBackgroundX * 1,
            sizeOfBackgroundY,
            "background-1-level1"
        );
        this.background1.create(
            sizeOfBackgroundX * 2,
            sizeOfBackgroundY,
            "background-1-level1"
        );
        this.background1.create(
            sizeOfBackgroundX * 3,
            sizeOfBackgroundY,
            "background-1-level1"
        );
        this.background1.create(
            sizeOfBackgroundX * 4,
            sizeOfBackgroundY,
            "background-1-level1"
        );
        //second bg
        this.background2 = this.physics.add.staticGroup();
        this.background2.create(
            sizeOfBackgroundX * 0,
            sizeOfBackgroundY * 0,
            "background-2-level1"
        );
        this.background2.create(
            sizeOfBackgroundX * 1,
            sizeOfBackgroundY * 0,
            "background-2-level1"
        );
        this.background2.create(
            sizeOfBackgroundX * 2,
            sizeOfBackgroundY * 0,
            "background-2-level1"
        );
        this.background2.create(
            sizeOfBackgroundX * 3,
            sizeOfBackgroundY * 0,
            "background-2-level1"
        );
        this.background2.create(
            sizeOfBackgroundX * 4,
            sizeOfBackgroundY * 0,
            "background-2-level1"
        );

        this.add.text(400, 250, "Test Scene", {
            color: "#0f0",
        });
        this.playerPos = this.add.text(400, 300, "Player Position: (0, 0)", {
            color: "#0f0",
        });

        this.platforms = this.physics.add.staticGroup();

        const unit = 64;
        const offset = 32;
        const platforms: Platform[] = [
            //plat 1
            // height=1, width=3, frame (2, 1, 3) in sprite sheet
            {
                x: offset + unit * 3,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 4,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 5,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 3,
            },
            //plat 2
            {
                x: offset + unit * 9,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 10,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 11,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 3,
            },
            //plat 3
            {
                x: offset + unit * 15,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 16,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 17,
                y: offset + unit * 8,
                texture: "mars-tileset-1",
                frame: 3,
            },
            { x: 640, y: 720, texture: "brown_plat_1", scale: { x: 40, y: 2 } }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);
        if (this.showGrid) {
            this.drawGrid(64);
        }
        if (this.showColl) {
            this.physics.world.createDebugGraphic();
        }
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

    update() {
        this.player.update(this.cursors);
        this.handlePrintPos();
    }
}
