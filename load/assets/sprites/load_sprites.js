import floor from './floor/floor.js';
import wall from './wall/wall.js';
import key from './key/key.js';
import carpet from './carpet/carpet.js';
import cactus from './plants/cactus/cactus.js';
import table from './table/table.js';
import chair from './chair/chair.js';
import door from './door/door.js';
import bed from './bed/bed.js';
import stove from './stove/stove.js';
import amanda from './amanda/amanda.js';
import player from './player/player.js';

async function load_sprites () {

    await floor();

    await wall();

    await key();

    await carpet();

    await cactus();

    await table();

    await chair();

    await door();

    await bed();

    await stove();

    await amanda();

    await player();

}

export default load_sprites;
