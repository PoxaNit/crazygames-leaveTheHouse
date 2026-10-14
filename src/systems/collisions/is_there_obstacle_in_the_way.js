import game_state from '../../game_state/game_state.js';
import entity_is_in_area from './entity_is_in_area.js';
import get_collided_obstacle from './get_collided_obstacle.js';
import target_area_directions from '../../systems/movement/target_area_directions.js';

function is_there_obstacle_in_the_way (entity) {
    if (!entity.target_area || !entity.target_area.active) return false;

    let entityCenterX = entity.x + (entity.width / 2);
    let entityCenterY = entity.y + (entity.height / 2);
    let target_areaCenterX = entity.target_area.x + (entity.target_area.width / 2);
    let target_areaCenterY = entity.target_area.y + (entity.target_area.height / 2);

    let directions = target_area_directions(entity);


    const collided_ob = get_collided_obstacle(entity);

    if (collided_ob) {

        if (directions.includes('left')) {

	    if (((((entity.y + entity.height) <= collided_ob.y) || (entity.y >= (collided_ob.y + collided_ob.height)))) && ((entity.target_area.x + entity.target_area.width) <= collided_ob.x)) return null;

        }

        else if (directions.includes('right')) {console.log('dentro de right')
	    if ((((entity.y + entity.height) <= collided_ob.y) || (entity.y >= (collided_ob.y + collided_ob.height))) && (entity.target_area.x >= (collided_ob.x + collided_ob.width)))
		return null;

        }

        if (directions.includes('up')) {
	    if ((((entity.x + entity.width) <= collided_ob.x) || (entity.x >= (collided_ob.x + collided_ob.width))) && ((entity.target_area.y + entity.target_area.height) <= collided_ob.y)) return null;

        }

        else if (directions.includes('down')) {
	    if ((((entity.x + entity.width) <= collided_ob.x) || (entity.x >= (collided_ob.x + collided_ob.width))) && (entity.target_area.y >= (collided_ob.y + collided_ob.height))) return null;

        }


	return collided_ob;

    }


    return game_state.obstacles.find(ob => {
        // Coordenadas e dimensões da caixa de projeção (túnel de visão)
        let areaX, areaY, areaWidth, areaHeight;

        if (directions.includes('left')) {

            // O túnel começa no X do alvo e vai até o X da entidade. A altura é a da própria entidade.
            areaX = target_areaCenterX;
            areaY = entity.y - entity.velocity;
            areaWidth = entity.x - target_areaCenterX;
            areaHeight = entity.height + (entity.velocity * 2);
        }

        else if (directions.includes('right')) {

            // O túnel começa no limite direito da entidade e vai até o centro do alvo.
            areaX = entity.x + entity.width;
            areaY = entity.y - entity.velocity;
            areaWidth = target_areaCenterX - areaX;
            areaHeight = entity.height + (entity.velocity * 2);
        }

        // Se por alguma oscilação de frame a distância calculada ficar negativa, corrige matematicamente
        if (areaWidth < 0) { areaX += areaWidth; areaWidth = Math.abs(areaWidth); }
        if (areaHeight < 0) { areaY += areaHeight; areaHeight = Math.abs(areaHeight); }

        // Testa se o obstáculo intercepta este túnel dimensionado com o tamanho do monstro
        let  result = entity_is_in_area({ x: areaX, y: areaY, width: areaWidth, height: areaHeight }, ob.x, ob.y, ob.width, ob.height);

	if (result) return result;

        if (directions.includes('up')) {

            // O túnel começa no Y do alvo e vai até o topo da entidade. A largura é a da própria entidade.
            areaX = entity.x - entity.velocity;
            areaY = target_areaCenterY;
            areaWidth = entity.width + (entity.velocity * 2);
            areaHeight = entity.y - target_areaCenterY;
        }

        else if (directions.includes('down')) {

            // O túnel começa na base da entidade e vai até o centro do alvo.
            areaX = entity.x - entity.velocity;
            areaY = entity.y + entity.height;
            areaWidth = entity.width + (entity.velocity * 2);
            areaHeight = target_areaCenterY - areaY;
        }


        if (areaWidth < 0) { areaX += areaWidth; areaWidth = Math.abs(areaWidth); }
        if (areaHeight < 0) { areaY += areaHeight; areaHeight = Math.abs(areaHeight); }

        result = entity_is_in_area({ x: areaX, y: areaY, width: areaWidth, height: areaHeight }, ob.x, ob.y, ob.width, ob.height);

	if (result) return result;

	return false;

    });
}

export default is_there_obstacle_in_the_way;

