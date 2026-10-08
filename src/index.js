import game_loop from './game_loop/game_loop.js';
import bind_inputs from './input/bind_inputs.js';
import start_game from './game_state/start_game.js';

bind_inputs(); // initializes the logic to catch player input

game_loop();

start_game();
