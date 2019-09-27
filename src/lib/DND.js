export default {
    makeDND(table) {
        let formCoords = {};
        let form;
        let shiftX;
        let shiftY;

        table.addEventListener('dragstart', (e) => {
            form = e.target;
            shiftX = e.offsetX;
            shiftY = e.offsetY;
        });

        table.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        table.addEventListener('drop', (e) => {
            let coords = {
                x: e.clientX,
                y: e.clientY
            }            

            form.style.left = coords.x - shiftX + 'px';
            form.style.top = coords.y - shiftY + 'px';
        });
    }
};