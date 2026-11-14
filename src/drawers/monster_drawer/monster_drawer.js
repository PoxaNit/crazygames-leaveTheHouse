import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function monster_drawer() {

    if (!game_state.monster.drawable) return;

    const monster = game_state.monster;
    const screen_x = monster.x - camera.x;
    const screen_y = monster.y - camera.y;

    const sprite_monster = game_state.assets?.sprites?.monster || game_state.assets?.sprites?.amanda;

    if (!sprite_monster) {
        ctx.save();
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(screen_x, screen_y, monster.width, monster.height);
        ctx.restore();
        return;
    }

    const tile_size = game_state.map?.tile_size || 32;
    const cols = Math.floor(sprite_monster.width / tile_size);

    // Floating animation using sine wave when game is active
    const float_offset = game_state.game_running
        ? Math.sin(Date.now() / 180) * 3
        : 0;

    const dir = monster.state?.direction || monster.state.direction || 'down';
    let sprite_index = 0;

    if (game_state.monster.state.action === 'captured_player') {
        sprite_index = 4;
    } else if (dir === 'down') {
        sprite_index = 0;
    } else if (dir === 'up') {
        sprite_index = 1;
    } else if (dir === 'left') {
        sprite_index = 3;
    } else if (dir === 'right') {
        sprite_index = 2;
    }

    // Automatically handles both horizontal strip (160x32) and grid sheets (e.g., 64x96 or 96x64)
    const sx = (sprite_index % cols) * tile_size;
    const sy = Math.floor(sprite_index / cols) * tile_size;

    ctx.drawImage(
        sprite_monster,
        sx, sy, tile_size, tile_size,
        screen_x, screen_y + float_offset,
        monster.width, monster.height
    );
}

export default monster_drawer;

