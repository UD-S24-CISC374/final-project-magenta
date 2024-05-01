//import Phaser from "phaser";
import TerminalButton from "./terminalButton";
import { Listenter } from "./terminalListeners"; // Import the missing 'Listenter' class
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
            new Listenter(scene, buttonName);
        });

        scene.events.on("check_terminal_input", () => {
            feedbackFunction(
                scene,
                scene.terminalInputArr,
                scene.CorrectTerminalArr
            );
        });
    }
}
