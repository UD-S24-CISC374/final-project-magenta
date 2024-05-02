import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { createButton, handleButtonPosition } from "../../components/pauseButton";
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";

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
    private pauseButton: Phaser.GameObjects.Text;
    private tutorialKeys: Phaser.GameObjects.Image;
    private arrowright: Phaser.GameObjects.Image;
    private arrowleft: Phaser.GameObjects.Image;
    private arrowUp: Phaser.GameObjects.Image;
    private spikes: Phaser.Physics.Arcade.Group;
    private gameOver: boolean = true;
    private d1: Phaser.GameObjects.Text;
    private d2: Phaser.GameObjects.Text;
    private d3: Phaser.GameObjects.Text;
    private d4: Phaser.GameObjects.Text;
    private textSpawned: boolean = false;
    private spaceShip: Phaser.GameObjects.Image;
    private canFlyAway: boolean = false;

    constructor() {
        super({ key: "Level1Scene" });
    }

    create() {
        this.player = new Player(this, 3100, 538);
        this.cameras.main.fadeIn(5000);
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
        /*
        this.add.text(400, 250, "Test Scene", {
            color: "#0f0",
        });
        */
        this.playerPos = this.add.text(400, 300, "Player Position: (0, 0)", {
            color: "#0f0",
        });

        this.platforms = this.physics.add.staticGroup();

        this.tutorialKeys = this.add.image(-350, 350, "keyboard");
        this.tutorialKeys.setCrop(
            this.tutorialKeys.width / 1.62,
            this.tutorialKeys.height / 2,
            this.tutorialKeys.width / 2,
            this.tutorialKeys.height / 2
        );
        this.arrowright = this.add.image(-200, 375, "arrowright");
        this.arrowleft = this.add.image(-350, 375, "arrowright");
        this.arrowUp = this.add.image(-275, 315, "arrowUp");
        this.arrowright.setScale(0.5);
        this.arrowleft.setScale(0.5);
        this.arrowUp.setScale(0.5);
        this.arrowleft.flipX = true;

        const pause = [
            {
                x: 100,
                y: 100,
                color: "#0f0",
                text: "pause",
            },
        ];

        this.pauseButton = createButton(this, pause)[0];

        const npc_1 = this.add.image(1930, 538, "npc_1", 1);
        npc_1.setScale(2);

        this.d1 = this.add
            .text(1730, 480, "Hello! My name is Space Felix.", {
                color: "#FFF",
                //fontSize: 20,
            })
            .setVisible(false);

        this.d2 = this.add
            .text(
                1530,
                480,
                "You're from the Intergalactic Space Station aren't you?",
                {
                    color: "#FFF",
                    //fontSize: 20,
                }
            )
            .setVisible(false);

        this.d3 = this.add
            .text(
                1530,
                480,
                "My ship is over to the right but I was tasked with sending some information back to the station.",
                {
                    color: "#FFF",
                    //fontSize: 20,
                }
            )
            .setVisible(false);

        this.d4 = this.add
            .text(
                1530,
                480,
                "I can't leave until I've completed my task. Can you help me? The terminal is over to the right.",
                {
                    color: "#FFF",
                    //fontSize: 20,
                }
            )
            .setVisible(false);

        const unit = 64;
        const offset = 32;
        const platforms: Platform[] = [
            //plat 1
            // height=1, width=3, frame (2, 1, 3) in sprite sheet
            {
                x: offset + unit * 5,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 6,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 7,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 3,
            },
            //plat 2
            {
                x: offset + unit * 11,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 12,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 13,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 3,
            },
            //plat 3
            {
                x: offset + unit * 17,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 18,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 19,
                y: offset + unit * 6.5,
                texture: "mars-tileset-1",
                frame: 3,
            },
            { x: 640, y: 720, texture: "brown_plat_1", scale: { x: 40, y: 4 } }, // Ground
        ];

        this.spikes = this.physics.add.group();
        const start = platforms[0].x;
        const end = platforms[8].x;
        for (let x = start; x <= end; x += 64) {
            this.spikes.create(x, platforms[0].y + 110, "spikes_hor");
        }
        this.physics.add.collider(this.spikes, this.platforms);
        this.physics.add.collider(
            this.player,
            this.spikes,
            this.handleHitSpike,
            undefined,
            this
        );

        createPlatforms(this, platforms, this.platforms, [this.player]);
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
            "Level1Scene_Terminal1"
        );
        this.CorrectTerminalArr = [
            `git add blue`,
            `git commit -m 'Add New Platform'`,
            `git push`,
        ];
        new TerminalBody(
            this,
            2900,
            538,
            "terminal",
            this.CorrectTerminalArr,
            "1"
        );
        terminal_1_scene.events.on("Terminal1_correct", () => {
            console.log("correct terminal 1");
            this.canFlyAway = true;
        });
        terminal_1_scene.events.on("Terminal1_incorrect", () => {
            console.log("incorrect terminal 1");
        });

        this.spaceShip = this.add.image(3200, 495, "spacecraft");
        this.spaceShip.setDepth(10);
        this.spaceShip.setScale(2);
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

    private handleNPC() {
        let canSpawn = true;
        while (canSpawn) {
            setTimeout(() => {
                this.d1.setVisible(true);
                setTimeout(() => {
                    this.d1.setVisible(false);
                    setTimeout(() => {
                        this.d2.setVisible(true);
                        setTimeout(() => {
                            this.d2.setVisible(false);
                            setTimeout(() => {
                                this.d3.setVisible(true);
                                setTimeout(() => {
                                    this.d3.setVisible(false);
                                    setTimeout(() => {
                                        this.d4.setVisible(true);
                                        setTimeout(() => {
                                            this.d4.setVisible(false);
                                        }, 4000);
                                    }, 0);
                                }, 4000);
                            }, 0);
                        }, 4000);
                    }, 0);
                }, 4000);
            }, 0);
            this.textSpawned = true;
            canSpawn = false;
        }
    }

    private handleCanFlyAway() {
        if (this.canFlyAway) {
            this.player.setVisible(false);
            this.cameras.main.startFollow(this.spaceShip, true, 0.08, 0.08, 0, 100);
            this.spaceShip.y -= 1;
            this.cameras.main.fadeOut(4000);
            if (this.spaceShip.y < 300) {
                this.scene.start("Level2Scene");
            }
        } else {
            this.add.text(3200, 400, "You need to complete the task first!");
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

    private handleButtonPos() {
        const pauseOffsetX =
            this.cameras.main.width - 0.9 * this.cameras.main.width;
        const pauseOffsetY = 50;

        handleButtonPosition(
            this.scene.scene,
            this.pauseButton,
            pauseOffsetX,
            pauseOffsetY
        );
    }

    private handleHitSpike() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
        this.gameOver = true;
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
        this.handleButtonPos();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.player) {
            if (this.player.x > 1600 && !this.textSpawned) {
                this.handleNPC();
            }
        }
        if (this.player.x > this.spaceShip.x - 20) {
            this.handleCanFlyAway();
        }
    }
}
