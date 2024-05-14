import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { updateCurrentLevel } from "../currentLevel";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { Button } from "../../components/pauseButton"; //{ Button, createButton } ->was giving error
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";
import Level2Scene_Terminal1 from "./Level2Scene_Terminal1";
import Level2Scene_Terminal2 from "./Level2Scene_Terminal2";

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
    private npc_2: Phaser.GameObjects.Image;
    private canFlyAway = true;

    constructor() {
        super({ key: "Level2Scene" });
    }
    create() {
        //create ship and make it viasable (created as an image)
        this.ship = this.add.image(0, 0, "spacecraft");
        this.ship.setDepth(10);
        this.ship.setScale(2);
        this.spaceShip = this.add.image(5100, 540, "spacecraft");
        this.spaceShip.setDepth(10);
        this.spaceShip.setScale(2);

        //basic set up for player object, camera and controls, camera starts centered on ship
        this.player = new Player(this, 100, 400);
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
            "ice-planet-bg"
        );
        this.background1.setOrigin(0);
        this.background1.setScrollFactor(0, 0);
        this.background1.setDepth(-1);

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
                y: offset + unit * 8,
                texture: "ice-planet-tileset-1",
                frame: 3,
            },
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
            //final obsticle
            {
                x: offset + unit * 56,
                y: offset + unit * 8,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 56,
                y: offset + unit * 7,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 56,
                y: offset + unit * 6,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 56,
                y: offset + unit * 5,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 56,
                y: offset + unit * 4,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 56,
                y: offset + unit * 3,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 56,
                y: offset + unit * 2,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 57,
                y: offset + unit * 2,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 58,
                y: offset + unit * 2,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            {
                x: offset + unit * 59,
                y: offset + unit * 2,
                texture: "ice-planet-tileset-1",
                frame: 1,
            },
            { x: 640, y: 720, texture: "ice-ground-1", scale: { x: 80, y: 4 } }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);

        //creating the ice spikes
        this.staticSpikes = this.physics.add.staticGroup();
        this.activeSpikes = this.physics.add.staticGroup();
        this.fallingSpikes = this.physics.add.group();

        let spike1 = this.staticSpikes.create(1930, 440, "1x2-ice-spikes");
        spike1.setScale(1, 1);
        let spike2 = this.staticSpikes.create(2098, 440, "1x2-ice-spikes");
        spike2.setScale(-1, 1);
        let spike3 = this.staticSpikes.create(2780, 48, "2x1-ice-spikes");
        spike3.setScale(1, 1);
        //spike3.setAngle(90);
        //2780
        let spike4 = this.activeSpikes.create(2780, -112, "2x1-ice-spikes");
        spike4.setScale(1, -1);
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
        this.npc_1 = this.add.image(2900, 580, "npc_1", 1);
        this.npc_1.setScale(2);
        this.npc_2 = this.add.image(2590, -224, "npc_2", 1);
        this.npc_2.setScale(2);
        const npc_3 = this.add.image(4600, 580, "npc_3", 1);
        npc_3.setScale(2);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.d1 = this.add.text(
            2300,
            -300,
            "Please help me! The unlock code for this door\n should be somewhere on that terminal!",
            {
                color: "#0f0",
            }
        );
        this.d2 = this.add.text(
            2300,
            -300,
            "Thanks! Let me give you a hand with this...",
            {
                color: "#0f0",
            }
        );
        this.d2.setVisible(false);
        this.d3 = this.add.text(
            2800,
            460,
            "Hey, looks like you will need a little more power to get to your ship!\nThis terminal doesnt seem to have a mouse, maybe you should type what\nthe buttons would enter into the terminal.",
            {
                color: "#0f0",
            }
        );
        this.add.text(
            4200,
            480,
            "Great job here on ice-223, the USC thanks you greatly. \nThe mission isnt over yet, I am sending you to a remote,\n dangerous planet next.",
            {
                color: "#0f0",
            }
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
            "Level2Scene_Terminal1"
        );
        this.CorrectTerminalArr = [
            `git add code.js`,
            `git commit -m 'created code for lock'`,
            `git push`,
        ];
        new TerminalBody(
            this,
            2520,
            0,
            "terminal",
            this.CorrectTerminalArr,
            "1"
        );
        terminal_1_scene.events.on("Terminal1_correct", () => {
            console.log("correct terminal 1");
            this.passTerminal1();
        });
        terminal_1_scene.events.on("Terminal1_incorrect", () => {
            console.log("incorrect terminal 1");
        });

        //Terminal 2
        let terminal_2_scene = this.scene.manager.getScene(
            "Level2Scene_Terminal2"
        );
        this.CorrectTerminalArr2 = [
            `git add power.js`,
            `git commit -m ''`,
            `git push`,
        ];
        new TerminalBody(
            this,
            3000,
            500,
            "terminal",
            this.CorrectTerminalArr2,
            "2"
        );
        terminal_2_scene.events.on("Terminal2_correct", () => {
            console.log("correct terminal 2");
            this.passTerminal2();
        });
        terminal_2_scene.events.on("Terminal2_incorrect", () => {
            console.log("incorrect terminal 2");
        });
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

    //what to run after terminal 1 has passed
    passTerminal1() {
        this.d1.setVisible(false);
        //this.d2.setVisible(false);

        setTimeout(() => {
            this.d2.setVisible(true);
            this.isNpcMoving = true;
        }, 1500);
        setTimeout(() => {
            this.activeSpikes.setVisible(false);
            this.activeSpikes.clear();

            let spike5 = this.fallingSpikes.create(
                2780,
                -100,
                "2x1-ice-spikes"
            );
            spike5.setScale(1, -1);
            spike5.body.setOffset(0, 30);
        }, 2200);
    }

    passTerminal2() {
        this.playerHasPower = true;
        this.d3.setVisible(false);
        this.add.text(
            2800,
            460,
            "Great job! I bet your legs feel a lot stronger! Only a few cats are able to\nacsess the powers hidden in the Git...",
            {
                color: "#0f0",
            }
        );
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
                //currently goes to main as lvl 3 is not in yet
                this.scene.start("Level3Scene");
            }
        } else {
            this.add.text(3200, 400, "You need to complete the task first!");
        }
    }

    update() {
        this.player.update(this.cursors);
        this.handlePrintPos();

        if (this.ship.y <= 550) {
            this.ship.y += 1;
        } else {
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
            this.scene.stop("Level2Scene");
        }
        if (this.playerHasPower) {
            if (this.cursors?.up.isDown && this.player.body?.touching.down) {
                this.player.setVelocityY(-600);
            }
        }
        if (this.isNpcMoving) {
            if (this.npc_2.x <= 2780) {
                this.npc_2.x += 0.75;
            }
        }
        if (this.player.x > 5000) {
            this.handleCanFlyAway();
        }
    }
    private cleanup() {
        this.player.destroy();
        this.platforms?.clear(true, true);
        //this.spikes?.clear(true, true);
        this.terminalBody?.destroy();
        this.terminalBody = undefined;
        //this.events.destroy();
        let term1 = this.scene.get(
            "Level2Scene_Terminal1"
        ) as Level2Scene_Terminal1;
        term1.turnOffEmitters();
        let term2 = this.scene.get(
            "Level2Scene_Terminal2"
        ) as Level2Scene_Terminal2;
        term2.terminalInputArr = [];
    }
}
