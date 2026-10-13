function target_area_directions (entity) {

    let target_areaCenterX = entity.target_area.x + (entity.target_area.width / 2);
    let target_areaCenterY = entity.target_area.y + (entity.target_area.height / 2);

    let entityCenterX = entity.x + (entity.width / 2);
    let entityCenterY = entity.y + (entity.height / 2);

    let pace = entity.velocity;
    let directions = [];

    if (target_areaCenterX < entityCenterX) directions.push('left');

    else if (target_areaCenterX > entityCenterX) directions.push('right');

    if (target_areaCenterY < entityCenterY) directions.push('up');

    else if (target_areaCenterY > entityCenterY) directions.push('down');

    return directions;

}

export default target_area_directions;
