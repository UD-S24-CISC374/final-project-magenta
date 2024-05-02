import Phaser from 'phaser';
import LevelClass from '../Classes/LevelClass';

export class terminalEmitter extends Phaser.Events.EventEmitter {
    public eventID: string;
    constructor(scene: LevelClass, eventID: string) {
        super();
        this.eventID = eventID;
        scene.events.on(eventID, () => {
            scene.terminalInputArr.push(eventID);
            scene.events.emit("check_terminal_input");
        });
    }

}