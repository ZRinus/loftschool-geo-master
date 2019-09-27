import map from './map.js';
import DND from './DND.js';

const mapTable = document.querySelector('#map');

DND.makeDND(mapTable);
map(mapTable);

