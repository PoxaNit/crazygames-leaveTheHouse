import floor from './floor/floor.js';
import wall from './wall/wall.js';
import key from './key/key.js';
import carpet from './carpet/carpet.js';
import cactus from './plants/cactus/cactus.js';
import table from './table/table.js';

async function load_sprites () {

    await floor();

    await wall();

    await key();

    await carpet();

    await cactus();

    await table();

}

export default load_sprites;
