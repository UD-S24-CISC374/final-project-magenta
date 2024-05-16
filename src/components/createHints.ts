import LevelClass from "../Classes/LevelClass";
import Phaser from "phaser";

export function createHints(
    scene: LevelClass,
    hints: Phaser.GameObjects.Group,
    hintArr: string[]
) {
    for (let i = 0; i < hintArr.length; i++) {
        let roundedRect = scene.add.graphics();
        roundedRect.fillStyle(0xd3d3d3, 1);
        roundedRect.fillRoundedRect(890, 140, 320, 220, 4);
        let rect = scene.add
            .rectangle(900, 150, 300, 200, 0x000000)
            .setOrigin(0, 0);
        hints.add(rect);
        let textObj = scene.add
            .text(1050, 180, `${hintArr[i]}`, {})
            .setOrigin(0.5, 0)
            .setWordWrapWidth(280);
        hints.add(textObj);
        const deleteText = scene.add.text(1100, 320, `Next Hint`, {});
        deleteText.on("pointerover", () => {
            deleteText.setColor("#FF0000");
        });
        deleteText.on("pointerout", () => {
            deleteText.setColor("#FFFFFF");
        });
        deleteText.setInteractive().on("pointerdown", () => {
            hints.remove(rect);
            hints.remove(textObj);
            rect.destroy();
            textObj.destroy();
            roundedRect.destroy();
            deleteText.destroy();
        });
        hints.add(deleteText);
    }
}
