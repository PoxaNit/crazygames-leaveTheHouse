import game_state from '../../game_state/game_state.js';
import patrol_tile_monster_is_in from '../../systems/patrolling/patrol_tile_monster_is_in.js';
import patrol_tiles_monster_is_not_in from '../../systems/patrolling/patrol_tiles_monster_is_not_in.js';
import get_tile_position from '../../systems/collisions/get_tile_position.js';

const game_message = document.getElementById('game_message');

function patrol_areas () {

    // Se o monstro não estiver em tarefa de patrulha, interrompe o script imediatamente
    if (game_state.monster.state.task !== 'patrolling') return;

    let layout = game_state.map.layout;
    let tile_size = game_state.map.tile_size;

    if (!game_state.monster.patrol_tiles) {

	let patrol_tiles = [];

	for (let r = 0; r < layout.length; r++) {

	    for (let c = 0; c < layout[r].length; c++) {

		if (layout[r][c] === 10) {

		    let tile_pos = get_tile_position(r, c);

		    patrol_tiles.push({row: r, col: c, x: tile_pos.x, y: tile_pos.y});

		}

	    }

	}

	game_state.monster.patrol_tiles = patrol_tiles;

    }


    const target = game_state.monster.target_area;
    let pa_monster_is_in = patrol_tile_monster_is_in();

    // 1. CHECAGEM DE CHEGADA: O monstro só limpa o alvo se ele CHEGOU fisicamente na área que era o destino dele
    if (target.active && target.type === 'patrol_area') {

        // Ele só cancela o alvo se a área onde ele está pisando agora bater com as coordenadas do alvo atual
        if (pa_monster_is_in &&
            pa_monster_is_in.x === target.x &&
            pa_monster_is_in.y === target.y) {

            target.active = false;
	    game_state.time.patrol_timer = 0;

        }
    }
    // 2. BLOCO DE SORTEIO: Se ele não tem alvo ativo (acabou de chegar ou resetou), sorteia o próximo
    if (!target.active) {

	game_state.time.patrol_timer += game_state.time.delta_time;

	if (game_state.time.patrol_timer < 3.0) return;



        const valid_tiles = patrol_tiles_monster_is_not_in();

        if (valid_tiles.length > 0) {

            const random_index = Math.floor(Math.random() * valid_tiles.length);
            const patrol_area = valid_tiles[random_index];

            game_state.monster.target_area.active = true;
            game_state.monster.target_area.type = 'patrol_area';
            game_state.monster.target_area.x = patrol_area.x;
            game_state.monster.target_area.y = patrol_area.y;
            game_state.monster.target_area.width = tile_size;
            game_state.monster.target_area.height = tile_size;
            game_state.monster.velocity = game_state.monster.base_velocity;

        }
    }

}

export default patrol_areas;

