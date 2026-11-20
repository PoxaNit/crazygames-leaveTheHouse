import game_state from '../../game_state/game_state.js';

const START_SEC = 1.0;
const END_SEC = 2.5;

function player_running() {
    const sound = game_state.assets?.sounds?.player_running;

    if (!sound) return;

    const is_running =
        game_state.player.moveable &&
        game_state.player.state?.action === 'running';

    if (is_running && !game_state.audio_muted && game_state.match_status === 'playing') {
        if (sound.currentTime < START_SEC || sound.currentTime >= END_SEC) {
            sound.currentTime = START_SEC;
        }

        if (sound.paused) {
            sound.play().catch(() => {});
        }
    } else {
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = START_SEC;
        }
    }
}

export default player_running;

