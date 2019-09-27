export default () => {
    return '<div class=ballon__content><h2 class=ballon__header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<a href="#" class=ballon__link data-coord="{{ properties.balloonContentCoords|raw }}">{{ properties.balloonContentLink|raw }}</a>' +
        '<div class=ballon__body>{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon__footer>{{ properties.balloonContentFooter|raw }}</div></div>';
};