import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { ButtonAndListensers } from "../../components/buttonAndListeners";

export default class Terminal1_Lvl1 extends LevelClass {
    private mainLevel: LevelClass;
    private terminalDisplay: Phaser.GameObjects.Text;
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
        //Reset button
        let resetButton = this.add
            .text(200, 250, "Reset Terminal", {
                color: "#0f0",
            })
            .setInteractive()
            .on("pointerdown", () => {
                this.terminalInputArr = [];
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(resetButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(resetButton);
            });

        this.terminalDisplay = this.add.text(200, 300, this.terminalInputArr, {
            color: "#0f0",
        });

        //Handle Feedback Events
        this.events.on("correct_terminal_input", () => {
            this.events.emit(`Terminal1_Close`);
            this.events.emit(`Terminal1_correct`);
            this.scene.resume(this.mainLevel.scene.key);
            this.scene.stop();
        });
        this.events.on("incorrect_terminal_input", () => {
            this.events.emit(`Terminal1_Close`);
            this.events.emit(`Terminal1_incorrect`);
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
        scene.FeedbackText?.destroy();
        //Is the input exactly correct
        if (JSON.stringify(input) === JSON.stringify(correctInput)) {
            scene.events.emit("correct_terminal_input");
            return true;
        }

        //Did they Push
        if (input[input.length - 1] === "git push") {
            //Did they push with the red platform
            if (input.includes("git add red")) {
                scene.FeedbackText = scene.add.text(
                    400,
                    500,
                    "You pushed with the red platform! Ohno!",
                    {
                        fontSize: "32px",
                        color: "#880808",
                    }
                );
            }
            //Did they push without the blue platform
            else if (!input.includes("git add blue")) {
                scene.FeedbackText = scene.add.text(
                    400,
                    500,
                    "How are you supposed to get to the other side without the blue platform",
                    {
                        fontSize: "32px",
                        color: "#880808",
                    }
                );
            }
            //Did they push without the commit
            else if (!input.includes("git commit -m 'Add New Platform'")) {
                scene.FeedbackText = scene.add.text(
                    400,
                    500,
                    "You have to commit.",
                    {
                        fontSize: "32px",
                        color: "#880808",
                    }
                );
            }

            //Clear the input array for next time
            scene.terminalInputArr = [];
            //scene.events.emit("incorrect_terminal_input");
        }

        if (input.length > correctInput.length + 2) {
            scene.FeedbackText = scene.add.text(
                400,
                500,
                "You seem to have entered too many commands! Try Again",
                {
                    fontSize: "32px",
                    color: "#880808",
                }
            );
            //Clear the input array for next time
            scene.terminalInputArr = [];
        }
        return false;
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {
        this.terminalDisplay.setText(this.terminalInputArr);
    }
}
