app.controller('serviceOrderCreateController', function ($scope, $mdSidenav) {

    $scope.listserviceorder = [];
    $scope.toolBar = false;
    $scope.toggleRight = buildToggler('right');
    $scope.open = function() {
        $scope.toolBar = true;
        $mdSidenav('right').toggle();
    }

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle();
      }
    }

    $scope.openDB = function() {

        var request = indexedDB.open("serviceOrders", 1);

        request.onerror = function(event) {
            console.log("ERROR", event.target.error);
        };

        request.onsuccess = function(event) {
           $scope.db = request.result;
        };

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("serviceOrders", { autoIncrement : true });
            objectStore.createIndex("os", "os", { unique: false });
            objectStore.createIndex("vessel", "vessel", { unique: false });
            objectStore.transaction.oncomplete = function(event) {
                console.log("The database opened success")
            }
        };
    }

    $scope.create = function() {
        var objectSO = $scope.db.transaction(["serviceOrders"], "readwrite").objectStore("serviceOrders");
        var request = objectSO.add($scope.os)

        request.onsuccess = function(event) {
            console.log("Dados gravados com sucesso");
            $scope.serviceOrder = {os:'', type:'', status:'', vessel:'', terminal:''};
            location.href = "#serviceOrder"
        };

        request.onerror = function(event) {
            console.log("ERROR", event.target.error);
        };
      }

    $scope.openDB();

});