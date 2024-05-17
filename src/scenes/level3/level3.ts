import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { updateCurrentLevel } from "../currentLevel";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { Button } from "../../components/pauseButton"; //{ Button, createButton } ->was giving error
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";
import { displayNPCText } from "../../components/NPCText";
import Level3Scene_Terminal1 from "./Level3Scene_Terminal1";

export default class Level3Scene extends LevelClass {
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
    private spaceShip: Phaser.GameObjects.Image;
    private shipStopped = false;
    private activeSpikes: Phaser.Physics.Arcade.StaticGroup;
    private gameOver = false;
    private staticSpikes: Phaser.Physics.Arcade.StaticGroup;
    private fallingSpikes: Phaser.Physics.Arcade.Group;
    private terminalBody?: TerminalBody;
    private playerHasPower = false;
    private showPos = false;
    private d1: Phaser.GameObjects.Text;
    private d2: Phaser.GameObjects.Text;
    private d3: Phaser.GameObjects.Text;
    private isNpcMoving = false;
    private npc_1: Phaser.GameObjects.Image;
    private npc_3: Phaser.GameObjects.Image;
    private canFlyAway = false;
    private hasNPCinteraction = false;
    private hasLastNPCinteraction = false;
    private npcX = -290;
    private npcY = 650;
    private dish1: Phaser.GameObjects.Image;
    private traps: Phaser.Physics.Arcade.StaticGroup;
    private bomb: Phaser.GameObjects.Image;
    private explosion: Phaser.GameObjects.Sprite;
    private terminal1Complete: boolean = false;

    constructor() {
        super({ key: "Level3Scene" });
    }
    create() {
        this.restartFunction = () => {
            this.player.destroy();
            this.platforms?.clear(true, true);
            //this.spikes?.clear(true, true);
            this.terminalBody?.destroy();
            this.terminalBody = undefined;
            //this.events.destroy();
            let term1 = this.scene.get(
                "Level3Scene_Terminal1"
            ) as Level3Scene_Terminal1;
            term1.turnOffEmitters();
        };
        this.game.registry.set("Level3Opened", true);
        //create ship and make it viasable (created as an image)
        this.ship = this.add.image(0, 0, "spacecraft");
        this.ship.setDepth(10);
        this.ship.setScale(2);
        this.spaceShip = this.add.image(5100, 540, "spacecraft");
        this.spaceShip.setDepth(10);
        this.spaceShip.setScale(2);

        //basic set up for player object, camera and controls, camera starts centered on ship
        this.player = new Player(this, 100, 550);
        this.player.updatePlayerFreeze();
        this.player.setVisible(false);
        this.player.setActive(false);
        this.cameras.main.fadeIn(5000);
        this.cameras.main.startFollow(this.ship, true, 0.08, 0.08, 0, 100);
        this.cursors = this.input.keyboard?.createCursorKeys();

        //background
        this.background1 = this.add.tileSprite(
            0,
            0,
            this.levelWidth * 2,
            this.levelHeight * 2,
            "level3_bg"
        );
        this.background1.setOrigin(0);
        this.background1.setScrollFactor(0, 0);
        this.background1.setDepth(-1);

        this.dish1 = this.add.image(-300, 630, "dish");
        this.dish1.setScale(0.5);
        this.dish1.setCrop(0, 0, this.dish1.width / 2, this.dish1.height);
        this.dish1.setRotation(Math.PI / 2);

        //pause button giving an error for some reason, will fix later
        /*
        const pause = [
            {
                x: 100,
                y: 100,
                color: "#0f0",
                text: "Pause",
            },
        ];
        */

        //initallize platforms and pause button
        this.platforms = this.physics.add.staticGroup();
        //this.pauseButton = createButton(this, pause)[0];

        //create platforms
        const unit = 64;
        const offset = 32;
        const platforms: Platform[] = [
            // Platform 1
            {
                x: offset + unit * 13,
                y: offset + unit * 8,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 14,
                y: offset + unit * 8,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 15,
                y: offset + unit * 8,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            // Platform 2
            {
                x: offset + unit * 18,
                y: offset + unit * 6,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 19,
                y: offset + unit * 6,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 20,
                y: offset + unit * 6,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 21,
                y: offset + unit * 6,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 22,
                y: offset + unit * 6,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            // Platform 3 vertical
            {
                x: offset + unit * 22,
                y: offset + unit * 7,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 22,
                y: offset + unit * 8,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 22,
                y: offset + unit * 9,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            //Platform 4
            {
                x: offset + unit * 26,
                y: offset + unit * 7,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 27,
                y: offset + unit * 7,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 28,
                y: offset + unit * 7,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 29,
                y: offset + unit * 7,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            //Platform 5
            {
                x: offset + unit * 29,
                y: offset + unit * 4.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 30,
                y: offset + unit * 4.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 31,
                y: offset + unit * 4.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 32,
                y: offset + unit * 4.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 4.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            // Platform 6
            {
                x: offset + unit * 25,
                y: offset + unit * 3,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 24,
                y: offset + unit * 3,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 23,
                y: offset + unit * 3,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 22,
                y: offset + unit * 3,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            //Platform 7
            {
                x: offset + unit * 16,
                y: offset + unit * 2,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 15,
                y: offset + unit * 2,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 14,
                y: offset + unit * 2,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            //Platform 8
            {
                x: offset + unit * 33,
                y: offset + unit * 3.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 2.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 1.5,
                texture: "level3stone",
                scale: { x: 0.25, y: 0.25 },
            },

            {
                x: 640,
                y: 720,
                texture: "Level3Ground",
                scale: { x: 40, y: 0.09 },
            }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);

        this.traps = this.physics.add.staticGroup();
        let trap1 = this.traps.create(430, 625, "trap");
        trap1.setScale(0.05);
        trap1.body.width = 32;
        trap1.body.height = 12;
        trap1.setOffset(140, 50);
        let trap2 = this.traps.create(850, 505, "trap");
        trap2.setScale(0.05);
        trap2.body.width = 32;
        trap2.body.height = 12;
        trap2.setOffset(140, 50);
        let trap3 = this.traps.create(2010, 280, "trap");
        trap3.setScale(0.05);
        trap3.body.width = 32;
        trap3.body.height = 12;
        trap3.setOffset(140, 50);

        this.physics.add.collider(
            this.player,
            this.traps,
            this.handleTrapCollision,
            undefined,
            this
        );

        //creating the ice spikes
        this.staticSpikes = this.physics.add.staticGroup();
        this.activeSpikes = this.physics.add.staticGroup();
        this.fallingSpikes = this.physics.add.group();

        let spike1 = this.staticSpikes.create(1890, 416, "Lvl3Spike");
        spike1.setScale(0.3);
        spike1.setRotation(Math.PI / -2);
        spike1.body.width = 68;
        spike1.body.height = 68;
        spike1.setOffset(60, 60);
        let spike2 = this.staticSpikes.create(1375, 225, "Lvl3Spike");
        spike2.setScale(0.3);
        spike2.setRotation(Math.PI / -2);
        spike2.body.width = 66;
        spike2.body.height = 66;
        spike2.setOffset(60, 65);
        let spike3 = this.activeSpikes.create(1510, 600, "Lvl3Spike");
        spike3.setScale(0.3);
        spike3.body.width = 68;
        spike3.body.height = 68;
        spike3.setOffset(60, 60);
        let spike4 = this.activeSpikes.create(1570, 600, "Lvl3Spike");
        spike4.setScale(0.3);
        spike4.body.width = 68;
        spike4.body.height = 68;
        spike4.setOffset(60, 60);
        let spike5 = this.activeSpikes.create(1630, 600, "Lvl3Spike");
        spike5.setScale(0.3);
        spike5.body.width = 68;
        spike5.body.height = 68;
        spike5.setOffset(60, 60);
        //spike4.setAngle(90);

        this.physics.add.collider(
            this.player,
            this.staticSpikes,
            this.handleHitSpike,
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.activeSpikes,
            this.handleHitSpike,
            undefined,
            this
        );
        this.physics.add.collider(this.player, this.fallingSpikes);
        this.physics.add.collider(this.fallingSpikes, this.staticSpikes);

        //if youd like to display a grid or collidable object outlines, switch
        //showGrid and showColl bools to true at top of file
        if (this.showGrid) {
            this.drawGrid(64);
        }
        if (this.showColl) {
            this.physics.world.createDebugGraphic();
        }
        if (this.showPos) {
            this.playerPos = this.add.text(
                400,
                300,
                "Player Position: (0, 0)",
                {
                    color: "#0f0",
                }
            );
        }

        //npc and their text
        this.npc_1 = this.add.image(-370, 598, "npc_1", 1);
        this.npc_1.setScale(2);
        this.npc_3 = this.add.image(-250, 598, "npc_3", 1);
        this.npc_3.setScale(2);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.d1 = this.add.text(
            400,
            -50,
            "Great Job! Head back to the cats to tell them you found the terminal!",
            {
                color: "#fff",
                fontSize: "24px",
                fontStyle: "bold",
                stroke: "#008000",
                strokeThickness: 4,
            }
        );
        this.d1.setVisible(false);

        /* ---------------     Create Terminal    ------------------- 
            Must be done after platform and player creation
        */
        // let correctButtonOrder = [
        //     `git add blue`,
        //     `git commit -m 'Add New Platform'`,
        //     `git push`,
        // ];
        let terminal_1_scene = this.scene.manager.getScene(
            "Level3Scene_Terminal1"
        );
        this.CorrectTerminalArr = [
            `git reset --hard HEAD~1`,
            `git push origin dangerPlanet --force`,
        ];
        new TerminalBody(
            this,
            930,
            96,
            "terminal",
            this.CorrectTerminalArr,
            "1"
        );
        terminal_1_scene.events.on("Terminal1_correct", () => {
            console.log("correct terminal 1");
            this.add.image(this.player.x, this.player.y - 100, "check");
            this.sound.add("correct").play();
            this.d1.setVisible(true);
            this.terminal1Complete = true;
        });
        terminal_1_scene.events.on("Terminal1_incorrect", () => {
            console.log("incorrect terminal 1");
        });

        //decorations
        this.add.image(350, 535, "cacti").setScale(1.5);
        this.add.image(-475, 535, "cacti").setScale(1.5);
        this.add.image(1080, 535, "cacti").setScale(1.5);
        this.add.image(2050, 535, "cacti").setScale(1.5);
    }

    preload() {
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    private handleHitSpike() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
        this.gameOver = true;
    }

    private handleTrapCollision() {
        this.player.setVisible(false);
        this.explosion = this.add.sprite(
            this.player.x,
            this.player.y,
            "explosion",
            0
        );
        this.explosion.setScale(2.5);
        this.explosion.setDepth(10);
        this.explosion.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 23,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.explosion.anims.play("explode", true);
        this.player.x = 100;
        setTimeout(() => {
            this.gameOver = true;
        }, 800);
    }

    //what to run after terminal 1 has passed
    passTerminal1() {
        if (!this.hasLastNPCinteraction) {
            displayNPCText(
                this,
                this.npcX + 10,
                this.npcY - 50,
                [
                    "Great job! Thanks for finding the terminal and doing that for us.",
                    "Now we've got to fix this satellite...",
                    "The government is not going to be happy about this. These are their satellites.",
                    "We never would have come here had we known they were here. We think they're behind these traps.",
                    "Some sort of testing...",
                    "Maybe you can investigate for us? I think the captain is on a white planet.",
                ],
                "0x00ff00"
            );
            setTimeout(() => {
                this.canFlyAway = true;
            }, 30000);
            this.hasLastNPCinteraction = true;
        }
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

    private handleNPC() {
        if (!this.hasNPCinteraction) {
            displayNPCText(
                this,
                this.npcX + 10,
                this.npcY - 50,
                [
                    "Ugh. This satellite is completely destroyed. It got blown up by one of the traps.",
                    "We're trying to run a geological survey of the planet but we can't find the terminal.",
                    "Can you help us? It's somewhere on the planet. I think our last commit got corrupted.",
                    "We need to commit our old changes and push them to the Space Station's repository for review.",
                    "Come back once you've found it...and be careful! There's traps everywhere.",
                ],
                "0x00ff00"
            );
        }
        this.hasNPCinteraction = true;
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    private handleCanFlyAway() {
        if (this.canFlyAway) {
            this.player.setVisible(false);
            this.cameras.main.startFollow(
                this.spaceShip,
                true,
                0.08,
                0.08,
                0,
                100
            );
            this.spaceShip.y -= 1;
            this.cameras.main.fadeOut(4000);
            if (this.spaceShip.y < -300) {
                this.scene.start("Level4Scene");
            }
        } else {
            this.add.text(400, 300, "You need to complete the task first!");
        }
    }

    update() {
        this.player.update(this.cursors);
        this.handlePrintPos();

        if (this.ship.y <= 550) {
            this.ship.y += 1.2;
        } else if (!this.shipStopped) {
            this.player.setVisible(true);
            this.player.setActive(true);
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
            this.cleanup();
            this.scene.launch("RespawnScene");
            this.scene.bringToTop("RespawnScene");
            this.scene.pause("Level3Scene");
        }
        if (this.playerHasPower) {
            if (this.cursors?.up.isDown && this.player.body?.touching.down) {
                this.player.setVelocityY(-600);
            }
        }
        if (this.isNpcMoving) {
            if (this.npc_3.x <= 2780) {
                this.npc_3.x += 0.35;
            }
        }
        if (this.terminal1Complete && this.canFlyAway) {
            this.handleCanFlyAway();
        }
        if (
            this.player.x < 0 &&
            this.terminal1Complete &&
            !this.hasLastNPCinteraction
        ) {
            this.player.updatePlayerFreeze();
            this.player.anims.play("turn", true);
            this.passTerminal1();
        }
        if (this.shipStopped) {
            if (!this.hasNPCinteraction) {
                this.player.anims.play("turn", true);
                this.handleNPC();
            }
        }
        if (this.player.x < -500) {
            this.player.x = -500;
        }
    }
    private cleanup() {
        this.player.x = 100;
        this.player.y = 550;
        this.player.setVisible(true);
    }
}
