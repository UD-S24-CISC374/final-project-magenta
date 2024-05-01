import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { ButtonAndListensers } from "../../components/buttonAndListeners";

export default class Terminal1_Lvl1 extends LevelClass {
    private mainLevel: LevelClass;
    constructor() {
        super({ key: "Level1Scene_Terminal1" });
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
        
        //Handle Feedback Events
        this.events.on("correct_terminal_input", () => {
            this.events.emit(`TerminalClose`);
            this.events.emit(`Terminal1_correct`);
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
