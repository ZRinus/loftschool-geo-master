import View from './view.js';
import Model from './model.js';
import getClustererTemplate from './getClustererTemplate.js';

export default (mapTable) => {
    let myMap;
    let storage = Model.getReviews();
    let clusterer;
    //console.log(storage);

    return new Promise(resolve => ymaps.ready(resolve))
        .then(() => {
            
            myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

            let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
                getClustererTemplate()               
            );

            clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedVioletClusterIcons',
                clusterDisableClickZoom: true,
                clusterOpenBalloonOnClick: true,
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                clusterBalloonItemContentLayout: customItemContentLayout,
                clusterBalloonPanelMaxMapArea: 0,
                clusterBalloonContentLayoutWidth: 200,
                clusterBalloonContentLayoutHeight: 150,
                clusterBalloonPagerSize: 15
            });
    
            myMap.geoObjects.add(clusterer);
            createIcons(storage);

            myMap.events.add('click', (e) => {
                let windowCoords = e.get('pagePixels');
                let targetCoords = e.get('coords');                      

                getAddress(targetCoords)
                    .then((address) => {
                        createContainer(windowCoords, targetCoords, address);
                    });
            });
            
            mapTable.addEventListener('click', (e) => {
                if (e.target.dataset.coord) {
                    let targetCoords = e.target.dataset.coord;
                    let windowCoords = [e.clientX, e.clientY]; 

                    clusterer.balloon.close();

                    getAddress(targetCoords)
                        .then((address) => {
                            createContainer(windowCoords, targetCoords, address);
                        });
                }
            });

            function getAddress(coords) {
                return ymaps.geocode(coords).then((res) => {
                        let firstGeoObject = res.geoObjects.get(0);
                        
                        return firstGeoObject.getAddressLine();
                    });
            }

            function createIcon(coords, review) {
                let icon = new ymaps.Placemark(coords, {
                    openBalloonOnClick: false,
                    balloonContentHeader: review.place,
                    balloonContentCoords: review.coords,
                    balloonContentLink: review.address,
                    balloonContentBody: review.text,
                    balloonContentFooter: review.date
                }, { preset: 'islands#blueHomeCircleIcon' });
                
                icon.events.add('click', (e) => {
                    e.preventDefault();
                    let windowCoords = e.get('pagePixels');

                    getAddress(coords)
                        .then((address) => {
                            createContainer(windowCoords, coords, address);
                        });                    
                });

                myMap.geoObjects.add(icon);
                clusterer.add(icon);
            }

            function createIcons(storage) {
                storage.forEach((review) => {
                    createIcon(review.coords, review);
                });
            }

            function createContainer(windowCoords, targetCoords, address) {
                let exsistReviews = Model.searchReviewsByAdddress(address);
                let container = View.renderReview(windowCoords, targetCoords, address, mapTable, exsistReviews);                        
                let submitBtn = document.querySelector('#submit');
                let closeBtn = document.querySelector('#closeBtn');

                submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let formElements = [...document.querySelector('#form').elements];
                    let newReview = Model.saveReviews(address, formElements, targetCoords);

                    createIcon(targetCoords, newReview);
                    View.addReview(container, newReview);
                });

                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    View.destroyChild(mapTable, container);
                });

                return container;
            }
        })    
};