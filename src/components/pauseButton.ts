import Phaser from "phaser";

export interface Button {
    x: number;
    y: number;
    color: string;
    text: string;
}

export function createButton(scene: Phaser.Scene, buttons: Button[]) {
    function updateClicked(t: string) {
        if (t === "Pause") {
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

    /*
    buttons.map((button: Button) => {
        const b: Phaser.GameObjects.Text = scene.add
            .text(
                scene.cameras.main.scrollX + 100,
                scene.cameras.main.scrollY + 700,
                button.text,
                {
                    color: "#0f0",
                }
            )
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
        return b;
        
    });
    */
    return buttons.map((button: Button) => {
        const b: Phaser.GameObjects.Text = scene.add
            .text(
                scene.cameras.main.scrollX + 100,
                scene.cameras.main.scrollY + 700,
                button.text,
                {
                    color: button.color,
                }
            )
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
        return b;
    });
    //return buttons;
}

export function handleButtonPosition(
    scene: Phaser.Scene,
    button: Phaser.GameObjects.Text,
    offx: number,
    offy: number
) {
    button.setPosition(scene.cameras.main.scrollX + scene.cameras.main.width - offx, scene.cameras.main.scrollY + offy);
}