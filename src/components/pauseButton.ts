import Phaser from "phaser";

export interface Button {
    x: number;
    y: number;
    color: string;
    text: string;
}

export function createButton(scene: Phaser.Scene, buttons: Button[]) {
    function updateClicked(t: string) {
        if (t === "pause") {
            scene.scene.pause();
            scene.scene.setVisible(false);
            scene.scene.launch("PauseScene", { previousScene: scene });
        }
    }

    function enterButtonHoverState(b: Phaser.GameObjects.Text) {
        b.setStyle({ fill: "#ff0" });
    }

    function enterButtonRestState(b: Phaser.GameObjects.Text, color: string) {
        b.setStyle({ fill: color });
    }

    buttons.forEach((button: Button) => {
        const b: Phaser.GameObjects.Text = scene.add
            .text(button.x, button.y, button.text, { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                updateClicked(button.text);
            })
            .on("pointerover", () => {
                enterButtonHoverState(b);
            })
            .on("pointerout", () => {
                enterButtonRestState(b, button.color);
            });
        b.setScale(1);
    });
    return buttons;
}