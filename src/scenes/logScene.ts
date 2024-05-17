import Phaser from "phaser";
import { logBook } from "../objects/logBook";

export default class LogScene extends Phaser.Scene {
    constructor() {
        super({ key: "LogScene" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000000");
        this.add
            .text(0, 10, "Back", { fontSize: "42px", color: "#fff" })
            .setInteractive()
            .on("pointerdown", () => {
                console.log("Back clicked");
                this.scene.stop("LogScene");
            });
        let options = Object.keys(logBook).map((key) =>
            key.replace("Scene", "")
        );

        const logText = this.add
            .text(900, 50, "", {
                wordWrap: { width: 400 },
            })
            .setOrigin(0.5, 0);
        const dropdownButton = this.add.text(25, 50, "Select a Level", {
            fontSize: "42px",
            color: "#fff",
        });
        const dropdownContent = this.add.container(100, 140);
        dropdownContent.setVisible(false);

        options.forEach((option, index) => {
            const optionText = this.add.text(0, index * 40, option, {
                fontSize: "32px",
                color: "#fff",
            });
            optionText.setInteractive();
            optionText.on("pointerdown", () => {
                dropdownButton.setText(option);
                dropdownContent.setVisible(false);
                logText.setText(logBook[`${option}Scene`].join("\n"));
            });
            dropdownContent.add(optionText);
        });

        dropdownButton.setInteractive();
        dropdownButton.on("pointerdown", () => {
            dropdownContent.setVisible(!dropdownContent.visible);
        });
    }
}
