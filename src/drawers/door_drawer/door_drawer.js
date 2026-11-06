import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function door_drawer() {
    const layout = game_state.map.layout;
    const tile_size = game_state.map.tile_size;

    for (let r = 0; r < layout.length; r++) {
        if (!layout[r]) continue;

        for (let c = 0; c < layout[r].length; c++) {
            
            // 🌟 A TRAVA: Só processa e desenha se o tile for a porta trancada (ID 6)
            if (layout[r][c] === 6) {
                
                // Converte a posição real do mundo para pixels de tela baseados na câmera
                const screen_x = (c * tile_size) - camera.x;
                const screen_y = (r * tile_size) - camera.y;

                ctx.save();
                ctx.fillStyle = 'white';
                
                // Desenha o quadrado branco alinhado perfeitamente com o cenário
                ctx.fillRect(screen_x, screen_y, tile_size, tile_size);
                
                ctx.restore();
            }
        }
    }
}

export default door_drawer;

