import temp from '../templates/review-temp.hbs';
import singleReview from '../templates/single-review.hbs';

const container = document.createElement('div');
const slider = document.createElement('div');

container.classList.add('window');
slider.classList.add('slider');

export default {
    renderReview(windowCoords, targetCoords, address, mapTable, reviews = []) {

        container.innerHTML = temp({ address: address, reviews: reviews });

        container.style.left = windowCoords[0] + 'px';
        container.style.top = windowCoords[1] + 'px';
        container.draggable = true;
        mapTable.appendChild(container);

        return container;
    },

    addReview(container, review) {
        let elemLi = document.createElement('li');
        elemLi.classList.add('review__item');
        elemLi.innerHTML = singleReview({review});

        if (container) {
            let reviewsList = document.querySelector('#reviews-list');
            
            reviewsList.appendChild(elemLi);
        }
    },

    destroyChild(parent, child) {
        parent.removeChild(child);
    }
};