import Phaser from "phaser";
import LevelClass from "../../Classes/LevelClass";
import { terminalDisplay } from "../../components/terminalDisplay";

export default class Level4Scene_Terminal2 extends LevelClass {
    private mainLevel: LevelClass;
    private terminalDisplayText: Phaser.GameObjects.Text;
    private TerminalInput: HTMLInputElement;
    constructor() {
        super({ key: "Level4Scene_Terminal2" });
    }

    init(data: { level: LevelClass }) {
        this.mainLevel = data.level;
        this.CorrectTerminalArr = data.level.CorrectTerminalArr2;
    }

    create() {
        this.add.text(
            250,
            50,
            `Task: It seems like he got frozen while trying to fix the heater!
            \n    On the computer, you see a directory called "heater",
            \n                  while serching through the files you also find a
            \n                  file "heater-date-set.js". "He was so close" you
            \n                  think, "if only there was a way to implement 
            \n                  his solution..."`,
            {
                color: "#fff",
                fontSize: "24px",
            }
        );

        //Terminal Display
        new terminalDisplay(this);
        //Terminal Input Text ~ Credit to group Lime For the idea
        this.TerminalInput = document.createElement("input");
        this.TerminalInput.type = "text";
        this.TerminalInput.style.position = "absolute";
        this.TerminalInput.style.width = "600px";
        this.TerminalInput.style.height = "40px";
        this.TerminalInput.style.fontSize = "20px";
        this.TerminalInput.style.top = "80%";
        this.TerminalInput.style.left = "50%";
        this.TerminalInput.style.backgroundColor = "#000";
        this.TerminalInput.style.color = "#0f0";
        this.TerminalInput.placeholder = "~$ Input Into Terminal Here";
        this.TerminalInput.style.border = "2px solid green";
        this.TerminalInput.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(this.TerminalInput);

        this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
            if (event.key === " ") {
                this.TerminalInput.value += " ";
            }
            if (event.key === "Enter") {
                this.terminalInputArr.push(
                    this.TerminalInput.value.toLocaleLowerCase().trim()
                );
                this.TerminalInput.value = "";
                this.handleFeedback(
                    this,
                    this.terminalInputArr,
                    this.CorrectTerminalArr
                );
            }
        });
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

        //this.add.text(180, 650, `Type "git -help for help"`, {});

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
            this.events.emit(`Terminal2_Close`);
            this.events.emit(`Terminal2_correct`);
            this.TerminalInput.remove();
            this.scene.resume(this.mainLevel.scene.key);
            this.scene.stop();
        });
        this.events.on("incorrect_terminal_input", () => {
            this.events.emit(`Terminal2_Close`);
            this.events.emit(`Terminal2_incorrect`);
            this.TerminalInput.remove();
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
        let feedbackX = 67;
        let feedbackY = 500;
        let feedbackWrap = 400;
        let feebackColor = "#ff0000";
        let feedbackFontSize = "32px";
        scene.FeedbackText?.destroy();
        console.log(input[input.length - 1] === "git -h");
        if (
            input[input.length - 1] === "git -h" ||
            input[input.length - 1] === "git --help"
        ) {
            scene.terminalInputArr.pop();
            scene.FeedbackText = scene.add.text(
                feedbackX,
                feedbackY - 100,
                `git add <file>: Add file contents to the index\n\ngit commit -m 'message': Record changes to the repository\n\ngit push: Update remote refs along with associated objects`,
                {
                    fontSize: "22px",
                    color: "#ff0000",
                    wordWrap: { width: feedbackWrap },
                }
            );
        }
        //Is the input exactly correct
        let lastInput = input[input.length - 1];
        if (lastInput.startsWith("git commit")) {
            let match = lastInput.match(/git commit -m ['"](.*)['"]/);
            if (match) {
                let message = match[1];
                lastInput = `git commit -m "${message.replace(/['"]/g, "")}"`;
                input[input.length - 1] = lastInput;
            } else {
                scene.sound.add("wrong").play();
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "You have to add a message to the commit",
                    {
                        fontSize: feedbackFontSize,
                        color: feebackColor,
                        wordWrap: { width: feedbackWrap },
                    }
                );
                // Clear the end of terminalInput
                scene.terminalInputArr.pop();
                return false;
            }
        }

        function compareInputs(input1: string[], input2: string[]) {
            if (input1.length !== input2.length) return false;
            for (let i = 0; i < input1.length; i++) {
                let sanitizedInput1 = input1[i].replace(
                    /['"][^'"]*['"]/g,
                    '""'
                );
                let sanitizedInput2 = input2[i].replace(
                    /['"][^'"]*['"]/g,
                    '""'
                );
                if (sanitizedInput1 !== sanitizedInput2) return false;
            }

            return true;
        }
        if (compareInputs(input, correctInput)) {
            scene.events.emit("correct_terminal_input");
            return true;
        }

        //Did they Push
        if (input[input.length - 1] === "git push") {
            scene.sound.add("wrong").play();
            //Did they push with the red platform
            if (input[2].includes("git add")) {
                if (!input[2].includes("heater-date-set")) {
                    scene.FeedbackText = scene.add.text(
                        feedbackX,
                        feedbackY,
                        "Make sure you add the file with the power fix",
                        {
                            fontSize: feedbackFontSize,
                            color: feebackColor,
                            wordWrap: { width: feedbackWrap },
                        }
                    );
                    //Clear the input array for next time
                    scene.terminalInputArr = [];
                    return false;
                    //scene.events.emit("incorrect_terminal_input");
                }
            }
            //Did they push without the blue platform
            if (!input[3].includes("git commit")) {
                scene.FeedbackText = scene.add.text(
                    feedbackX,
                    feedbackY,
                    "Make sure you commit your changes",
                    {
                        fontSize: feedbackFontSize,
                        color: feebackColor,
                        wordWrap: { width: feedbackWrap },
                    }
                );
                scene.terminalInputArr = [];
                return false;
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
        this.terminalDisplayText.setText(
            this.terminalInputArr.map((x) => "~$ " + x)
        );
    }
}
