import get_around_obstacle from './get_around_obstacle.js';

function run_contextual_navigation (entity) {
/*
    if (entity.target_area.active) {

        let target_areaCenterX = entity.target_area.x + (entity.target_area.width / 2);
        let target_areaCenterY = entity.target_area.y + (entity.target_area.height / 2);

        let monsterCenterX = entity.x + (entity.width / 2);
        let monsterCenterY = entity.y + (entity.height / 2);

        let pace = entity.velocity;




        if (entity.state.action === 'walking' || entity.state.action === 'running') {
/*
            entity.getting_around_obstacle.left = false;
            entity.getting_around_obstacle.right = false;
            entity.getting_around_obstacle.up = false;
            entity.getting_around_obstacle.down = false;

            const recommended_direction = get_around_obstacle(entity); // verificar se o módulo está retornando o valor gravado
console.log('recommended_direction aós const =: ', recommended_direction)


            if (recommended_direction) {

                entity.getting_around_obstacle.active = true;

                if (recommended_direction === 'left') { //console.log('movimentação recomendada: left')

                    entity.getting_around_obstacle.left = true;

                    entity.getting_around_obstacle.saved_direction = 'left';
//console.log('recommended_direction:', recommended_direction, 'obstacle atual:', entity.getting_around_obstacle.obstacle)
//console.log('monster.y <= (obstacle.y + obstacle.height):', entity.y <= (entity.getting_around_obstacle.obstacle.y + entity.getting_around_obstacle.obstacle.height))
                    move_entity(entity, 'left');

                }

                else if (recommended_direction === 'right') { //console.log('movimentação recomendada: right')

                    entity.getting_around_obstacle.right = true;

                    entity.getting_around_obstacle.saved_direction = 'right';

                    move_entity(entity, 'right');

                }


                if (recommended_direction === 'up') { //console.log('movimentação recomendada: up')

                    entity.getting_around_obstacle.up = true;

                    entity.getting_around_obstacle.saved_direction = 'up';

                    move_entity(entity, 'up');

                }

                else if (recommended_direction === 'down') { //console.log('movimentação recomendada: down')

                    entity.getting_around_obstacle.down = true;

                    entity.getting_around_obstacle.saved_direction = 'down';

                    move_entity(entity, 'down');

                }

            } else {
/*
                entity.getting_around_obstacle.saved_direction = null;

                if (entity.getting_around_obstacle.active) { //console.log('else > if > obstacle.active. saved: ', entity.getting_around_obstacle.saved_direction)

                    const target_directions = target_area_directions(entity); // directions the taret area is in relation to the monster

                    const curr_ob = entity.getting_around_obstacle.obstacle;
//                  entity.getting_around_obstacle.saved_direction = null;
//console.log('target_directions: ', target_directions)
//console.log('curr_ob:', curr_ob)
//    para testar depois: if (curr_ob)


                    if (curr_ob) {

/*
                            entity.getting_around_obstacle.active = false;

                            entity.getting_around_obstacle.up = false;

                            entity.getting_around_obstacle.down = false;

                            entity.getting_around_obstacle.saved_direction = null;

                            entity.getting_around_obstacle.obstacle = null;



                    if (target_directions.includes('left')) {

                        if ((entity.x <= (curr_ob.x + curr_ob.width)) && (monsterCenterX >= (curr_ob.x + curr_ob.width)) && ((entity.target_area.x + entity.target_area.width) <= curr_ob.x)) {

                            entity.getting_around_obstacle.active = false;

                            entity.getting_around_obstacle.up = false;

                            entity.getting_around_obstacle.down = false;

                            entity.getting_around_obstacle.saved_direction = null;

                            entity.getting_around_obstacle.obstacle = null;

                        }

//                      if (((entity.y >= (curr_ob.y + curr_ob.height)) || ((entity.y + entity.height) <= curr_ob.y)) && ((entity.target_area.x + entity.target_area.width) <= curr_ob.x)) {


//                      }

                    }

                    else if (target_directions.includes('right')) {

                        if (((entity.x + entity.width) >= curr_ob.x) && (monsterCenterX <= curr_ob.x) && (entity.target_area.x >= (curr_ob.x + curr_ob.width))) {
//console.log('includes right executando...')
                            entity.getting_around_obstacle.active = false;

                            entity.getting_around_obstacle.up = false;

                            entity.getting_around_obstacle.down = false;

                            entity.getting_around_obstacle.saved_direction = null;

                            entity.getting_around_obstacle.obstacle = null;

                            entity.getting_around_obstacle.obstacle = null;

                        }

//                      if (((entity.y >= (curr_ob.y + curr_ob.height)) || ((entity.y + entity.height) <= curr_ob.y)) && (entity.target_area.x >= (curr_ob.x + curr_ob.width))) {


//                      }

                    }


                    if (target_directions.includes('up')) {

                        if (
                            (entity.y <= (curr_ob.y + curr_ob.height)) &&
                            (monsterCenterY >= (curr_ob.y + curr_ob.height)) &&
                            ((entity.target_area.y + entity.target_area.height) <= curr_ob.y)
                           )
                        {
console.log('includes up executando...')

                            entity.getting_around_obstacle.active = false;

                            entity.getting_around_obstacle.up = false;

                            entity.getting_around_obstacle.down = false;

                            entity.getting_around_obstacle.saved_direction = null;

                            entity.getting_around_obstacle.obstacle = null;

                        }

//                      if (((entity.x >= (curr_ob.x + curr_ob.width)) || ((entity.x + entity.width) <= curr_ob.x)) && ((entity.target_area.y + entity.target_area.height) <= curr_ob.y)) {


//                      }

                    }

                    else if (target_directions.includes('down')) {

                        if (((entity.y + entity.height) >= curr_ob.y) && (monsterCenterY <= curr_ob.y) && (entity.target_area.y >= (curr_ob.y + curr_ob.height))) {
//console.log('passou do topo da parede')
                            entity.getting_around_obstacle.active = false;

                            entity.getting_around_obstacle.up = false;

                            entity.getting_around_obstacle.down = false;

                            entity.getting_around_obstacle.saved_direction = null;

                            entity.getting_around_obstacle.obstacle = null;

                        }

//                      if (((entity.x >= (curr_ob.x + curr_ob.width)) || ((entity.x + entity.width) <= curr_ob.x)) && (entity.target_area.y <= (curr_ob.y + curr_ob.height))) {

//                      }

                    }

                    } else { console.log('sem curr_ob, caiu no else, resetando flags')

                        entity.getting_around_obstacle.active = false;

                        entity.getting_around_obstacle.left = false;

                        entity.getting_around_obstacle.right = false;

                        entity.getting_around_obstacle.up = false;

                        entity.getting_around_obstacle.down = false;

                        entity.getting_around_obstacle.saved_direction = null;

                    }

                } else { console.log('executando else (sem obstáculo). active: ', entity.getting_around_obstacle.active)

                    if (!entity.getting_around_obstacle.active) {

                        entity.getting_around_obstacle.left = false;

                        entity.getting_around_obstacle.right = false;

                        entity.getting_around_obstacle.up = false;

                        entity.getting_around_obstacle.down = false;

                        entity.getting_around_obstacle.saved_direction = null;

                    }

                }

            }
*/
}

export default run_contextual_navigation;
