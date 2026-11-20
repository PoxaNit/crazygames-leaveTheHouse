import game_state from '../game_state/game_state.js';
import player_running from './player_running/player_running.js';
import creaky_wood from './creaky_wood/creaky_wood.js';

function play () {
console.log('game_state.audio_muted: ', game_state.audio_muted)
    if (game_state.audio_muted) return;

    player_running();

    creaky_wood();

}

export default play;
