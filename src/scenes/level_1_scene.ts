import Phaser from "phaser";
import { updateCurrentLevel } from "./currentLevel";
import LevelClass from "../Classes/LevelClass";
import { Player } from "../objects/player";

export default class Level_1_scene extends LevelClass {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;
    private spikes?: Phaser.Physics.Arcade.Group;
    private terminal?: Phaser.Physics.Arcade.Group;
    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private terminalCorrect: boolean = false;
    private terminalScene?: Phaser.Scene;
    private gameOver = false;

    constructor() {
        super({ key: "Level_1_scene" });
    }

    private setTerminalCorrect(correct: boolean) {
        console.log("here");
        this.terminalCorrect = correct;
    }

    create() {
        //text for alpha sub

        const level_1_bg = this.add.image(640, 360, "level_1_bg");
        level_1_bg.setScale(1);

        this.add.text(
            400,
            250,
            "use the arrow keys to move and mouse to click when needed",
            {
                color: "#0f0",
            }
        );

        //This is createing a solid object
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            640,
            720,
            "brown_plat_1"
        ) as Phaser.Physics.Arcade.Sprite;

        //setting the size of the groud (1, 2, 3)
        ground.setScale(40, 2).refreshBody();

        //platform 1
        this.platforms.create(230, 550, "brown_plat_1");

        //platform 2
        this.platforms.create(600, 550, "brown_plat_1");

        //platform 3
        this.platforms.create(970, 550, "brown_plat_1");

        this.player = new Player(this, 100, 500);
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

        this.stars = this.physics.add.group();
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        );
        this.stars.create(1100, 680, "star");
        this.stars.create(1150, 680, "star");
        this.stars.create(1200, 680, "star");

        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#000",
        });

        this.spikes = this.physics.add.group();

        this.spikes.create(250, 625, "spikes_hor");
        this.spikes.create(400, 625, "spikes_hor");
        this.spikes.create(550, 625, "spikes_hor");
        this.spikes.create(700, 625, "spikes_hor");
        this.spikes.create(850, 625, "spikes_hor");
        this.spikes.create(1000, 625, "spikes_hor");

        this.physics.add.collider(this.spikes, this.platforms);
        this.physics.add.collider(
            this.player,
            this.spikes,
            this.handleHitSpike,
            undefined,
            this
        );
    }

    private handleHitSpike() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
        this.gameOver = true;
    }

    private handleCollectStar(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText?.setText(`score: ${this.score}`);
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
            if (this.player.x > 1240) {
                this.scene.start("Level_1_2_scene");
            }
        }
    }
}
