import game_state from '../../game_state/game_state.js';

function get_collided_obstacle (entity) {
    return game_state.obstacles.find(ob => {
        return (entity.x + entity.width > ob.x &&
                entity.x < ob.x + ob.width &&
                entity.y + entity.height > ob.y &&
                entity.y < ob.y + ob.height);
    });
}

export default get_collided_obstacle;
