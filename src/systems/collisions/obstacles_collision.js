import game_state from '../../game_state/game_state.js';
import check_tile_collision from './check_tile_collision.js';

/**
 * Verifica se a entidade vai colidir com qualquer bloco sólido em uma direção específica.
 * @param {Object} entity - A entidade na posição atual.
 * @param {string|null} direction - A direção para onde projetar o movimento ('left', 'right', 'up', 'down').
 * @returns {boolean} True se houver colisão, False se o caminho estiver limpo.
 */
function obstacles_collision(entity, direction = null) {
    const solids = game_state.solid_tiles;
    
    // 1. Faz uma cópia rasa e rápida para projetar o passo futuro na RAM
    const futureEntity = { ...entity };
    const velocity = entity.velocity || 0;

    // 2. Aplica a física analítica cirúrgica baseada no eixo passado pelo sensor
    if (direction === 'left')  futureEntity.x -= velocity;
    if (direction === 'right') futureEntity.x += velocity;
    if (direction === 'up')    futureEntity.y -= velocity;
    if (direction === 'down')  futureEntity.y += velocity;

    // 3. Varre os blocos cadastrados como obstáculos usando o seu filtro por extremos
    for (let i = 0; i < solids.length; i++) {
        const solid_type = solids[i];

        // Dispara o seu validador nativo nas quinas do corpo projetado
        if (check_tile_collision(futureEntity, solid_type)) {
            return true; // Bloqueio detectado síncronamente no frame!
        }
    }

    return false; // Caminho livre
}

export default obstacles_collision;

