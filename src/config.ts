import Phaser from "phaser";
import MainScene from "./scenes/mainScene";
import PreloadScene from "./scenes/preloadScene";

import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

import OptionsScene from "./scenes/optionsScene";
import LevelScene from "./scenes/levelScene";
import PauseScene from "./scenes/pauseScene";
import StartScene from "./scenes/startScene";
import Level_1_scene from "./scenes/level_1_scene";
import RespawnScene from "./scenes/respawnScene";
import Level_1_2_scene from "./scenes/level_1_2_scene";
import Level_1_3_scene from "./scenes/level_1_3_scene";
import TestScene from "./scenes/testScene";
import Level1Scene from "./scenes/level1/level1";
import Level1Scene_Terminal1 from "./scenes/level1/Level1Scene_Terminal1";
import Level2Scene_Terminal1 from "./scenes/level2/Level2Scene_Terminal1";
import Level2Scene from "./scenes/level2/level2";
import Level2Scene_Terminal2 from "./scenes/Level2Scene_Terminal2";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "My Untitled Phaser 3 Game",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },

    scene: [
        PreloadScene,
        MainScene,
        OptionsScene,
        LevelScene,
        PauseScene,
        StartScene,
        Level_1_scene,
        Level_1_2_scene,
        Level_1_3_scene,
        RespawnScene,
        TestScene,
        Level1Scene,
        Level1Scene_Terminal1,
        Level2Scene_Terminal1,
        Level2Scene,
        Level2Scene_Terminal2,
    ],

    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
    dom: {
        createContainer: true,
    },
    transparent: true,
    plugins: {
        scene: [
            {
                key: "rexUI",
                plugin: UIPlugin,
                mapping: "rexUI",
            },
        ],
    },
};