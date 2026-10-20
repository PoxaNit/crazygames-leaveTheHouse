import game_state from '../../game_state/game_state.js';
import camera from '../../game_state/camera/camera.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function map_drawer() {
    const layout = game_state.map.layout;
    const tile_size = game_state.map.tile_size;

    const sprite_floor = game_state.assets?.sprites?.floor;
    const sprite_wall = game_state.assets?.sprites?.wall;
    const sprite_key = game_state.assets?.sprites?.key; // Sua imagem real da chave!

    // 🌟 TRAVA DE SEGURANÇA ASSÍNCRONA: Garante que os 3 blocos básicos estão carregados na RAM
    if (!sprite_floor || !sprite_wall || !sprite_key) return;

    for (let r = 0; r < game_state.map.rows; r++) {

        if (!layout[r]) continue;

        for (let c = 0; c < game_state.map.cols; c++) {
            const tile_type = layout[r][c];

            // Converte a posição real do mundo em pixels de tela baseados no olho da câmera
            const screen_x = (c * tile_size) - camera.x;
            const screen_y = (r * tile_size) - camera.y;

            // 1. Sempre desenha o chão de fundo para cobrir o Canvas
            ctx.drawImage(sprite_floor, screen_x, screen_y, tile_size, tile_size);

            // 2. Se o número for 1, carimba a textura da parede colonial por cima
            if (tile_type === 1) {
                ctx.drawImage(sprite_wall, screen_x, screen_y, tile_size, tile_size);
            }

            // 3. 🌟 SE O NÚMERO FOR 4: Desenha a imagem real da chave menor e centralizada!
            if (tile_type === 4) {
                // Você pode mudar esse tamanho (ex: de 12 para 16 ou 24) se quiser 
                // que a arte da sua chave apareça maior ou menor dentro do bloco de 32!
                const item_size = 16; 

                // Calcula o offset de centralização automático na tela
                const offset_center = (tile_size - item_size) / 2;

                // Carimba o PNG transparente da chave aplicando a câmera e centralizando!
                ctx.drawImage(
                    sprite_key, 
                    screen_x + offset_center, 
                    screen_y + offset_center, 
                    item_size, 
                    item_size
                );
            }
        }
    }
}

export default map_drawer;

