import floor from './floor/floor.js';
import wall from './wall/wall.js';
import key from './key/key.js';

async function load_sprites () {

    await floor();

    await wall();

    await key();

}

export default load_sprites;
