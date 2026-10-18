import floor from './floor/floor.js';
import wall from './wall/wall.js';

async function load_sprites () {

    await floor();

    await wall();

}

export default load_sprites;
