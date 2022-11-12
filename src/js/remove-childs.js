'use strict';

function removeChildNodes(parent) {
    //mientras ese div padre exista, elimine su hijo
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
};

export {removeChildNodes};