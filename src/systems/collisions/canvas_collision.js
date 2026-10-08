const canvas = document.getElementById('gameCanvas');

function canvas_collision (entity) {

    if (entity.x < 0) return true;

    if ((entity.x + entity.width) > canvas.width) return true;

    if (entity.y < 0) return true;

    if ((entity.y + entity.height) > canvas.height) return true;

}

export default canvas_collision;
