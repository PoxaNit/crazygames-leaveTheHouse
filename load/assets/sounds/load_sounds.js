import player_running from './player_running/player_running.js';
import creaky_wood from './creaky_wood/creaky_wood.js';

async function load_sounds () {

    await player_running();

    await creaky_wood();
}

export default load_sounds;
