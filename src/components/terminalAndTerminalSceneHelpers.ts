import Phaser from "phaser";
import LevelClass from "../Classes/LevelClass";

export class TerminalBody extends Phaser.GameObjects.Sprite {
    constructor(
        scene: LevelClass,
        x: number,
        y: number,
        texture: string,
        correctButtonOrder: string[],
        terminalNumber: string
    ) {
        super(scene, x, y, texture);

        if (scene.platforms) {
            scene.physics.add.collider(this, scene.platforms);
        }

        let terminal_Overlap = scene.physics.add.overlap(
            scene.player,
            this,
            () => {
                scene.scene.pause(scene.scene.key);+
                scene.scene.launch(`${scene.scene.key}_Terminal${terminalNumber}`, { level: scene });
            },
            undefined,
            this
        );

        let terminalScene = scene.scene.manager.getScene(
            `${scene.scene.key}_Terminal${terminalNumber}`
        );

        terminalScene.events.on(
            `TerminalClose`,
            () => {
                scene.events.emit(`Terminal${terminalNumber}_correct`);
                terminal_Overlap.active = false;
            }
        );

        //Listen for Terminal Reset
        scene.events.on(`Terminal${terminalNumber}_reset`, () => {
            terminal_Overlap.active = true;

        });

        scene.physics.add.existing(this);
        scene.add.existing(this);
    }
}
