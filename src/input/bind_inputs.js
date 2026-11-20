import game_state from '../game_state/game_state.js';
import start_game from '../game_state/start_game.js';
import input_state from './input_state/input_state.js';

const btn_play = document.getElementById('btn-play');
const btn_sound = document.getElementById('btn-sound');

function update_sound_ui() {
    if (btn_sound) {
        btn_sound.textContent = game_state.muted_audio ? 'SOUND: OFF' : 'SOUND: ON';
    }
}

function set_audio_muted(muted) {
    game_state.muted_audio = Boolean(muted);
console.log('game_state.audio_muted: ', game_state.audio_muted)
    update_sound_ui();
/*
    if (game_state.muted_audio && game_state.assets?.sounds) {
        Object.values(game_state.assets.sounds).forEach(sound => {
            if (sound && !sound.paused) {
                sound.pause();
            }
        });
    }
*/
}

function bind_inputs() {
    btn_play?.addEventListener('click', () => {
        btn_play.blur();
        start_game();
        game_state.match_status = 'playing';
    });

    btn_sound?.addEventListener('click', () => {
        btn_sound.blur();
        set_audio_muted(!game_state.audio_muted);
    });

    // Sync with CrazyGames SDK safely so it never blocks the buttons above
    try {
        const sdk_game = window.CrazyGames?.SDK?.game;
        if (sdk_game) {
            if (typeof sdk_game.settings?.muteAudio === 'boolean') {
                set_audio_muted(sdk_game.settings.muteAudio);
            }

            sdk_game.addSettingsChangeListener?.((settings) => {
                if (typeof settings?.muteAudio === 'boolean') {
                    set_audio_muted(settings.muteAudio);
                }
            });
        }
    } catch (err) {
        console.warn('SDK settings skipped:', err.message);
    }

    update_sound_ui();

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' || e.key === 'Up') input_state.up_arrow = true;
        if (e.key === 'ArrowDown' || e.key === 'Down') input_state.down_arrow = true;
        if (e.key === 'ArrowLeft' || e.key === 'Left') input_state.left_arrow = true;
        if (e.key === 'ArrowRight' || e.key === 'Right') input_state.right_arrow = true;

        if (e.key === 'p') input_state.p = true;

        if (e.key === 'e' && !game_state.game_running) start_game();

        if (e.key === 'r') input_state.r = true;
    });

    document.addEventListener('keyup', e => {
        if (e.key === 'ArrowUp' || e.key === 'Up') input_state.up_arrow = false;
        if (e.key === 'ArrowDown' || e.key === 'Down') input_state.down_arrow = false;
        if (e.key === 'ArrowLeft' || e.key === 'Left') input_state.left_arrow = false;
        if (e.key === 'ArrowRight' || e.key === 'Right') input_state.right_arrow = false;

        if (e.key === 'p') input_state.p = false;

        if (e.key === 'r') input_state.r = false;
    });
}

export default bind_inputs;

