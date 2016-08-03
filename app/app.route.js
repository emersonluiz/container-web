app.config(function ($routeProvider) {
     $routeProvider.when('/login', {
        templateUrl: 'app/components/authentication/loginController.html',
        controller: 'loginController'
    })
    $routeProvider.when('/container', {
        templateUrl: 'app/components/container/containerView.html',
        controller: 'containerController'
    })
    $routeProvider.when('/serviceOrder', {
        templateUrl: 'app/components/serviceOrder/serviceOrderView.html',
        controller: 'serviceOrderController'
    })
    $routeProvider.when('/serviceOrderCreate', {
        templateUrl: 'app/components/serviceOrder/serviceOrderCreate.html',
        controller: 'serviceOrderCreateController'
    })
    .otherwise({
        redirectTo: '/login'
    })
})


.run(function ($http, $rootScope, $location) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

    })

})
