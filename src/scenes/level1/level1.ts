import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import {
    createButton,
    handleButtonPosition,
} from "../../components/pauseButton";
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";
import { updateCurrentLevel } from "../currentLevel";
import { displayNPCText } from "../../components/NPCText";
import Level1Scene_Terminal1 from "./Level1Scene_Terminal1";

export default class Level1Scene extends LevelClass {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private hasNPCinteraction = false;
    private playerPos?: Phaser.GameObjects.Text;
    private background1: Phaser.GameObjects.TileSprite;
    private background2?: Phaser.Physics.Arcade.StaticGroup;
    private posX = 0;
    private posY = 0;
    private npcX = 1930;
    private npcY = 538;
    private levelWidth: number = 2560; // Width of the level
    private levelHeight: number = 1440; // Height of the level
    private showGrid = false;
    private showColl = false;
    private gameOver = false;
    private terminalBody?: TerminalBody;
    private pauseButton: Phaser.GameObjects.Text;
    private tutorialKeys: Phaser.GameObjects.Image;
    private arrowright: Phaser.GameObjects.Image;
    private arrowRightText: Phaser.GameObjects.Text;
    private arrowleft: Phaser.GameObjects.Image;
    private arrowLeftText: Phaser.GameObjects.Text;
    private arrowUp: Phaser.GameObjects.Image;
    private arrowUpText: Phaser.GameObjects.Text;
    private spikes: Phaser.Physics.Arcade.StaticGroup;
    private d1: Phaser.GameObjects.Text;
    private d2: Phaser.GameObjects.Text;
    private d3: Phaser.GameObjects.Text;
    private d4: Phaser.GameObjects.Text;
    private textSpawned: boolean = false;
    private spaceShip: Phaser.GameObjects.Image;
    private canFlyAway: boolean = false;
    private dish: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "Level1Scene" });
    }

    create() {
        this.restartFunction = () => {
            this.platforms?.clear(true, true);
            this.spikes.clear(true, true);
            this.terminalBody?.destroy();
            this.terminalBody = undefined;
            //this.events.destroy();
            let term1 = this.scene.get(
                "Level1Scene_Terminal1"
            ) as Level1Scene_Terminal1;
            term1.turnOffEmitters();
            this.handleButtonPos();
        };
        this.player = new Player(this, 0, 538);
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
        /*
        this.playerPos = this.add.text(400, 300, "Player Position: (0, 0)", {
            color: "#0f0",
        });
        */

        this.platforms = this.physics.add.staticGroup();

        this.tutorialKeys = this.add.image(-350, 250, "keyboard");
        this.tutorialKeys.setCrop(
            this.tutorialKeys.width / 1.62,
            this.tutorialKeys.height / 2,
            this.tutorialKeys.width / 2,
            this.tutorialKeys.height / 2
        );
        this.arrowright = this.add.image(-200, 275, "arrowright");
        this.arrowleft = this.add.image(-350, 275, "arrowright");
        this.arrowUp = this.add.image(-275, 215, "arrowUp");
        this.arrowright.setScale(0.5);
        this.arrowleft.setScale(0.5);
        this.arrowUp.setScale(0.5);
        this.arrowleft.flipX = true;
        this.arrowLeftText = this.add.text(-415, 225, "Move Left", {
            fontStyle: "bold",
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000",
                blur: 2,
                stroke: true,
                fill: true,
            },
        });
        this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                if (this.arrowLeftText.style.color === "#FFF") {
                    this.arrowLeftText.setStyle({ color: "#CCC" });
                } else {
                    this.arrowLeftText.setStyle({ color: "#FFF" });
                }

                if (this.arrowRightText.style.color === "#FFF") {
                    this.arrowRightText.setStyle({ color: "#CCC" });
                } else {
                    this.arrowRightText.setStyle({ color: "#FFF" });
                }

                if (this.arrowUpText.style.color === "#FFF") {
                    this.arrowUpText.setStyle({ color: "#CCC" });
                } else {
                    this.arrowUpText.setStyle({ color: "#FFF" });
                }
            },
        });
        this.arrowRightText = this.add.text(-230, 225, "Move Right", {
            fontStyle: "bold",
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000",
                blur: 2,
                stroke: true,
                fill: true,
            },
        });
        this.arrowUpText = this.add.text(-310, 155, "Jump Up", {
            fontStyle: "bold",
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000",
                blur: 2,
                stroke: true,
                fill: true,
            },
        });

        const pause = [
            {
                x: 300,
                y: 300,
                color: "#FFA500",
                text: "Pause",
            },
        ];

        this.pauseButton = createButton(this, pause)[0];

        const npc_1 = this.add.image(this.npcX, this.npcY, "npc_1", 1);
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
                y: offset + unit * 4.5,
                texture: "mars-tileset-1",
                frame: 2,
            },
            {
                x: offset + unit * 12,
                y: offset + unit * 4.5,
                texture: "mars-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 13,
                y: offset + unit * 4.5,
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

        this.spikes = this.physics.add.staticGroup();
        for (let i = 2; i <= 5; i += 3) {
            this.spikes.create(
                platforms[i].x + 125,
                platforms[0].y + 110,
                "spikes_hor"
            );
            this.spikes.scaleX(0.2);
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
            `git add encryptedMessage.txt`,
            `git commit -m 'Sending Message to SpaceStation'`,
            `git push`,
        ];

        this.terminalBody = new TerminalBody(
            this,
            2650,
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

        this.dish = this.add.image(2600, 530, "dish");
        this.dish.setScale(0.5);

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
        if (!this.hasNPCinteraction) {
            displayNPCText(
                this,
                this.npcX,
                this.npcY,
                [
                    "Hello! My name is Space Felix.",
                    "You're from the Intergalactic Space Station aren't you?",
                    "My ship is over to the right but I was tasked with sending a critical rebel message back to the station.",
                    "Can you help me? Make sure you stage the encrypted messgage and not the original. The terminal is over to the right.",
                ],
                "#FFF"
            );
        }
        this.hasNPCinteraction = true;
    }

    private handleCanFlyAway() {
        if (this.canFlyAway) {
            this.game.registry.set("Level2Opened", true);
            this.player.setVisible(false);
            this.cameras.main.fadeOut(4000);
            this.cameras.main.startFollow(
                this.spaceShip,
                true,
                0.08,
                0.08,
                0,
                100
            );
            this.spaceShip.y -= 1;
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
        /*
        this.playerPos?.setText(
            `Player Position: (${Math.floor(this.posX)}, ${Math.floor(
                this.posY
            )})`
        );
        */
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

        if (this.gameOver) {
            this.gameOver = false;
            updateCurrentLevel(this.scene.key);
            this.cleanup();
            this.scene.launch("RespawnScene");
            this.scene.bringToTop("RespawnScene");
            this.scene.pause("Level1Scene");
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.player) {
            if (this.player.x > 1600 && !this.hasNPCinteraction) {
                this.player.updatePlayerFreeze();
                this.player.anims.play("turn", true);
                this.handleNPC();
            }
        }
        if (this.player.x > this.spaceShip.x - 20) {
            this.handleCanFlyAway();
        }
    }
    private cleanup() {
        this.player.setX(0);
        this.player.setY(538);
        this.physics.resume();
        this.player.clearTint();
    }
}
