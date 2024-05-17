import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { ButtonAndListensers } from "../../components/buttonAndListeners";
import { terminalDisplay } from "../../components/terminalDisplay";
import { createHints } from "../../components/createHints";

export default class Level3Scene_Terminal1 extends LevelClass {
    private mainLevel: LevelClass;
    private terminalDisplayText: Phaser.GameObjects.Text;
    private buttonList: string[] = [];
    private level3Task: Phaser.GameObjects.Text;
    private hints: Phaser.GameObjects.Group;
    public turnOffEmitters() {
        this.buttonList.forEach((x) => this.events.off(x));
    }
    constructor() {
        super({ key: "Level3Scene_Terminal1" });
    }

    init(data: { level: LevelClass }) {
        this.mainLevel = data.level;
        this.CorrectTerminalArr = data.level.CorrectTerminalArr;
    }

    create() {
        this.buttonList = [
            "git push origin dangerPlanet --force",
            "git reset --hard HEAD~1",
            "git reset --soft HEAD~1",
            "git reset --mixed HEAD~1",
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
        this.level3Task = this.add.text(
            500,
            400,
            `Task: An explosion corrupted the survey files in the last commit.\nYou need to reset the last commit and force push the pre-corrupted changes\n to the main repository at the Space Station.`,
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
            250,
            this.terminalInputArr,
            {
                color: "#0f0",
            }
        );
        this.hints = this.add.group();
        let showHints = this.add
            .text(80, 180, "Show Hints", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                createHints(this, this.hints, [
                    "Hint 3: After the reset you have to push to the danger planet",
                    "Hint 2: A mixed git reset doesn't undo changes to the working tree files.",
                    "Hint 1: A soft git reset doesn't undo changes to staged or working tree files.",
                ]);
            });
        showHints.on("pointerover", () => {
            showHints.setStyle({ fill: "#ff0" });
        });
        showHints.on("pointerout", () => {
            showHints.setStyle({ fill: "#0f0" });
        });

        //Handle Feedback Events
        //Handle Feedback Events
        this.events.on("correct_terminal_input", () => {
            this.events.emit(`Terminal1_Close`);
            this.events.emit(`Terminal1_correct`);
            this.scene.resume(this.mainLevel.scene.key);
            this.scene.stop();
        });
        function handleEnd(this: Level3Scene_Terminal1) {
            console.log("here");
            this.events.emit(`Terminal1_Close`);
            this.events.emit(`Terminal1_incorrect`);
            this.scene.stop("Level3Scene_Terminal1");
            this.scene.resume(this.mainLevel.scene.key);
        }
        this.events.on("incorrect_terminal_input", () => {
            this.time.delayedCall(1500, handleEnd, [this], this);
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
        let feedbackY = 380;
        let feedbackWrap = 400;
        let feebackColor = "#ff0000";
        let feedbackFontSize = "32px";

        //Is the input exactly correct
        if (JSON.stringify(input) === JSON.stringify(correctInput)) {
            scene.events.emit("correct_terminal_input");
            return true;
        }

        //Did they Push
        if (
            input[input.length - 1] === "git push origin dangerPlanet --force"
        ) {
            scene.sound.add("wrong").play();
            //Did they push without the blue platform
            if (input.includes("git reset --mixed HEAD~1")) {
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "The --mixed flag goes back to the previous commit and unstages the corrupted changes but it still keeps them in your working repo! Try Again!",
                    {
                        fontSize: feedbackFontSize,
                        color: feebackColor,
                        wordWrap: { width: feedbackWrap },
                    }
                );
                //scene.events.emit("incorrect_terminal_input");
            } else if (input.includes("git reset --soft HEAD~1")) {
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "The --soft flag goes back to the previous commit but still keeps the corrupted files commited! Try Again!",
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

        if (input.length > correctInput.length) {
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
