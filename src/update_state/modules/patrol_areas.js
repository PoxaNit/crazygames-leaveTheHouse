import game_state from '../../game_state/game_state.js';
import patrol_area_monster_is_in from '../../systems/patrolling/patrol_area_monster_is_in.js';
import patrol_areas_monster_is_not_in from '../../systems/patrolling/patrol_areas_monster_is_not_in.js';

const game_message = document.getElementById('game_message');

function patrol_areas () {
    // Se o monstro não estiver em tarefa de patrulha, interrompe o script imediatamente
    if (game_state.monster.state.task !== 'patrolling') return;

    const target = game_state.monster.target_area;
    let pa_monster_is_in = patrol_area_monster_is_in();

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



        const valid_areas = patrol_areas_monster_is_not_in();

        if (valid_areas.length > 0) {
            const random_index = Math.floor(Math.random() * valid_areas.length);
            const patrol_area = valid_areas[random_index];

            game_state.monster.target_area = {
                active: true,
                type: 'patrol_area',
                x: patrol_area.x,
                y: patrol_area.y,
                width: patrol_area.width,
                height: patrol_area.height
            };
        }
    }
}

export default patrol_areas;

