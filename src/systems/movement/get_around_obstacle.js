import game_state from '../../game_state/game_state.js';
import is_there_obstacle_in_the_way from '../collisions/is_there_obstacle_in_the_way.js';
import target_area_directions from './target_area_directions.js';
import get_tile_at_position from '../collisions/get_tile_at_position.js';

function get_around_obstacle(entity) {
    const tile_size = game_state.map.tile_size;
    const directions = target_area_directions(entity);

    // ----------------------------------------------------
    // HORIZONTAL BARRIERS (Left / Right) -> Evade Up or Down
    // ----------------------------------------------------
    if (directions.includes('left')) {
        const ob = is_there_obstacle_in_the_way(entity, 'left');
        if (ob) {

	    const layout = game_state.map.layout;


	    let up_side_blocks_count = 0;

	    let down_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_up_right_block_row;

	    let last_down_right_block_row;


	    let last_up_left_block_col;

	    let last_down_left_block_col;


	    // calculating up way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i--) {

		up_side_blocks_count++;

		last_up_right_block_row = i;

	    }

	    // calculating down way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i++) {

		down_side_blocks_count++;

		last_down_right_block_row = i;

	    }



	    if (last_up_right_block_row && last_down_right_block_row) {

	    // calculating up right to up left
	    for (let c = ob.col; layout[last_up_right_block_row][c] === 1; c--) {

		up_side_blocks_count++;

		last_up_left_block_col = c;

	    }


	    // calculating down right to down left
	    for (let c = ob.col; layout[last_down_right_block_row][c] === 1; c--) {

		down_side_blocks_count++;

		last_down_left_block_col = c;

	    }

	    }

	    if (last_up_left_block_col && last_down_left_block_col) {

	        for (let i = last_up_right_block_row + 1; layout[i][last_up_left_block_col] === 1; i++) up_side_blocks_count++;

	        for (let i = last_down_right_block_row - 1; layout[i][last_down_left_block_col] === 1; i--) down_side_blocks_count++;


		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.row > last_up_right_block_row) &&
						    (target_pos.row < last_down_right_block_row) &&
						    (target_pos.col > last_down_left_block_col)
						   );

		if (target_is_inside_structure) return up_side_blocks_count < down_side_blocks_count ? 'up' : 'down';

		else {

		}

	    }

	}

    }

    else if (directions.includes('right')) {
        const ob = is_there_obstacle_in_the_way(entity, 'right');
        if (ob) {


	    const layout = game_state.map.layout;


	    let up_side_blocks_count = 0;

	    let down_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_up_left_block_row;

	    let last_down_left_block_row;


	    let last_up_right_block_col;

	    let last_down_right_block_col;

	    // calculating up way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i--) {

		up_side_blocks_count++;

		last_up_left_block_row = i;

	    }

	    // calculating down way tiles
	    for (let i = ob.row; layout[i][ob.col] === 1; i++) {

		down_side_blocks_count++;

		last_down_left_block_row = i;

	    }


	    if (last_up_left_block_row && last_down_left_block_row) {

	    // calculating up left to up right
	    for (let c = ob.col; layout[last_up_left_block_row][c] === 1; c++) {

		up_side_blocks_count++;

		last_up_right_block_col = c;

	    }


	    // calculating down left to down right
	    for (let c = ob.col; layout[last_down_left_block_row][c] === 1; c++) {

		down_side_blocks_count++;

		last_down_right_block_col = c;

	    }

	    }

	    if (last_up_right_block_col && last_down_right_block_col) {

	        for (let i = last_up_left_block_row + 1; layout[i][last_up_right_block_col] === 1; i++) up_side_blocks_count++;

	        for (let i = last_down_left_block_row - 1; layout[i][last_down_right_block_col] === 1; i--) down_side_blocks_count++;


		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.row > last_up_left_block_row) &&
						    (target_pos.row < last_down_left_block_row) &&
						    ((target_pos.col < last_down_right_block_col) ||
						    (target_pos.col < last_up_right_block_col))
						   );

		if (target_is_inside_structure) return up_side_blocks_count < down_side_blocks_count ? 'up' : 'down';

		else {

		}

	    }


	}

    }

    // ----------------------------------------------------
    if (directions.includes('up')) {
        const ob = is_there_obstacle_in_the_way(entity, 'up');
        if (ob) {

	    const layout = game_state.map.layout;


	    let left_side_blocks_count = 0;

	    let right_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_left_down_block_col;

	    let last_right_down_block_col;


	    let last_left_up_block_row;

	    let last_right_up_block_row;

	    // calculating left side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i--) {

		left_side_blocks_count++;

		last_left_down_block_col = i;

	    }

	    // calculating right side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i++) {

		right_side_blocks_count++;

		last_right_down_block_col = i;

	    }



	    if (last_left_down_block_col && last_right_down_block_col) {

	    // calculating down left to up left
	    for (let r = ob.row; layout[r][last_left_down_block_col] === 1; r--) {

		left_side_blocks_count++;

		last_left_up_block_row = r;

	    }


	    // calculating down left to up left
	    for (let r = ob.row; layout[r][last_right_down_block_col] === 1; r++) {

		right_side_blocks_count++;

		last_right_up_block_row = r;

	    }

	    }

	    if (last_left_up_block_row && last_right_up_block_row) {

	        for (let i = last_left_down_block_col + 1; layout[last_left_up_block_row][i] === 1; i++) left_side_blocks_count++;

	        for (let i = last_right_down_block_col - 1; layout[last_right_up_block_row][i] === 1; i--) right_side_blocks_count++;

/*
		const target_pos = get_tile_at_position(entity.target_area.x, entity.target_area.y);

		const target_is_inside_structure = (
						    (target_pos.row > last_up_left_block_row) &&
						    (target_pos.row < last_down_left_block_row) &&
						    ((target_pos.col < last_down_right_block_col) ||
						    (target_pos.col < last_up_right_block_col))
						   );

		if (target_is_inside_structure) return up_side_blocks_count < down_side_blocks_count ? 'up' : 'down';

		else {

		}
*/
	    }

	    return left_side_blocks_count < right_side_blocks_count ? 'left' : 'right';


        }

    }

    else if (directions.includes('down')) {
        const ob = /*is_there_obstacle_in_the_way(entity, 'down')*/null;
        if (ob) {

	    const layout = game_state.map.layout;


	    let left_side_blocks_count = 0;

	    let right_side_blocks_count = 0;


	    // last blocks to mark the end of the wall
	    let last_left_up_block_col;

	    let last_right_up_block_col;


	    let last_left_down_block_row;

	    let last_right_down_block_row;

	    // calculating left side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i--) {

		left_side_blocks_count++;

		last_left_up_block_col = i;

	    }

	    // calculating right side tiles
	    for (let i = ob.col; layout[ob.row][i] === 1; i++) {

		right_side_blocks_count++;

		last_right_up_block_col = i;

	    }


	    if (last_left_up_block_col && last_right_up_block_col) {

	    // calculating down left to up left
	    for (let r = ob.row; layout[r][last_left_up_block_col] === 1; r++) {

		left_side_blocks_count++;

		last_left_down_block_row = r;

	    }


	    // calculating down right to up right
	    for (let r = ob.row; layout[r][last_right_up_block_col] === 1; r++) {

		right_side_blocks_count++;

		last_right_down_block_row = r;

	    }

	    }


	    if (last_left_down_block_row && last_right_down_block_row) {

	        for (let i = last_left_up_block_col + 1; layout[last_left_down_block_row][i] === 1; i++) left_side_blocks_count++;

	        for (let i = last_right_up_block_col - 1; layout[last_right_down_block_row][i] === 1; i--) right_side_blocks_count++;

	    }

	    return left_side_blocks_count < right_side_blocks_count ? 'left' : 'right';

        }

    }

    return null; // No obstacles blocking the intention, keep natural alignment flow
}

export default get_around_obstacle;
