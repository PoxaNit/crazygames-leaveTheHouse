import game_state from '../../game_state/game_state.js';
import entity_is_in_area from './entity_is_in_area.js';

function is_there_obstacle_in_the_way (entity) {
    if (!entity.target_area || !entity.target_area.active) return false;

    let entityCenterX = entity.x + (entity.width / 2);
    let entityCenterY = entity.y + (entity.height / 2);
    let target_areaCenterX = entity.target_area.x + (entity.target_area.width / 2);
    let target_areaCenterY = entity.target_area.y + (entity.target_area.height / 2);

    let direction;

    // Determina a direção principal do movimento olhando para os centros
    if (Math.abs(entityCenterX - target_areaCenterX) > Math.abs(entityCenterY - target_areaCenterY)) {
        direction = entityCenterX > target_areaCenterX ? 'left' : 'right';
    } else {
        direction = entityCenterY > target_areaCenterY ? 'up' : 'down';
    }

    return game_state.obstacles.some(ob => {
        // Coordenadas e dimensões da caixa de projeção (túnel de visão)
        let areaX, areaY, areaWidth, areaHeight;

        if (direction === 'left') {
            // O túnel começa no X do alvo e vai até o X da entidade. A altura é a da própria entidade.
            areaX = target_areaCenterX;
            areaY = entity.y;
            areaWidth = entity.x - target_areaCenterX;
            areaHeight = entity.height;
        }

        else if (direction === 'right') {
            // O túnel começa no limite direito da entidade e vai até o centro do alvo.
            areaX = entity.x + entity.width;
            areaY = entity.y;
            areaWidth = target_areaCenterX - areaX;
            areaHeight = entity.height;
        }

        else if (direction === 'up') {
            // O túnel começa no Y do alvo e vai até o topo da entidade. A largura é a da própria entidade.
            areaX = entity.x;
            areaY = target_areaCenterY;
            areaWidth = entity.width;
            areaHeight = entity.y - target_areaCenterY;
        }

        else if (direction === 'down') {
            // O túnel começa na base da entidade e vai até o centro do alvo.
            areaX = entity.x;
            areaY = entity.y + entity.height;
            areaWidth = entity.width;
            areaHeight = target_areaCenterY - areaY;
        }

        // Se por alguma oscilação de frame a distância calculada ficar negativa, corrige matematicamente
        if (areaWidth < 0) { areaX += areaWidth; areaWidth = Math.abs(areaWidth); }
        if (areaHeight < 0) { areaY += areaHeight; areaHeight = Math.abs(areaHeight); }

        // Testa se o obstáculo intercepta este túnel dimensionado com o tamanho do monstro
        return entity_is_in_area({ x: areaX, y: areaY, width: areaWidth, height: areaHeight }, ob.x, ob.y, ob.width, ob.height);
    });
}

export default is_there_obstacle_in_the_way;

