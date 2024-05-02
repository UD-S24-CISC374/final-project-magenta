import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { ButtonAndListensers } from "../../components/buttonAndListeners";
import { terminalDisplay } from "../../components/terminalDisplay";

export default class Level1Scene_Terminal1 extends LevelClass {
    private mainLevel: LevelClass;
    private terminalDisplayText: Phaser.GameObjects.Text;
    private level1Task: Phaser.GameObjects.Text;

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

        new terminalDisplay(this);

        //Task
        this.level1Task = this.add.text(
            600,
            200,
            "Task: Click on <Git Add Blue>, <Git Commit>, <Git Push>",
            {
                color: "#EE4B2B",
            }
        );

        //Reset button
        let resetButton = this.add
            .text(300, 180, "Reset Terminal", {
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

        this.terminalDisplayText = this.add.text(
            80,
            200,
            this.terminalInputArr,
            {
                color: "#0f0",
            }
        );

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
                //scene.events.emit("incorrect_terminal_input");
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
                //scene.events.emit("incorrect_terminal_input");
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
                //scene.events.emit("incorrect_terminal_input");
            }

            //Clear the input array for next time
            scene.terminalInputArr = [];
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
        this.terminalDisplayText.setText(this.terminalInputArr);
    }
}
