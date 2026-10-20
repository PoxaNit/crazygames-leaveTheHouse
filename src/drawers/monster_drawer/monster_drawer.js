import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js'; // 🌟 IMPORTA A CÂMERA ISOLADA

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function monster_drawer () {
    const x = game_state.monster.x;
    const y = game_state.monster.y;
    const w = game_state.monster.width;
    const h = game_state.monster.height;

    // 🧠 A REGRA DE OURO DA CÂMERA:
    // Converte a posição real do monstro no mundo em pixels de tela baseados no olho da câmera!
    const screen_x = x - camera.x;
    const screen_y = y - camera.y;

    ctx.save();

    // Vamos mudar temporariamente para roxo ou laranja para você não confundir com o jogador!
    ctx.fillStyle = '#9b59b6'; // Roxo Assustador

    // Desenha na posição de tela corrigida (screen_x, screen_y)
    ctx.fillRect(screen_x, screen_y, w, h);

    ctx.restore();
}

export default monster_drawer;

