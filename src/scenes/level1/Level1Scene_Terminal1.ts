import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { ButtonAndListensers } from "../../components/buttonAndListeners";
import { terminalDisplay } from "../../components/terminalDisplay";

export default class Level1Scene_Terminal1 extends LevelClass {
    private mainLevel: LevelClass;
    private terminalDisplayText: Phaser.GameObjects.Text;
    private buttonList: string[] = [];
    public turnOffEmitters() {
        this.buttonList.forEach((x) => this.events.off(x));
    }
    private level1Task: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "Level1Scene_Terminal1" });
    }

    init(data: { level: LevelClass }) {
        this.mainLevel = data.level;
        this.CorrectTerminalArr = data.level.CorrectTerminalArr;
    }

    create() {
        this.buttonList = [
            `git add messsage`,
            `git commit -m 'Sending Message to SpaceStation'`,
            "git add coordinates",
            "git push",
        ];
        new ButtonAndListensers(
            this,
            200,
            100,
            "button",
            this.buttonList,
            this.CorrectTerminalArr,
            this.handleFeedback
        );

        new terminalDisplay(this);

        //Task
        this.level1Task = this.add.text(
            600,
            200,
            `Task: Send a message to the space station\nYou will need to add, commit, and push and changes\nyou make along the way including this message`,
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
        function handleEnd(this: Level1Scene_Terminal1) {
            console.log("here");
            this.events.emit(`Terminal1_Close`);
            this.events.emit(`Terminal1_incorrect`);
            this.scene.stop("Level1Scene_Terminal1");
            this.scene.resume(this.mainLevel.scene.key);
        }
        this.events.on("incorrect_terminal_input", () => {
            this.time.delayedCall(2200, handleEnd, [this], this);
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
        let feedbackX = 67;
        let feedbackY = 500;
        let feedbackWrap = 400;
        let feebackColor = "#ff0000";
        let feedbackFontSize = "32px";
        //Is the input exactly correct
        if (JSON.stringify(input) === JSON.stringify(correctInput)) {
            scene.events.emit("correct_terminal_input");
            return true;
        }

        //Did they Push
        if (input[input.length - 1] === "git push") {
            scene.sound.add("wrong").play();
            //Did they push with the red platform
            if (input.includes("git add coordinates")) {
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "You pushed with the coordinates! Ohno!",
                    {
                        fontSize: feedbackFontSize,
                        color: feebackColor,
                        wordWrap: { width: feedbackWrap },
                    }
                );
                //scene.events.emit("incorrect_terminal_input");
            }
            //Did they push without the message platform
            else if (!input.includes("git add message")) {
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "How is your friend going to know the message",
                    {
                        fontSize: feedbackFontSize,
                        color: feebackColor,
                        wordWrap: { width: feedbackWrap },
                    }
                );
                //scene.events.emit("incorrect_terminal_input");
            }
            //Did they push without the commit
            else if (!input.includes(`git commit -m 'Sending Message to SpaceStation`)) {
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "You have to commit.",
                    {
                        fontSize: feedbackFontSize,
                        color: feebackColor,
                        wordWrap: { width: feedbackWrap },
                    }
                );
                //scene.events.emit("incorrect_terminal_input");
            }

            //Clear the input array for next time
            scene.terminalInputArr = [];
        }

        if (input.length > correctInput.length + 2) {
            console.log("running");
            scene.FeedbackText = scene.add.text(
                feedbackX,
                feedbackY,
                "You seem to have entered too many commands! Try Again",
                {
                    fontSize: feedbackFontSize,
                    color: feebackColor,
                    wordWrap: { width: feedbackWrap },
                }
            );
            //scene.events.emit("incorrect_terminal_input");

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
