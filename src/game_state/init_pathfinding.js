// src/game_state/init_pathfinding.js
import game_state from './game_state.js';

function init_pathfinding(mapWidth = 800, mapHeight = 600) {
    const pf = game_state.pathfinding;
    const cols = Math.floor(mapWidth / pf.nodeSize);
    const rows = Math.floor(mapHeight / pf.nodeSize);

    // 1. Cria a matriz vazia de nós
    pf.grid = [];
    for (let x = 0; x < cols; x++) {
        pf.grid[x] = [];
        for (let y = 0; y < rows; y++) {
            pf.grid[x][y] = {
                x: x,
                y: y,
                isWall: false
            };
        }
    }

    // 2. Mapeia os obstáculos físicos para dentro do Grid como Paredes (isWall)
    game_state.obstacles.forEach(obs => {
        // Converte as coordenadas do obstáculo de pixels para índices do grid
        let startX = Math.floor(obs.x / pf.nodeSize);
        let startY = Math.floor(obs.y / pf.nodeSize);
        let endX = Math.floor((obs.x + obs.width) / pf.nodeSize);
        let endY = Math.floor((obs.y + obs.height) / pf.nodeSize);

        // Marca todos os nós cobertos pelo obstáculo como parede
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (pf.grid[x]?.[y]) {
                    pf.grid[x][y].isWall = true;
                }
            }
        }
    });
}

export default init_pathfinding;

