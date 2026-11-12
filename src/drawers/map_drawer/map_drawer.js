import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function map_drawer() {
    const layout = game_state.map.layout;
    const tile_size = game_state.map.tile_size;

    const sprite_floor = game_state.assets?.sprites?.floor;
    const sprite_wall = game_state.assets?.sprites?.wall;
    const sprite_key = game_state.assets?.sprites?.key;
    const sprite_carpet_sheet = game_state.assets?.sprites?.carpet;
    const sprite_cactus = game_state.assets?.sprites?.cactus;
    const sprite_table_sheet = game_state.assets?.sprites?.table;
    const sprite_chair_sheet = game_state.assets?.sprites?.chair;
    const sprite_door_sheet = game_state.assets?.sprites?.door;
    const sprite_bed_sheet = game_state.assets?.sprites?.bed;
    const sprite_stove_sheet = game_state.assets?.sprites?.stove;

    if (
        !sprite_floor ||
        !sprite_wall ||
        !sprite_key ||
        !sprite_carpet_sheet ||
        !sprite_cactus ||
        !sprite_table_sheet ||
        !sprite_chair_sheet ||
        !sprite_door_sheet ||
        !sprite_bed_sheet
    ) return;

    for (let r = 0; r < game_state.map.rows; r++) {
        if (!layout[r]) continue;

        for (let c = 0; c < game_state.map.cols; c++) {
            const tile_type = layout[r][c];

            const screen_x = (c * tile_size) - camera.x;
            const screen_y = (r * tile_size) - camera.y;

            ctx.drawImage(sprite_floor, screen_x, screen_y, tile_size, tile_size);

            if (tile_type === 1) {
                ctx.drawImage(sprite_wall, screen_x, screen_y, tile_size, tile_size);
            }

            if (tile_type === 4) {
                const item_size = 16;
                const offset_center = (tile_size - item_size) / 2;

                ctx.drawImage(
                    sprite_key,
                    screen_x + offset_center,
                    screen_y + offset_center,
                    item_size,
                    item_size
                );
            }

            if (tile_type === 5) {
                ctx.drawImage(sprite_floor, screen_x, screen_y, tile_size, tile_size);
            }

            if (tile_type >= 6 && tile_type <= 9) {
                if (tile_type === 8 || tile_type === 9) {
                    ctx.save();
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(screen_x, screen_y, tile_size, tile_size);
                    ctx.restore();
                }

                const door_index = tile_type - 6;
                const sx = (door_index % 2) * tile_size;
                const sy = Math.floor(door_index / 2) * tile_size;

                ctx.drawImage(
                    sprite_door_sheet,
                    sx, sy, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

            if (tile_type === 11 || tile_type === 12 || tile_type === 13) {
                const sprite_index = tile_type - 11;
                const sx = sprite_index * tile_size;

                ctx.drawImage(
                    sprite_carpet_sheet,
                    sx, 0, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

            if (tile_type === 14) {
                ctx.drawImage(sprite_cactus, screen_x, screen_y, tile_size, tile_size);
            }

            if (tile_type >= 15 && tile_type <= 23) {
                const table_index = tile_type - 15;
                const sx = (table_index % 3) * tile_size;
                const sy = Math.floor(table_index / 3) * tile_size;

                ctx.drawImage(
                    sprite_table_sheet,
                    sx, sy, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

            if (tile_type >= 24 && tile_type <= 29) {
                const chair_index = tile_type - 24;
                const sx = (chair_index % 3) * tile_size;
                const sy = Math.floor(chair_index / 3) * tile_size;

                ctx.drawImage(
                    sprite_chair_sheet,
                    sx, sy, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

            if (tile_type === 30) {
                ctx.drawImage(
                    sprite_table_sheet,
                    tile_size, tile_size * 2, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );

                ctx.drawImage(
                    sprite_chair_sheet,
                    tile_size, 0, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

            if (tile_type >= 31 && tile_type <= 34) {
                const bed_index = tile_type - 31;
                const sx = (bed_index % 2) * tile_size;
                const sy = Math.floor(bed_index / 2) * tile_size;

                ctx.drawImage(
                    sprite_bed_sheet,
                    sx, sy, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

            if (tile_type >= 35 && tile_type <= 38 && sprite_stove_sheet) {
                const stove_coords = {
                    35: { col: 1, row: 0 },
                    36: { col: 0, row: 1 },
                    37: { col: 1, row: 1 },
                    38: { col: 2, row: 1 }
                };

                const coords = stove_coords[tile_type];
                const sx = coords.col * tile_size;
                const sy = coords.row * tile_size;

                ctx.drawImage(
                    sprite_stove_sheet,
                    sx, sy, tile_size, tile_size,
                    screen_x, screen_y, tile_size, tile_size
                );
            }

        }
    }
}

export default map_drawer;

