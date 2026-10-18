import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function map_drawer() {
    const layout = game_state.map.layout;
    const tile_size = game_state.map.tile_size;

    const sprite_floor = game_state.assets?.sprites?.floor;
    const sprite_wall = game_state.assets?.sprites?.wall; // Sua imagem de parede nova!

    console.log("Gaveta de Sprites na RAM:", game_state.assets?.sprites);
    console.log("Chão:", sprite_floor, "Parede:", sprite_wall);

    // Trava de segurança assíncrona
    if (!sprite_floor || !sprite_wall) return;

    for (let r = 0; r < game_state.map.rows; r++) {
        for (let c = 0; c < game_state.map.cols; c++) {
            const tile_type = layout[r][c];

            const pixel_x = c * tile_size;
            const pixel_y = r * tile_size;

            // 1. Sempre desenha o chão de fundo para cobrir o Canvas
            ctx.drawImage(sprite_floor, pixel_x, pixel_y, tile_size, tile_size);

            // 2. Se o número for 1, carimba a textura da parede por cima do chão!
            if (tile_type === 1) {
                ctx.drawImage(sprite_wall, pixel_x, pixel_y, tile_size, tile_size);
            }
        }
    }
}

export default map_drawer;

