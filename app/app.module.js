var app = angular.module('webApp', ['ngRoute', 'ngMaterial', 'md.data.table', 'ngMessages', 'ngSanitize'])

app.config(function ($mdIconProvider) {
    $mdIconProvider
        .iconSet('navigation', 'assets/svg/svg-sprite-navigation.svg', 24)
        .iconSet('action', 'assets/svg/svg-sprite-action.svg', 24)
        .iconSet('image', 'assets/svg/svg-sprite-image.svg', 24)
        .iconSet('content', 'assets/svg/svg-sprite-content.svg', 24)
        .iconSet('av', 'assets/svg/svg-sprite-av.svg', 24)
        
    $mdIconProvider.fontSet('md', 'material-icons');
})

app.controller('generalController', function ($scope, $window) {

    $scope.offline = false;
    $scope.online = true;

    $window.addEventListener('online', function() {
        $scope.online = true;
        $scope.$apply();
    })
    $window.addEventListener('offline', function() {
        $scope.online = false;
        $scope.$apply();
    })

    if (navigator.onLine) {
        $scope.online = true;
    } else {
        $scope.online = false;
    }


});