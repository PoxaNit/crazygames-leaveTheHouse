import game_state from '../../../../src/game_state/game_state.js';

function creaky_wood() {
    return new Promise((resolve) => {
        const audio = new Audio('./assets/sounds/creaky_wood/freesound_community-086133_wood-creak-single-v1-41402.mp3');
        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', () => {
            if (!game_state.assets) game_state.assets = {};
            if (!game_state.assets.sounds) game_state.assets.sounds = {};

            game_state.assets.sounds.creaky_wood = audio;
            resolve(audio);
        }, { once: true });

        audio.addEventListener('error', (err) => {
            console.warn('Failed to load creaky_wood audio:', err);
            resolve(null);
        }, { once: true });
    });
}

export default creaky_wood;

