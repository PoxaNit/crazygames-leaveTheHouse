
const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function floor_drawer () {

    ctx.imageSmoothingEnabled = false;

    const floor_img = new Image();

    floor_img.src = 'assets/sprites/floor/leave_the_house_wooden_floor_1.png';

floor_img.onload = function() {
    // Vira 30 blocos de largura e 17 de altura para cobrir a tela 960x540
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 17; y++) {
            ctx.drawImage(chao_img, x * 32, y * 32, 32, 32);
        }
    }
};

}

export default floor_drawer;
