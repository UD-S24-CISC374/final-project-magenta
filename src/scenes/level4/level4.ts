import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { updateCurrentLevel } from "../currentLevel";
import { Player } from "../../objects/player";
import { Platform, createPlatforms } from "../../components/platform";
import { Button } from "../../components/pauseButton"; //{ Button, createButton } ->was giving error
import { TerminalBody } from "../../components/terminalAndTerminalSceneHelpers";
import { displayNPCText } from "../../components/NPCText";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Level4Scene_Terminal2 from "./Level4Scene_Terminal2";

export default class Level4Scene extends LevelClass {
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

    constructor() {
        super({ key: "Level4Scene" });
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
                "Level4Scene_Terminal1"
            ) as Level4Scene_Terminal2;
            term1.terminalInputArr = [];
        };
        //create ship and make it viasable (created as an image)
        this.ship = this.add.image(0, 0, "spacecraft");
        this.ship.setDepth(10);
        this.ship.setScale(2);
        this.spaceShip = this.add.image(7900, -64, "spacecraft");
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
            "white-planet-bg"
        );
        this.background1.setOrigin(0);
        this.background1.setScrollFactor(0, 0);
        this.background1.setDepth(-1);

        this.bunker = this.add.image(500, 540, "white-planet-bunker");
        this.bunker.setDepth(1);

        this.npc_1 = this.add.image(350, 565, "npc_1", 1);
        this.npc_1.setScale(2);

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
                x: offset + unit * 15,
                y: offset + unit * 7,
                texture: "white-planet-3x1",
            },
            {
                x: offset + unit * 22,
                y: offset + unit * 6,
                texture: "white-planet-3x1",
            },
            {
                x: offset + unit * 28,
                y: offset + unit * 5,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 33,
                y: offset + unit * 3,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 40,
                y: offset + unit * 4,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 47,
                y: offset + unit * 4,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 54,
                y: offset + unit * 4,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 61,
                y: offset + unit * 4,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 66,
                y: offset + unit * 2,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 71,
                y: offset + unit * 0,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 77,
                y: offset + unit * 0,
                texture: "white-planet-3x1",
            },
            {
                x: offset + unit * 80,
                y: offset + unit * 0,
                texture: "white-planet-3x1",
            },
            {
                x: offset + unit * 83,
                y: offset + unit * 0,
                texture: "white-planet-3x1",
            },
            {
                x: offset + unit * 86,
                y: offset + unit * 0,
                texture: "white-planet-3x1",
            },
            {
                x: offset + unit * 95,
                y: offset + unit * 0,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 104,
                y: offset + unit * 0,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 114,
                y: offset + unit * 0,
                texture: "white-planet-1x1",
            },
            {
                x: offset + unit * 122,
                y: offset + unit * 0,
                texture: "white-planet-3x1",
            },
            {
                x: 640,
                y: 720,
                texture: "white-planet-3x1",
                scale: { x: 80, y: 4 },
            }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);

        //trapped npc4
        this.iceBlock = this.add.image(5500, -96, "white-planet-ice-block");
        this.npc_2 = this.add.image(5500, -96, "npc_2", 1);
        this.npc_2.setScale(2);

        // Create the static groups
        this.staticSpikes = this.physics.add.staticGroup();
        this.activeSpikes = this.physics.add.staticGroup();
        this.fallingSpikes = this.physics.add.group();

        // Create and scale spikes
        let spike1 = this.staticSpikes.create(1200, 580, "2x1-ice-spikes");
        spike1.setScale(3, 1);
        spike1.refreshBody();
        let spike2 = this.staticSpikes.create(1600, 580, "2x1-ice-spikes");
        spike2.setScale(3, 1);
        spike2.refreshBody();
        let spike3 = this.staticSpikes.create(2000, 580, "2x1-ice-spikes");
        spike3.setScale(3, 1);
        spike3.refreshBody();
        let spike4 = this.staticSpikes.create(2400, 580, "2x1-ice-spikes");
        spike4.setScale(3, 1);
        spike4.refreshBody();
        let spike5 = this.staticSpikes.create(2800, 580, "2x1-ice-spikes");
        spike5.setScale(3, 1);
        spike5.refreshBody();
        let spike6 = this.staticSpikes.create(3200, 580, "2x1-ice-spikes");
        spike6.setScale(3, 1);
        spike6.refreshBody();
        let spike7 = this.staticSpikes.create(3600, 580, "2x1-ice-spikes");
        spike7.setScale(3, 1);
        spike7.refreshBody();
        let spike8 = this.staticSpikes.create(4000, 580, "2x1-ice-spikes");
        spike8.setScale(3, 1);
        spike8.refreshBody();
        let spike9 = this.staticSpikes.create(4400, 580, "2x1-ice-spikes");
        spike9.setScale(3, 1);
        spike9.refreshBody();
        let spike10 = this.staticSpikes.create(4800, 580, "2x1-ice-spikes");
        spike10.setScale(3, 1);
        spike10.refreshBody();
        let spike11 = this.staticSpikes.create(5200, 580, "2x1-ice-spikes");
        spike11.setScale(3, 1);
        spike11.refreshBody();
        let spike12 = this.staticSpikes.create(5600, 580, "2x1-ice-spikes");
        spike12.setScale(3, 1);
        spike12.refreshBody();
        let spike13 = this.staticSpikes.create(6000, 580, "2x1-ice-spikes");
        spike13.setScale(3, 1);
        spike13.refreshBody();
        let spike14 = this.staticSpikes.create(6400, 580, "2x1-ice-spikes");
        spike14.setScale(3, 1);
        spike14.refreshBody();
        let spike15 = this.staticSpikes.create(6800, 580, "2x1-ice-spikes");
        spike15.setScale(3, 1);
        spike15.refreshBody();
        let spike16 = this.staticSpikes.create(7200, 580, "2x1-ice-spikes");
        spike16.setScale(3, 1);
        spike16.refreshBody();
        let spike17 = this.staticSpikes.create(7600, 580, "2x1-ice-spikes");
        spike17.setScale(3, 1);
        spike17.refreshBody();
        let spike18 = this.staticSpikes.create(8000, 580, "2x1-ice-spikes");
        spike18.setScale(3, 1);
        spike18.refreshBody();
        let spike19 = this.staticSpikes.create(8400, 580, "2x1-ice-spikes");
        spike19.setScale(3, 1);
        spike19.refreshBody();
        let spike20 = this.staticSpikes.create(8800, 580, "2x1-ice-spikes");
        spike20.setScale(3, 1);
        spike20.refreshBody();

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

        //Terminal 1
        let terminal_2_scene = this.scene.manager.getScene(
            "Level4Scene_Terminal2"
        );
        this.CorrectTerminalArr2 = [
            `cd heater`,
            `git pull`,
            `git add heater-date-set.js`,
            `git commit -m ''`,
            "git push",
        ];
        new TerminalBody(
            this,
            5300,
            -32,
            "terminal",
            this.CorrectTerminalArr2,
            "2"
        );
        terminal_2_scene.events.on("Terminal2_correct", () => {
            console.log("correct terminal 2");
            this.passTerminal1();
        });
        terminal_2_scene.events.on("Terminal2_incorrect", () => {
            console.log("incorrect terminal 2");
        });
    }

    private passTerminal1() {
        this.iceBlock.setVisible(false);
        this.npc_2.y = -32;
        this.firstTerminalPassed = true;
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
                this.scene.start("Level4Scene");
            }
        } else {
            this.add.text(3200, 400, "You need to complete the task first!");
        }
    }

    private handleNPC() {
        if (!this.hasNPCinteraction) {
            displayNPCText(this, 350, 550 - 50, [
                "Hello again...",
                "I sent a soldier to aid your friends on a geological survey, it seems that they have not returned.",
                "I fear that they got trapped climbing that mountain over there.",
                "I know your capable. Would you aid me in searching for them?",
            ]);
        }
        this.hasNPCinteraction = true;
    }

    private handleNPC2() {
        if (!this.hasNPCinteraction2) {
            displayNPCText(this, 5500, -32 - 50, [
                "Thank you sooo much! I nearly died in there!",
                "If it wasnt for you those damn environmentalists would have gotten away with it...",
                "I was sent to protect them and what do they do? They abandon me!",
                "I know tensions are already high between the factions, but I never thought they would abandon a humble gaurd like me!",
                "Anyways, thanks for helping me out, here is my climbing gear. It should help with your speed going down the mountain.",
                "Who knows, you may need it. Good luck getting back to your ship! I wish I could come, I am so tired of the cold...",
            ]);
        }
        this.hasNPCinteraction2 = true;
    }

    update() {
        console.log(this.player.x, this.player.y);
        this.player.update(this.cursors);
        this.handlePrintPos();

        if (this.gameOver) {
            this.gameOver = false;
            updateCurrentLevel(this.scene.key);
            this.cleanup();
            this.scene.launch("RespawnScene");
            this.scene.bringToTop("RespawnScene");
            this.scene.pause("Level4Scene");
        }
        if (this.player.x > 7900) {
            this.handleCanFlyAway();
        }

        if (this.shipStopped) {
            if (!this.hasNPCinteraction) {
                this.player.updatePlayerFreeze();
                this.player.anims.play("turn", true);
                this.handleNPC();
            }
        }

        if (this.firstTerminalPassed) {
            if (!this.hasNPCinteraction2) {
                this.player.updatePlayerFreeze();
                this.player.anims.play("turn", true);
                this.handleNPC2();
            }
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
