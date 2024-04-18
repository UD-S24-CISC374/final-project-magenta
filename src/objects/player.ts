import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    //private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "cat", 1);
        this.setVisible(true);
        this.setScale(2); //set scale 2 (32x32 -> 64x64)
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.setDepth(10); //set player to top layer

        this.initAnimations();
        //this.initPhysics();
    }

    private initAnimations(): void {
        this.scene.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 3,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "turn",
            frames: [{ key: "cat", frame: 1 }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 6,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    //currently disabled as it was only used to set world bounds true
    //may be needed in the future
    /*
    private initPhysics(): void {
        const body = this.body as Phaser.Physics.Arcade.Body;
        //body.setGravityY(300);
        body.setCollideWorldBounds(true);
    }
    */

    update(cursors?: Phaser.Types.Input.Keyboard.CursorKeys) {
        const body = this.body as Phaser.Physics.Arcade.Body;

        if (cursors?.left.isDown) {
            body.setVelocityX(-160);
            this.anims.play("left", true);
        } else if (cursors?.right.isDown) {
            body.setVelocityX(160);
            this.anims.play("right", true);
        } else {
            body.setVelocityX(0);
            this.anims.play("turn", true);
        }

        if (cursors?.up.isDown && body.touching.down) {
            body.setVelocityY(-330);
        }
    }
}
