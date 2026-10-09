import game_state from '../../game_state/game_state.js';
import { find_path } from '../../game_state/find_path.js';

// Mapas voláteis em memória para gerenciar múltiplos caminhos e cooldowns de forma independente por entidade
let activePaths = new Map();
let cooldowns = new Map();

function update_next_move (entity) {
    // Se a entidade não tiver um alvo ativo configurado no estado, ignora o processamento
    if (!entity.target_area || !entity.target_area.active) return;

    // Inicializa os controles internos de histórico da entidade caso não existam
    if (!activePaths.has(entity)) activePaths.set(entity, []);
    if (!cooldowns.has(entity)) cooldowns.set(entity, 0);

    let entityActivePath = activePaths.get(entity);
    let pathfindingCooldown = cooldowns.get(entity);

    // Calcula os centros geométricos baseados nas dimensões e coordenadas atuais da entidade passada
    let entityCenterX = entity.x + (entity.width / 2);
    let entityCenterY = entity.y + (entity.height / 2);

    pathfindingCooldown++;

    // Verifica se alguma mecânica externa acabou de redefinir/limpar o target_area para o estado inicial ({})
    const isNextMoveEmpty = !entity.target_area.next_move || typeof entity.target_area.next_move.width === 'undefined';

    // Recalcula o A* a cada 20 frames, se o next_move foi limpo ou se o caminho atual terminou
    if (pathfindingCooldown >= 20 || isNextMoveEmpty || entityActivePath.length === 0) {
        pathfindingCooldown = 0;

        const pf = game_state.pathfinding;

        // Só executa se a malha de nós (grid) já tiver sido instanciada no motor de jogo
        if (pf && pf.grid) {
            // Converte a posição atual da entidade (pixels) em índices de nós da matriz do A*
            const startX = Math.floor(entityCenterX / pf.nodeSize);
            const startY = Math.floor(entityCenterY / pf.nodeSize);

            // Coleta as coordenadas e dimensões absolutas do Destino Final contido na target_area da entidade
            const finalTargetX = entity.target_area.x;
            const finalTargetY = entity.target_area.y;
            const finalTargetW = entity.target_area.width;
            const finalTargetH = entity.target_area.height;

            // Converte as coordenadas do Destino Final (pixels) em índices de nós da matriz do A*
            const targetX = Math.floor((finalTargetX + finalTargetW / 2) / pf.nodeSize);
            const targetY = Math.floor((finalTargetY + finalTargetH / 2) / pf.nodeSize);

            // Valida se os índices estão dentro das fronteiras da matriz antes de invocar a busca
            if (pf.grid[startX]?.[startY] && pf.grid[targetX]?.[targetY]) {
                let newPath = find_path(pf.grid, pf.grid[startX][startY], pf.grid[targetX][targetY]);

                // Remove o primeiro nó da lista caso a entidade já se encontre pisando nele neste frame
                if (newPath.length > 0 && newPath[0].x === startX && newPath[0].y === startY) {
                    newPath.shift();
                }
                entityActivePath = newPath;
                activePaths.set(entity, newPath);
            }
        }
    }
    cooldowns.set(entity, pathfindingCooldown);

    // Avalia se o campo intermediário next_move está pronto para receber novas diretrizes de movimento
    const isNextMoveInactive = !entity.target_area.next_move || !entity.target_area.next_move.width;

    if (entityActivePath.length > 0 && isNextMoveInactive) {
        const nextNode = entityActivePath[0];
        const pf = game_state.pathfinding;

        // Transforma a posição do nó lógico de volta em pixels e atualiza as dimensões do next_move no estado global
        entity.target_area.next_move = {
            x: nextNode.x * pf.nodeSize,
            y: nextNode.y * pf.nodeSize,
            width: pf.nodeSize,
            height: pf.nodeSize
        };
    }

console.log('monster: ', entity.x, entity.y)
console.log('target: ', entity.target_area.x, entity.target_area.y)
console.log('next move: ', entity.target_area.next_move.x, entity.target_area.next_move.y)
}

// Expõe um utilitário para limpar caminhos antigos caso a entidade precise teleportar ou mudar de alvo bruscamente
function public_clear_path(entity) {
    activePaths.delete(entity);
    cooldowns.delete(entity);
}

export { public_clear_path as clear_entity_path };
export default update_next_move;

