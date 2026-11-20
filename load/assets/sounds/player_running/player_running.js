import game_state from '../../../../src/game_state/game_state.js';

function player_running() {
    return new Promise((resolve) => {
        const audio = new Audio('./assets/sounds/player_running/liecio-running-and-walking-on-clogs-wooden-floor-297347.mp3');
        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', () => {
            if (!game_state.assets) game_state.assets = {};
            if (!game_state.assets.sounds) game_state.assets.sounds = {};

            game_state.assets.sounds.player_running = audio;
            resolve(audio);
        }, { once: true });

        audio.addEventListener('error', (err) => {
            console.warn('Failed to load player_running audio:', err);
            resolve(null);
        }, { once: true });
    });
}

export default player_running;

