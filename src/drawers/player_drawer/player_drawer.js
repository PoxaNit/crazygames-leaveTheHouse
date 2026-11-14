import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let last_direction = 'down';

function player_drawer() {

    if (!game_state.player.drawable) return;

    const player = game_state.player;
    const screen_x = player.x - camera.x;
    const screen_y = player.y - camera.y;

    const sprite_player = game_state.assets?.sprites?.player;

    if (!sprite_player) {
        ctx.save();
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(screen_x, screen_y, player.width, player.height);
        ctx.restore();
        return;
    }

    const tile_size = game_state.map?.tile_size || 32;
    const action = player.state?.action || 'standing';

    // Supports both single string (state.direction) and array (state.directions)
    const active_dir = Array.isArray(player.state?.directions)
        ? player.state.directions[player.state.directions.length - 1]
        : player.state?.direction;

    if (active_dir) {
        last_direction = active_dir;
    }

    // 0: down, 1: up, 2: left, 3: right
    let sprite_index = 0;
    if (last_direction === 'down') sprite_index = 0;
    else if (last_direction === 'up') sprite_index = 1;
    else if (last_direction === 'left') sprite_index = 3;
    else if (last_direction === 'right') sprite_index = 2;

    const sx = sprite_index * tile_size;

    // Procedural step bounce and tilt for walking and running
    let bob_y = 0;
    let tilt_angle = 0;

    if (action === 'walking') {
        const wave = Math.sin(Date.now() / 110);
        bob_y = -Math.abs(wave) * 2.5;
        tilt_angle = wave * 0.05;
    } else if (action === 'running') {
        const wave = Math.sin(Date.now() / 65);
        bob_y = -Math.abs(wave) * 4;
        tilt_angle = wave * 0.09;
    }

    ctx.save();
    ctx.translate(
        screen_x + player.width / 2,
        screen_y + player.height / 2 + bob_y
    );
    ctx.rotate(tilt_angle);

    ctx.drawImage(
        sprite_player,
        sx, 0, tile_size, tile_size,
        -player.width / 2, -player.height / 2,
        player.width, player.height
    );

    ctx.restore();
}

export default player_drawer;

