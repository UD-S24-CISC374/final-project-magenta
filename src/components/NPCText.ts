import Phaser from "phaser";
import LevelClass from "../Classes/LevelClass";
import { addLog, logBook } from "../objects/logBook";

export function displayNPCText(
    Scene: LevelClass,
    x: number,
    y: number,
    text: string[]
) {
    const HEIGHT_OFFSET = 100;
    let textObj = Scene.add.text(x, y - HEIGHT_OFFSET, text[0], {
        fontFamily: "Arial",
        color: "#EE4B2B",
        wordWrap: { width: 300 },
    });
    for (let i = 1; i < text.length; i++) {
        setTimeout(() => {
            textObj.setText(text[i]);
        }, i * 5000);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let missionAddedText: Phaser.GameObjects.Text;
    setTimeout(() => {
        textObj.destroy();
        missionAddedText = Scene.add
            .text(Scene.player.x, 200, "Mission Added To Logs", {
                fontFamily: "Arial",
                color: "#FFF",
                fontSize: "32px",
                stroke: "#FFFF00",
                strokeThickness: 2,
            })
            .setOrigin(0.5, 0.5);
        addLog(Scene.scene.key, text);
        Scene.player.updatePlayerFreeze();
        console.log(logBook);
    }, text.length * 6100);

    setTimeout(() => {
        missionAddedText.destroy();
    }, text.length * 4100 + 2000);
    textObj.setOrigin(0.5, 0.5);
    // textObj.setScrollFactor(0);

    return textObj;
}
