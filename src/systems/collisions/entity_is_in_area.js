function entity_is_in_area (entity, x, y, width, height) {

	return (
            entity.x + entity.width > x &&
            entity.x < x + width &&
            entity.y + entity.height > y &&
            entity.y < y + height
        );

}

export default entity_is_in_area;
