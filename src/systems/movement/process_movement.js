//import run_contextual_navigation from './run_contextual_navigation.js';
import run_pathfinding from './run_pathfinding.js';

function process_movement (entity) {

    if (!entity.target_area || !entity.target_area.active) return;

    if (entity.movement_type === 'pathfinding') run_pathfinding(entity);

  //  else if (entity.movement_type === 'contextual_navigation') run_contextual_navigation(entity);

}

export default process_movement;
