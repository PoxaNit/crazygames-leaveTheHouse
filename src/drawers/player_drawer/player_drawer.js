import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js'; // 🌟 IMPORTA A CÂMERA ISOLADA

function player_drawer () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 🧠 A REGRA ABSOLUTA DA INDÚSTRIA:
    // Transforma a coordenada real do mundo em pixels de tela descontando a janela da câmera!
    const screen_x = game_state.player.x - camera.x;
    const screen_y = game_state.player.y - camera.y;

    const w = game_state.player.width;
    const h = game_state.player.height;

    // Garante que o preenchimento seja de uma cor visível no chão (ex: vermelho ou branco)
    ctx.fillStyle = '#e74c3c'; 

    // Desenha na posição de tela correta (screen_x, screen_y) e com a ordem certa (w, h)!
    ctx.fillRect(screen_x, screen_y, w, h);
}

export default player_drawer;

