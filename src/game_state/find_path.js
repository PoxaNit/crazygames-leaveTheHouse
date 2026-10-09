// src/game_state/pathfinding.js

export function find_path(grid, startNode, targetNode) {
    if (!startNode || !targetNode || targetNode.isWall) return [];

    let openSet = [startNode];
    let closedSet = new Set();

    // Inicializa os nós
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let node = grid[x][y];
            if (node) {
                node.g = Infinity;
                node.f = Infinity;
                node.parent = null;
            }
        }
    }

    startNode.g = 0;
    startNode.f = heuristic(startNode, targetNode);

    while (openSet.length > 0) {
        // Pega o nó com o menor custo 'f'
        let current = openSet.reduce((lowest, node) => node.f < lowest.f ? node : lowest, openSet[0]);

        if (current === targetNode) {
            let path = [];
            let temp = current;
            while (temp.parent) {
                path.push(temp);
                temp = temp.parent;
            }
            return path.reverse(); // Retorna o caminho do início ao fim
        }

        openSet = openSet.filter(node => node !== current);
        closedSet.add(current);

        let neighbors = getNeighbors(grid, current);
        for (let neighbor of neighbors) {
            if (closedSet.has(neighbor) || neighbor.isWall) continue;

            let tentativeG = current.g + 1; // Custo de mover 1 quadrado

            if (tentativeG < neighbor.g) {
                neighbor.parent = current;
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + heuristic(neighbor, targetNode);

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return []; // Se não achar caminho, retorna vazio
}

function heuristic(a, b) {
    // Distância de Manhattan para grades
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(grid, node) {
    let neighbors = [];
    let { x, y } = node;

    // Vizinhos ortogonais (Cima, Baixo, Esquerda, Direita)
    if (grid[x - 1]?.[y]) neighbors.push(grid[x - 1][y]);
    if (grid[x + 1]?.[y]) neighbors.push(grid[x + 1][y]);
    if (grid[x]?.[y - 1]) neighbors.push(grid[x][y - 1]);
    if (grid[x]?.[y + 1]) neighbors.push(grid[x][y + 1]);

    return neighbors;
}

