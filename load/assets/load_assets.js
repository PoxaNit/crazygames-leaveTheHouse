import load_sprites from './sprites/load_sprites.js'
import load_sounds from './sounds/load_sounds.js'

async function load_assets () {

    await load_sprites();

    await load_sounds();

}

export default load_assets;
