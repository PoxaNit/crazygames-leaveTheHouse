import load_assets from '../load/assets/load_assets.js';
import game_loop from './game_loop/game_loop.js';
import bind_inputs from './input/bind_inputs.js';
import start_game from './game_state/start_game.js';

if (window.CrazyGames?.SDK) {
    try {
        await window.CrazyGames.SDK.init();
    } catch (err) {
        console.warn('CrazyGames SDK init failed:', err);
    }
}

start_game();

await load_assets();

bind_inputs();

game_loop();

