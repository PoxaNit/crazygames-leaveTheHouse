import game_state from '../../game_state/game_state.js';
import check_tile_collision from '../../systems/collisions/check_tile_collision.js';

const START_SEC = 0.3;
const END_SEC = 1.0;
const COOLDOWN_SEC = 2.0;

function creaky_wood() {
    const sound = game_state.assets?.sounds?.creaky_wood;
    if (!sound || game_state.match_status !== 'playing') return;

    const is_stepping = check_tile_collision(game_state.player, 5);
    const is_standing = game_state.player.state?.action === 'standing';

    if (!sound.paused && (sound.currentTime >= END_SEC || game_state.audio_muted)) {
        sound.pause();
        sound.currentTime = START_SEC;
    }

    if (!is_stepping || is_standing) {
        game_state.time.creaky_wood_timer = 0;
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = START_SEC;
        }
        return;
    }

    if (game_state.time.creaky_wood_timer === 0 && !game_state.audio_muted) {
        sound.currentTime = START_SEC;
        sound.play().catch(() => {});
    }

    game_state.time.creaky_wood_timer += game_state.time.delta_time;

    if (game_state.time.creaky_wood_timer >= COOLDOWN_SEC) {
        game_state.time.creaky_wood_timer = 0;
    }
}

export default creaky_wood;

