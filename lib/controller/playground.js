var app = require('../app');

app.controller('playground', function ($scope) {
    $scope.exportDialogs = [
        'save',
        'share',
    ];
});