import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { ButtonAndListensers } from "../../components/buttonAndListeners";

export default class Terminal1_Lvl1 extends LevelClass {
    private mainLevel: LevelClass;
    constructor() {
        super({ key: "Terminal1_Lvl1" });
    }

    init(data: { level: LevelClass }) {
        this.mainLevel = data.level;
        this.CorrectTerminalArr = data.level.CorrectTerminalArr;
    }

    create() {
        new ButtonAndListensers(
            this,
            200,
            100,
            "button",
            [
                "git add red",
                "git add blue",
                "git commit -m 'Add New Platform'",
                "git push",
            ],
            this.CorrectTerminalArr,
            this.handleFeedback
        );

        this.events.on("correct_terminal_input", () => {
            console.log("here1");
            this.events.emit(`${this.scene.key}_correct_terminal_input`);
            this.scene.resume(this.mainLevel.scene.key);
            this.scene.stop();
        });
    }

    private handleFeedback(
        scene: LevelClass,
        input: string[],
        correctInput: string[]
    ): boolean {
        console.log(input);
        console.log(correctInput);
        //Can get alot more in depth with the feeback this is just a proof of concept
        if (input.length > correctInput.length) {
            scene.FeedbackText = scene.add.text(
                400,
                500,
                "Too many commands! Try Again",
                {
                    fontSize: "32px",
                    color: "#880808",
                }
            );
            //Clear the input array for next time
            scene.terminalInputArr = [];
        }
        if (JSON.stringify(input) === JSON.stringify(correctInput)) {
            scene.events.emit("correct_terminal_input");
            return true;
        }
        return false;
    }
}
