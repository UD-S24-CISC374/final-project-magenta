import Phaser from "phaser";

export interface Platform {
    x: number;
    y: number;
    texture: string;
    frame?: number | string;
    scale?: { x: number; y: number };
    dropEvent?: string;
}

export function createPlatforms(
    scene: Phaser.Scene,
    platforms: Platform[],
    platformGroup: Phaser.Physics.Arcade.StaticGroup,
    colliders?: Phaser.Types.Physics.Arcade.ArcadeColliderType[]
) {
    //setting the size of the groud (1, 2, 3)

    platforms.forEach((platform) => {
        const plat = platformGroup.create(
            platform.x,
            platform.y,
            platform.texture,
            platform.frame
        );
        if (platform.scale) {
            plat.setScale(platform.scale.x, platform.scale.y).refreshBody();
        }
    });

    if (colliders) {
        scene.physics.add.collider(colliders[0], platformGroup);
    }
    return platforms;
}
