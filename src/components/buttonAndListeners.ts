//import Phaser from "phaser";
import TerminalButton from "./terminalButton";
import { terminalEmitter } from "./terminalEmitter"; // Import the missing 'Listenter' class
import LevelClass from "../Classes/LevelClass";

export class ButtonAndListensers {
    constructor(
        scene: LevelClass,
        x: number,
        y: number,
        texture: string,
        buttonNames: string[],
        correctButtonOrder: string[],
        feedbackFunction: (
            scene: LevelClass,
            terminalInputArr: string[],
            correctTerminalArr: string[]
        ) => void
    ) {
        buttonNames.map((buttonName, index) => {
            new TerminalButton(
                scene,
                x + index * 300,
                y,
                texture,
                buttonName,
                buttonName
            );
            new terminalEmitter(scene, buttonName);
        });

        scene.events.on("check_terminal_input", () => {
            feedbackFunction(
                scene,
                scene.terminalInputArr,
                scene.CorrectTerminalArr
            );
        });

        scene.anims.create({
            key: "buttonPressed",
            frames: scene.anims.generateFrameNumbers("button", {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: "buttonUp",
            frames: scene.anims.generateFrameNumbers("button", {
                start: 1,
                end: 0,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }
}
