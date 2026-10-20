import camera from '../../game_state/camera/camera.js';
import game_state from '../../game_state/game_state.js';

function update_camera() {
    const player = game_state.player;

    if (!player) return;

    // 1. Calcula a posição ideal de centralização baseada no jogador
    let target_x = (player.x + player.width / 2) - (camera.width / 2);
    let target_y = (player.y + player.height / 2) - (camera.height / 2);

    // 2. Resgata o tamanho dos blocos da sua nova refatoração de mapa
    const tile_size = game_state.map.tile_size;
    const mapa_largura_pixels = game_state.map.cols * tile_size; // 30 * 32 = 960
    const mapa_altura_pixels = game_state.map.rows * tile_size;  // 17 * 32 = 544

    // 3. 🌟 AS TRAVAS DE SEGURANÇA (Clamping)
    // Math.max(0, ...) impede que a câmera fique negativa nos cantos esquerdo/topo!
    // Math.min(..., limite) impede que a câmera mostre o preto do vácuo além do fim do mapa!
    camera.x = Math.max(0, Math.min(target_x, mapa_largura_pixels - camera.width));
    camera.y = Math.max(0, Math.min(target_y, mapa_altura_pixels - camera.height));
}

export default update_camera;

