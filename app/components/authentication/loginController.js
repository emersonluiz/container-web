app.controller('loginController', function ($scope, $mdDialog) {
    
    $scope.login = function() {
        if ($scope.username != "" && $scope.username != undefined && $scope.username != null &&
            $scope.password != "" && $scope.password != undefined && $scope.password != null) {
            location.href="#serviceOrder"
        } else {
            $scope.showLoginDialog();
        }
    }
    
    $scope.showLoginDialog = function () {
        $mdDialog.show({
            clickOutsideToClose: true,
            templateUrl: '/app/components/authentication/loginDialog.html',
            locals: {
                main: $scope
            },
            controller: function DialogController($scope, $filter, $mdDialog, main) {
                /** close dialog **/
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        })
      }

});