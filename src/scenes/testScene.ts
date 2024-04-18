import Phaser from "phaser";
import LevelClass from "../Classes/LevelClass";
import { Player } from "../objects/player";
import { Platform, createPlatforms } from "../components/platform";

export default class TestScene extends LevelClass {
    private player: Player;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private playerPos?: Phaser.GameObjects.Text;
    private posX = 0;
    private posY = 0;

    constructor() {
        super({ key: "TestScene" });
    }

    create() {
        this.player = new Player(this, 100, 0);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cursors = this.input.keyboard?.createCursorKeys();

        const level_1_bg = this.add.image(640, 360, "level_1_bg");
        level_1_bg.setScale(1);

        this.add.text(400, 250, "Test Scene", {
            color: "#0f0",
        });
        this.playerPos = this.add.text(400, 300, "Player Position: (0, 0)", {
            color: "#0f0",
        });

        this.physics.world.createDebugGraphic();

        this.platforms = this.physics.add.staticGroup();

        const platforms: Platform[] = [
            { x: 230, y: 550, texture: "brown_plat_1" },
            { x: 600, y: 550, texture: "brown_plat_1" },
            { x: 970, y: 550, texture: "brown_plat_1" },
            { x: 640, y: 720, texture: "brown_plat_1", scale: { x: 40, y: 2 } }, // Ground
        ];
        createPlatforms(this, platforms, this.platforms, [this.player]);
    }
    preload() {
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
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
