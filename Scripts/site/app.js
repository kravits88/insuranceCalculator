define([
    'controllers/calc',
    '../angular'
], function (calcController) {
    angular.module('calcApp', [])
        .controller('calcController', calcController);
});