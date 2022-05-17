app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/test", {
            templateUrl: "app/",
            controller: "settingsController"
        })
        .otherwise({
            templateUrl: "app/components/main/main.html",
            controller: "mainController"
        });
}]);

app.run(['$rootScope', '$location', '$route', function($rootScope, $location, $route) {
    // loginService.initMainPlatformFun();

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        /* var path = $location.path();
        if (($route.routes[path])) {
            if (($route.routes[path]).requireLogin == true && !loginService.isLoggedIn()) {
                window.location.hash = "/";
            }
        } */
    });
}]);