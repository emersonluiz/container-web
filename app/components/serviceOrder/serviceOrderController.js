app.controller('serviceOrderController', function ($scope, $mdSidenav) {

    $scope.listServiceOrder = [];
    $scope.db;

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
        $mdSidenav(navID).toggle();
      }
    }

    $scope.openDB = function() {

        var request = indexedDB.open("serviceOrders", 1);

        request.onerror = function(event) {
            console.log("ERROR", event.target.error);
        };

        request.onsuccess = function(event) {
           $scope.db = request.result;
           $scope.getServiceOrders();
        };

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("serviceOrders", { autoIncrement : true });
            objectStore.createIndex("os", "os", { unique: false });
            objectStore.createIndex("vessel", "vessel", { unique: false });
            objectStore.transaction.oncomplete = function(event) {
                console.log("Opened successfully");
            }
        };
    }

    $scope.getServiceOrders = function() {
            var objectStore = $scope.db.transaction("serviceOrders").objectStore("serviceOrders");

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    $scope.listServiceOrder.push(cursor.value);
                    $scope.listServiceOrder[$scope.listServiceOrder.length-1].localId = cursor.key
                    cursor.continue();
                    $scope.$apply();
                }
            };

      }

    $scope.openDB();

});