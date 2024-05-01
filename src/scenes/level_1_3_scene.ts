/* eslint-disable @typescript-eslint/no-unused-vars */
import Phaser from "phaser";
import { updateCurrentLevel } from "./currentLevel";
import LevelClass from "../Classes/LevelClass";
import { Player } from "../objects/player";

export default class Level_1_3_scene extends LevelClass {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private scoreText?: Phaser.GameObjects.Text;
    private gameOver = false;
    private textSpawned = false;

    private d1: Phaser.GameObjects.Text;
    private d2: Phaser.GameObjects.Text;
    private d3: Phaser.GameObjects.Text;
    private d4: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "Level_1_3_scene" });
    }

    create() {
        const level_1_bg = this.add.image(640, 360, "level_1_bg");
        level_1_bg.setScale(1);

        //This is createing a solid object
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            640,
            720,
            "brown_plat_1"
        ) as Phaser.Physics.Arcade.Sprite;
        //setting the size of the groud (1, 2, 3)
        ground.setScale(40, 2).refreshBody();

        this.player = new Player(this, 100, 500);
        // this.player = this.physics.add.sprite(70, 600, "dude");
        // this.player.setBounce(0.05);
        // this.player.setCollideWorldBounds(true);
        // this.player.body?.setSize(32, 32);
        // this.player.setScale(2);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 3,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "cat", frame: 1 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 6,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#000",
        });

        this.add.image(1000, 630, "terminal");

        const npc_1 = this.add.image(700, 620, "npc_1", 1);
        npc_1.setScale(2);
        const npc_2 = this.add.image(600, 620, "npc_2", 1);
        npc_2.setScale(2);
        const npc_3 = this.add.image(800, 620, "npc_3", 1);
        npc_3.setScale(2);

        this.d1 = this.add
            .text(500, 500, "Hello! My name is ####.", {
                color: "#FFF",
                //fontSize: 20,
            })
            .setVisible(false);
        this.d2 = this.add
            .text(650, 520, "And im ####.", {
                color: "#FFF",
                //fontSize: 20,
            })
            .setVisible(false);
        this.d3 = this.add
            .text(700, 540, "Im ####. Welcome to mars!", {
                color: "#FFF",
                //fontSize: 20,
            })
            .setVisible(false);
        this.d4 = this.add
            .text(
                650,
                500,
                "This here is a terminal. \nYou will find them all over this \nplanet as well as others.",
                {
                    color: "#FFF",
                    //fontSize: 20,
                }
            )
            .setVisible(false);
    }

    handleNPC() {
        let canSpawn = true;
        while (canSpawn) {
            this.d1.setVisible(true);
            setTimeout(() => {
                this.d2.setVisible(true);
            }, 2000);
            setTimeout(() => {
                this.d3.setVisible(true);
            }, 4000);
            setTimeout(() => {
                this.d1.setVisible(false);
                this.d2.setVisible(false);
                this.d3.setVisible(false);
                this.d4.setVisible(true);
            }, 6000);
            this.textSpawned = true;
            canSpawn = false;
        }
    }

    update() {
        if (this.cursors?.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play("left", true);
        } else if (this.cursors?.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn", true);
        }
        if (this.cursors?.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-300);
        }
        if (this.gameOver) {
            this.gameOver = false;
            updateCurrentLevel(this.scene.key);
            this.scene.stop("TerminalScene");
            this.scene.start("RespawnScene");
            this.scene.stop();
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.player) {
            if (this.player.x > 450 && !this.textSpawned) {
                this.handleNPC();
            }
        }
    }
}
