import game_state from '../../game_state/game_state.js';
import is_there_obstacle_in_the_way from '../collisions/is_there_obstacle_in_the_way.js';
import target_area_directions from './target_area_directions.js';
import get_tile_at_position from '../collisions/get_tile_at_position.js';
import get_tile_position from '../collisions/get_tile_position.js';

function get_around_obstacle(entity) {
    const tile_size = game_state.map.tile_size;
    const directions = target_area_directions(entity);
console.log('entity, right after function executes:', entity)
    // ----------------------------------------------------
    // HORIZONTAL BARRIERS (Left / Right) -> Evade Up or Down
    // ----------------------------------------------------

    if (directions.includes('left')) {
        const ob = is_there_obstacle_in_the_way(entity, 'left');

	let must_execute_rest = true;

	if (entity.getting_around_obstacle.up) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.up = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if ((entity.y + entity.height) <= entity.getting_around_obstacle.obstacle.y) {

		    entity.getting_around_obstacle.up = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	} else if (entity.getting_around_obstacle.down) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.down = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if (entity.y >= (entity.getting_around_obstacle.obstacle.y + entity.getting_around_obstacle.obstacle.height)) {

		    entity.getting_around_obstacle.down = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	}


        if (ob && must_execute_rest) {

	    const layout = game_state.map.layout;


	    let up_side_blocks_count = 0;

	    let down_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_up_right_block_row;

	    let last_down_right_block_row;


	    let last_up_left_block_col;

	    let last_down_left_block_col;


	    let structure_width_up = 0;
	    let structure_width_down = 0;
	    let structure_height_left = 0;
	    let structure_height_right = -1;


	    // calculating up way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i--) {

		up_side_blocks_count++;

		last_up_right_block_row = i;

		structure_height_right++;

	    }

	    // calculating down way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i++) {

		down_side_blocks_count++;

		last_down_right_block_row = i;

		structure_height_right++;

	    }



	    if (last_up_right_block_row && last_down_right_block_row) {

	    // calculating up right to up left
	        for (let c = ob.col; layout[last_up_right_block_row][c] === 1; c--) {

		    up_side_blocks_count++;

		    last_up_left_block_col = c;

		    structure_width_up++;


	        }


	    // calculating down right to down left
	        for (let c = ob.col; layout[last_down_right_block_row][c] === 1; c--) {

		    down_side_blocks_count++;

		    last_down_left_block_col = c;

		    structure_width_down++;

	        }

	    }

	    if (last_up_left_block_col && last_down_left_block_col) {

		if (last_up_left_block_col !== ob.col) {

		    let count = 0;

	            for (let i = last_up_right_block_row + 1; layout[i][last_up_left_block_col] === 1; i++) {

			up_side_blocks_count++;

			count++;

		        if (count > structure_height_left) structure_height_left++;

		    }

		}

		if (last_down_left_block_col !== ob.col) {

		    let count = 0;

	            for (let i = last_down_right_block_row - 1; layout[i][last_down_left_block_col] === 1; i--) {

			down_side_blocks_count++;

			count++;

		        if (count > structure_height_left) structure_height_left++;

		    }

		}


		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.row >= last_up_right_block_row) &&
						    (target_pos.row <= last_down_right_block_row) &&
						    ((target_pos.col >= last_down_left_block_col) ||
						    (target_pos.col >= last_up_left_block_col))
						   );

		const correct_direction = up_side_blocks_count < down_side_blocks_count ? 'up' : 'down';

		if (target_is_inside_structure) {

		    entity.getting_around_obstacle.action_type = 'seeking_entry';
		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.left = true;

		    if (correct_direction === 'up') entity.getting_around_obstacle.saved_direction = 'up';

		    else if (correct_direction === 'down') entity.getting_around_obstacle.saved_direction = 'down';


		    return correct_direction;

		}

		else {

		    const tile_pos = get_tile_position(last_up_right_block_row, last_down_left_block_col);

		    const w = structure_width_up > structure_width_down ? structure_width_up * 32 : structure_width_down * 32;

		    const h = structure_height_left > structure_height_right ? structure_height_left * 32: structure_height_right * 32;

		    entity.getting_around_obstacle.obstacle = {x: tile_pos.x, y: tile_pos.y, width: w, height: h};



		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.action_type = 'contouring_perimeter';
		    entity.getting_around_obstacle.left = true;


		    if (correct_direction === 'up') entity.getting_around_obstacle.saved_direction = 'up';

		    else if (correct_direction === 'down') entity.getting_around_obstacle.saved_direction = 'down';

		    return correct_direction;

		}

	    }

	}

    }

    else if (directions.includes('right')) { //console.log('right direction >')

        const ob = is_there_obstacle_in_the_way(entity, 'right');

	let must_execute_rest = true;

	if (entity.getting_around_obstacle.up) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.up = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if ((entity.y + entity.height) <= entity.getting_around_obstacle.obstacle.y) {

		    entity.getting_around_obstacle.up = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	} else if (entity.getting_around_obstacle.down) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.down = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if (entity.y >= (entity.getting_around_obstacle.obstacle.y + entity.getting_around_obstacle.obstacle.height)) {

		    entity.getting_around_obstacle.down = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	}



        if (ob && must_execute_rest) {
//console.log('executando bloco right...')
	    const layout = game_state.map.layout;


	    let up_side_blocks_count = 0;

	    let down_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_up_left_block_row;

	    let last_down_left_block_row;


	    let last_up_right_block_col;

	    let last_down_right_block_col;


	    let structure_width_up = 0;

	    let structure_width_down = 0;

	    let structure_height_left = -1;

	    let structure_height_right = 0;



	    // calculating up way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i--) {

		up_side_blocks_count++;

		last_up_left_block_row = i;

		structure_height_left++;

	    }

	    // calculating down way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i++) {

		down_side_blocks_count++;

		last_down_left_block_row = i;

		structure_height_left++;

	    }


	    if (last_up_left_block_row && last_down_left_block_row) {

	    // calculating up left to up right
	        for (let c = ob.col; layout[last_up_left_block_row][c] === 1; c++) {

		    up_side_blocks_count++;

		    last_up_right_block_col = c;

		    structure_width_up++;

	        }


	    // calculating down left to down right
	        for (let c = ob.col; layout[last_down_left_block_row][c] === 1; c++) {

		    down_side_blocks_count++;

		    last_down_right_block_col = c;

		    structure_width_down++;

	        }

	    }

	    if (last_up_right_block_col && last_down_right_block_col) {

		if (last_up_right_block_col !== ob.col) {

		    let count = 0;

		    // calculating right up to right down
	            for (let i = last_up_left_block_row + 1; layout[i][last_up_right_block_col] === 1; i++) {

			up_side_blocks_count++;

			count++;

			if (count > structure_height_right) structure_height_right++;

		    }

		}

		if (last_down_right_block_col !== ob.col) {

		    let count = 0;

	            for (let i = last_down_left_block_row - 1; layout[i][last_down_right_block_col] === 1; i--) {

			down_side_blocks_count++;

			count++;

			if (count > structure_height_right) structure_height_right++;

		    }

		}

		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.row >= last_up_left_block_row) &&
						    (target_pos.row <= last_down_left_block_row) &&
						    ((target_pos.col <= last_down_right_block_col) ||
						    (target_pos.col <= last_up_right_block_col))
						   );

//	console.log('directions tem down:', directions.includes('down'))


		let correct_direction;

		if (up_side_blocks_count === down_side_blocks_count) {console.log('ambos lados têm número de blocos iguais');correct_direction = directions.includes('down') ? 'down' : 'up';}

		else {console.log('blocos não iguais');correct_direction = up_side_blocks_count < down_side_blocks_count ? 'up' : 'down';}

console.log('correct_direction:', correct_direction, 'up_side_blocks_count:', up_side_blocks_count, 'down_side_blocks_count:', down_side_blocks_count)
		if (target_is_inside_structure) {

		    entity.getting_around_obstacle.action_type = 'seeking_entry';
		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.right = true;

		    if (correct_direction === 'up') entity.getting_around_obstacle.saved_direction = 'up';

		    else if (correct_direction === 'down') entity.getting_around_obstacle.saved_direction = 'down';


		    return correct_direction;

		}

		else {

		    const tile_pos = get_tile_position(last_up_left_block_row, last_down_right_block_col);

		    const w = structure_width_up > structure_width_down ? structure_width_up * 32 : structure_width_down * 32;

		    const h = structure_height_left > structure_height_right ? structure_height_left * 32: structure_height_right * 32;

		    entity.getting_around_obstacle.obstacle = {x: tile_pos.x, y: tile_pos.y, width: w, height: h};



		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.action_type = 'contouring_perimeter';
		    entity.getting_around_obstacle.right = true;


		    if (correct_direction === 'up') entity.getting_around_obstacle.saved_direction = 'up';

		    else if (correct_direction === 'down') entity.getting_around_obstacle.saved_direction = 'down';

		    return correct_direction;

		}

	    }

	}

    }


    if (directions.includes('up')) {
        const ob = is_there_obstacle_in_the_way(entity, 'up');

	let must_execute_rest = true;

	if (entity.getting_around_obstacle.left) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.left = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if ((entity.x + entity.width) <= entity.getting_around_obstacle.obstacle.x) {

		    entity.getting_around_obstacle.left = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	} else if (entity.getting_around_obstacle.right) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.right = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if (entity.x >= (entity.getting_around_obstacle.obstacle.x + entity.getting_around_obstacle.obstacle.width)) {

		    entity.getting_around_obstacle.right = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	}



        if (ob && must_execute_rest) {

	    const layout = game_state.map.layout;


	    let left_side_blocks_count = 0;

	    let right_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_left_down_block_col;

	    let last_right_down_block_col;


	    let last_left_up_block_row;

	    let last_right_up_block_row;


	    let structure_width_up = 0;

	    let structure_width_down = -1;

	    let structure_height_left = 0;

	    let structure_height_right = 0;

	    // calculating left side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i--) {

		left_side_blocks_count++;
//console.log('primeiro loop: left_side_blocks_count:', left_side_blocks_count)
		last_left_down_block_col = i;

		structure_width_down++;
	    }

	    // calculating right side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i++) {

		right_side_blocks_count++;

		last_right_down_block_col = i;

		structure_width_down++;

	    }


	    if (last_left_down_block_col && last_right_down_block_col) {

	        // calculating down left to up left
	        for (let r = ob.row; layout[r][last_left_down_block_col] === 1; r--) {

		    left_side_blocks_count++;
//console.log('segundo loop: left_side_blocks_count:', left_side_blocks_count)
		    last_left_up_block_row = r;

		    structure_height_left++;

	        }


	        // calculating down right to up right
	        for (let r = ob.row; layout[r][last_right_down_block_col] === 1; r--) {

		    right_side_blocks_count++;

		    last_right_up_block_row = r;

		    structure_height_right++;

	        }

	    }

	    if (last_left_up_block_row && last_right_up_block_row) {

		if ((last_left_up_block_row !== ob.row)) {

		    let count = 0;

		    for (let i = last_left_down_block_col + 1; layout[last_left_up_block_row][i] === 1; i++) {

			left_side_blocks_count++;

			count++;

			if (count > structure_width_up) structure_width_up++;

		    }

		}

		if ((last_right_up_block_row !== ob.row)) {

		    let count = 0;

		    for (let i = last_right_down_block_col - 1; layout[last_right_up_block_row][i] === 1; i--) {

			right_side_blocks_count++;

			count++;

			if (count > structure_width_up) structure_width_up++;

		    }

		}

		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.col >= last_left_down_block_col) &&
						    (target_pos.col <= last_right_down_block_col) &&
						    ((target_pos.row >= last_right_up_block_row) ||
						    (target_pos.row >= last_left_up_block_row))
						   );

		const correct_direction = left_side_blocks_count < right_side_blocks_count ? 'left' : 'right';

		if (target_is_inside_structure) {

		    entity.getting_around_obstacle.action_type = 'seeking_entry';
		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.up = true;

		    if (correct_direction === 'left') entity.getting_around_obstacle.saved_direction = 'left';

		    else if (correct_direction === 'right') entity.getting_around_obstacle.saved_direction = 'right';


		    return correct_direction;

		}

		else {

		    const tile_pos = get_tile_position(last_left_up_block_row, last_left_down_block_col);

		    const w = structure_width_up > structure_width_down ? structure_width_up * 32 : structure_width_up * 32;

		    const h = structure_height_left > structure_height_right ? structure_height_left * 32: structure_height_right * 32;

		    entity.getting_around_obstacle.obstacle = {x: tile_pos.x, y: tile_pos.y, width: w, height: h};



		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.action_type = 'contouring_perimeter';
		    entity.getting_around_obstacle.up = true;


		    if (correct_direction === 'left') entity.getting_around_obstacle.saved_direction = 'left';

		    else if (correct_direction === 'right') entity.getting_around_obstacle.saved_direction = 'right';

		    return correct_direction;

		}

	    }

        }

    }

    else if (directions.includes('down')) {

        const ob = is_there_obstacle_in_the_way(entity, 'down');

	let must_execute_rest = true;

	if (entity.getting_around_obstacle.left) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.left = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if ((entity.x + entity.width) <= entity.getting_around_obstacle.obstacle.x) {

		    entity.getting_around_obstacle.left = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	} else if (entity.getting_around_obstacle.right) {

	    if (entity.getting_around_obstacle.action_type === 'seeking_entry') {

		if (!ob) {

		    entity.getting_around_obstacle.right = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

		}

	    }

	    else if (entity.getting_around_obstacle.action_type === 'contouring_perimeter') {

		if (!ob) must_execute_rest = false;

	        if (entity.x >= (entity.getting_around_obstacle.obstacle.x + entity.getting_around_obstacle.obstacle.width)) {

		    entity.getting_around_obstacle.right = false;

		    entity.getting_around_obstacle.action_type = null;

		    entity.getting_around_obstacle.obstacle = {x: null, y: null, width: null, height: null};

		    entity.getting_around_obstacle.saved_direction = null;

	        }

	    }

	}




        if (ob && must_execute_rest) {
console.log('there is ob')
	    const layout = game_state.map.layout;


	    let left_side_blocks_count = 0;

	    let right_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_left_up_block_col;

	    let last_right_up_block_col;


	    let last_left_down_block_row;

	    let last_right_down_block_row;



	    let structure_width_up = -1; // will be added the two directions of the wall

	    let structure_width_down = 0;

	    let structure_height_left = 0;

	    let structure_height_right = 0;

	    // calculating left side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i--) {

		left_side_blocks_count++;

		last_left_up_block_col = i;

		structure_width_up++;
	    }

	    // calculating right side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i++) {

		right_side_blocks_count++;

		last_right_up_block_col = i;

		structure_width_up++;

	    }


	    if (last_left_up_block_col && last_right_up_block_col) {

	        // calculating down left to up left
	        for (let r = ob.row; layout[r][last_left_up_block_col] === 1; r++) {

		    left_side_blocks_count++;

		    last_left_down_block_row = r;

		    structure_height_left++;

	        }


	    // calculating down right to up right
	        for (let r = ob.row; layout[r][last_right_up_block_col] === 1; r++) {

		    right_side_blocks_count++;

		    last_right_down_block_row = r;

		    structure_height_right++;

	        }

	    }


	    if (last_left_down_block_row && last_right_down_block_row) {

		if (last_left_down_block_row !== ob.row) {

		    let count = 0;

	            for (let i = last_left_up_block_col + 1; layout[last_left_down_block_row][i] === 1; i++) {

			left_side_blocks_count++;

			count++;

			if (count > structure_width_down) structure_width_down++;

		    }

		}

		if (last_right_down_block_row !== ob.row) {

		    let count = 0;

	            for (let i = last_right_up_block_col - 1; layout[last_right_down_block_row][i] === 1; i--) {

			right_side_blocks_count++;

			count++;

			if (count > structure_width_down) structure_width_down++;

		    }

		}


		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.col >= last_left_up_block_col) &&
						    (target_pos.col <= last_right_up_block_col) &&
						    ((target_pos.row <= last_right_down_block_row) ||
						    (target_pos.row <= last_left_down_block_row))
						   );

		const correct_direction = left_side_blocks_count < right_side_blocks_count ? 'left' : 'right';

		if (target_is_inside_structure) {
console.log('target is inside structure')
		    entity.getting_around_obstacle.action_type = 'seeking_entry';
		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.down = true;

		    if (correct_direction === 'left') entity.getting_around_obstacle.saved_direction = 'left';

		    else if (correct_direction === 'right') entity.getting_around_obstacle.saved_direction = 'right';


		    return correct_direction;

		} else {
console.log('target is outside structure')

		    const tile_pos = get_tile_position(ob.row, last_left_up_block_col);

		    const w = structure_width_up > structure_width_down ? structure_width_up * 32 : structure_width_down * 32;

		    const h = structure_height_left > structure_height_right ? structure_height_left * 32: structure_height_right * 32;

		    entity.getting_around_obstacle.obstacle = {x: tile_pos.x, y: tile_pos.y, width: w, height: h};
console.log('entity after assignment:', entity)

		    entity.getting_around_obstacle.action_type = 'contouring_perimeter';
		    entity.getting_around_obstacle.active = true;
		    entity.getting_around_obstacle.down = true;


		    if (correct_direction === 'left') entity.getting_around_obstacle.saved_direction = 'left';

		    else if (correct_direction === 'right') entity.getting_around_obstacle.saved_direction = 'right';

		    return correct_direction;

		}

	    }

        }

    }

    return null; // No obstacles blocking the intention, keep natural alignment flow

}

export default get_around_obstacle;
