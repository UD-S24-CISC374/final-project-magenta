import Phaser from "phaser";
import { Player } from "../objects/player";

export default abstract class LevelClass extends Phaser.Scene {
    public terminalInputArr: string[] = [];
    public CorrectTerminalArr: string[] = [];
    public CorrectTerminalArr2: string[] = [];
    public FeedbackText?: Phaser.GameObjects.Text;
    public platforms?: Phaser.Physics.Arcade.StaticGroup;
    public player: Player;
    public tempText?: Phaser.GameObjects.Text;

    public setFeedbackText(text: Phaser.GameObjects.Text) {
        this.FeedbackText = text;
    }
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
        this.terminalInputArr = [];
    }
}
