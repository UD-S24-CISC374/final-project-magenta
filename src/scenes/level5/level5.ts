import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { updateCurrentLevel } from "../currentLevel";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { Button } from "../../components/pauseButton"; //{ Button, createButton } ->was giving error
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";
import { displayNPCText } from "../../components/NPCText";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Level5Scene_Terminal2 from "./Level5Scene_Terminal2";

export default class Level5Scene extends LevelClass {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private playerPos?: Phaser.GameObjects.Text;
    private background1: Phaser.GameObjects.TileSprite;
    private checkPointX: number = 100;
    private checkPointY: number = 500;
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
    private iceBlock: Phaser.GameObjects.Image;
    private bunker: Phaser.GameObjects.Image;
    private canFlyAway = true;
    private hasNPCinteraction = false;
    private firstTerminalPassed = false;
    private hasNPCinteraction2 = false;
    private shipCanLeave = false;

    private timerText: Phaser.GameObjects.Text;
    private timeLeft: number;
    private timerEvent: Phaser.Time.TimerEvent;
    private timerExpired: boolean;
    private startTimer: boolean;

    constructor() {
        super({ key: "Level5Scene" });
        this.timeLeft = 60; // Set the timer for 60 seconds
        this.timerExpired = false;
        this.startTimer = false;
    }
    create() {
        this.restartFunction = () => {
            this.checkPointX = 100;
            this.checkPointY = 500;
            this.shipStopped = false;
            this.player.destroy();
            console.log("restart function");
            this.platforms?.clear(true, true);
            //this.spikes?.clear(true, true);
            this.terminalBody?.destroy();
            this.terminalBody = undefined;
            //this.events.destroy();

            let term1 = this.scene.get(
                "Level5Scene_Terminal2"
            ) as Level5Scene_Terminal2;
            term1.terminalInputArr = [];
        };
        //create ship and make it viasable (created as an image)
        this.ship = this.add.image(0, 0, "spacecraft");
        this.ship.setDepth(10);
        this.ship.setScale(2);
        this.spaceShip = this.add.image(6690, -230, "spacecraft");
        this.spaceShip.setDepth(10);
        this.spaceShip.setScale(2);

        //basic set up for player object, camera and controls, camera starts centered on ship
        this.player = new Player(this, 100, 500);
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
            "level5-bg"
        );
        this.background1.setOrigin(0);
        this.background1.setScrollFactor(0, 0);
        this.background1.setDepth(-1);

        //initallize platforms and pause button
        this.platforms = this.physics.add.staticGroup();
        //this.pauseButton = createButton(this, pause)[0];

        //create platforms
        const unit = 64;
        const offset = 32;
        const platforms: Platform[] = [
            {
                x: offset + unit * 15,
                y: offset + unit * 7,
                texture: "level5-3x1",
            },
            {
                x: offset + unit * 21,
                y: offset + unit * 6,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 28,
                y: offset + unit * 6,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 35,
                y: offset + unit * 6,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 42,
                y: offset + unit * 4,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 50,
                y: offset + unit * 4,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 58,
                y: offset + unit * 4,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 59,
                y: offset + unit * 4,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 59,
                y: offset + unit * 3,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 60,
                y: offset + unit * 3,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 60,
                y: offset + unit * 2,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 62,
                y: offset + unit * 2,
                texture: "level5-3x1",
            },
            {
                x: offset + unit * 65,
                y: offset + unit * 2,
                texture: "level5-3x1",
            },
            {
                x: offset + unit * 68,
                y: offset + unit * 2,
                texture: "level5-3x1",
            },
            {
                x: offset + unit * 71,
                y: offset + unit * 2,
                texture: "level5-3x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * 2,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * 1,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * 0,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * -1,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * -2,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * -3,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 73,
                y: offset + unit * -4,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 71,
                y: offset + unit * 0,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 69,
                y: offset + unit * -2,
                texture: "level5-1x1",
            },
            {
                x: offset + unit * 80,
                y: offset + unit * 5,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 78,
                y: offset + unit * 5,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 76,
                y: offset + unit * 5,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 74,
                y: offset + unit * 5,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 85,
                y: offset + unit * 3,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 90,
                y: offset + unit * 1,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 96,
                y: offset + unit * -1,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 100,
                y: offset + unit * -3,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 102,
                y: offset + unit * -3,
                texture: "level5-2x1",
            },
            {
                x: offset + unit * 104,
                y: offset + unit * -3,
                texture: "level5-2x1",
            },
            {
                x: 640,
                y: 720,
                texture: "brown_plat_1",
                scale: { x: 80, y: 4 },
            }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);

        // Create the static groups
        this.staticSpikes = this.physics.add.staticGroup();
        this.activeSpikes = this.physics.add.staticGroup();
        this.fallingSpikes = this.physics.add.group();

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

        this.npc_1 = this.add.image(350, 550, "npc_1", 1);
        this.npc_1.setScale(2);

        //Terminal 1
        let terminal_2_scene = this.scene.manager.getScene(
            "Level5Scene_Terminal2"
        );
        this.CorrectTerminalArr2 = [
            `git checkout main`,
            `git fetch`,
            `git merge cat-powers`,
        ];
        new TerminalBody(
            this,
            500,
            500,
            "terminal",
            this.CorrectTerminalArr2,
            "2"
        );
        terminal_2_scene.events.on("Terminal2_correct", () => {
            console.log("correct terminal 2");
            this.add.image(this.player.x, this.player.y - 100, "check");
            this.sound.add("correct").play();
            this.passTerminal1();
        });
        terminal_2_scene.events.on("Terminal2_incorrect", () => {
            console.log("incorrect terminal 2");
        });

        this.timerText = this.add.text(0, 0, `Time left: ${this.timeLeft}`, {
            font: "32px Arial",
        });

        //decorations
        this.add.image(200, 420, "tree").setScale(2);
        this.add.image(-200, 420, "tree").setScale(2);
        this.add.image(700, 420, "tree").setScale(2);
        this.add.image(2000, 420, "tree").setScale(2);
        this.add.image(3000, 420, "tree").setScale(2);
        this.add.image(4000, 420, "tree").setScale(2);
        this.add.image(5400, 420, "tree").setScale(2);
        this.add.image(1000, 480, "vines");
        this.add.image(920, 480, "vines");
        this.add.image(1350, 416, "vines");
        this.add.image(1850, 416, "vines");
        this.add.image(2725, 288, "vines");
        this.add.image(3800, 288, "vines");
        this.add.image(4100, 160, "vines");
        this.add.image(4200, 160, "vines");
        this.add.image(4450, 160, "vines");
        this.add.image(4700, 160, "vines");
        this.add.image(4900, 352, "vines");
    }

    private passTerminal1() {
        this.startTimerEvent();
        this.firstTerminalPassed = true;
    }

    preload() {
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    private handleNPC() {
        if (!this.hasNPCinteraction) {
            displayNPCText(
                this,
                400,
                550,
                [
                    "Hello. I fear a rouge cat agent has found the location of an ancient relic of unmatched power...",
                    "Due to my old age, I am unable to pursue him myself and thus I must call on you.",
                    "Here I have set up a terminal that will give you the power needed to navigate the terrain.",
                    "This entire planet is rigged, you will only have a given amount of time to make it.",
                ],
                "#FFF"
            );
        }
        this.hasNPCinteraction = true;
    }

    private handleNPC2() {
        if (!this.hasNPCinteraction2) {
            displayNPCText(
                this,
                6500,
                -300 - 50,
                [
                    "It seems like he has already escaped...",
                    "I must find him...",
                ],
                "#FFF"
            );
        }
        this.hasNPCinteraction2 = true;
    }

    private handleHitSpike() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
        this.gameOver = true;
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
        if (this.canFlyAway && this.shipCanLeave) {
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
                this.scene.start("Level6Scene");
            }
        } else {
            this.add.text(3200, 400, "You need to complete the task first!");
        }
    }

    updateTimer() {
        // Decrement the time left
        this.timeLeft--;

        // Update the timer text
        this.timerText.setText(`Time left: ${this.timeLeft}`);

        // Check if the timer has expired
        if (this.timeLeft <= 0) {
            this.timerEvent.remove(false);
            this.timerExpired = true;
            this.timerText.setText("Time left: 0"); // Ensure it displays 0
            // Perform any additional actions when the timer expires
            this.gameOver = true;
            this.onTimerExpired();
        }
    }

    onTimerExpired() {
        // Handle what happens when the timer expires
        console.log("Timer has expired!");
        this.gameOver = true;
    }

    startTimerEvent() {
        // Create a timed event that calls the updateTimer method every second
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    update() {
        console.log(this.player.x, this.player.y);
        this.player.update(this.cursors);
        this.handlePrintPos();

        this.timerText.setPosition(this.player.x - 500, this.player.y - 400);
        if (this.player.y > 800) {
            this.gameOver = true;
        }

        if (this.firstTerminalPassed) {
            if (this.cursors?.left.isDown) {
                this.player.setVelocityX(-250);
                //this.anims.play("left", true);
            } else if (this.cursors?.right.isDown) {
                this.player.setVelocityX(250);
                //this.anims.play("right", true);
            }
        }

        if (this.gameOver) {
            this.gameOver = false;
            this.timeLeft = 60;
            updateCurrentLevel(this.scene.key);
            this.cleanup();
            this.scene.launch("RespawnScene");
            this.scene.bringToTop("RespawnScene");
            this.scene.pause("Level5Scene");
            this.startTimerEvent();
        }

        if (this.player.x > 6690) {
            this.handleCanFlyAway();
        }
        //turn on into cutscene

        if (this.shipStopped) {
            if (!this.hasNPCinteraction) {
                this.player.updatePlayerFreeze();
                this.player.anims.play("turn", true);
                this.handleNPC();
            }
        }

        /*
        if (this.firstTerminalPassed) {
            if (!this.hasNPCinteraction2) {
                this.player.updatePlayerFreeze();
                this.player.anims.play("turn", true);
                this.handleNPC2();
            }
        }
        */
        if (this.player.x >= 6500) {
            //this.hasNPCinteraction2 = false;
            //this.player.updatePlayerFreeze();
            //this.player.anims.play("turn", true);
            this.handleNPC2();
            setTimeout(() => {
                this.shipCanLeave = true;
            }, 5000);
        }
        if (this.hasNPCinteraction2) {
            if (this.cursors?.left.isDown) {
                this.player.setVelocityX(-250);
                //this.anims.play("left", true);
            } else if (this.cursors?.right.isDown) {
                this.player.setVelocityX(250);
                //this.anims.play("right", true);
            }
        }
        if (this.ship.y <= 550) {
            this.ship.y += 1;
        } else {
            if (!this.shipStopped) {
                this.player.updatePlayerFreeze();
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
        }
    }
    private cleanup() {
        this.player.setX(this.checkPointX);
        this.player.setY(this.checkPointY);
        this.physics.resume();
        this.player.clearTint();
    }
}
