app.controller('containerController', function ($scope, $mdDialog, $mdSidenav) {

    $scope.listcontainer = [];
    $scope.tableOrderField = "vessel";
    $scope.boxSearch = false;

    $scope.editDisabled = true;
    $scope.selectedIndex = 0;

    $scope.db;

    $scope.container = {container:'', size:'', status:'', mgw:'', tare:'', net:''};

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

    $scope.onEdit = function(item) {
        $scope.editDisabled = false;
        $scope.selectedIndex = 2;
        $scope.container = item;
    }

    $scope.onDelete = function(item) {
        $scope.delete(item.localId);
        $scope.getContainers();
    }

    $scope.onDeselected = function(tab) {
        $scope.editDisabled = true;
        $scope.container = {container:'', size:'', status:'', mgw:'', tare:'', net:''};
    }

    $scope.goServiceOrder = function() {
       location.href="#serviceOrder"
    }

    $scope.showDeleteDialog = function(obj) {
        $mdDialog.show({
            clickOutsideToClose: true,
            templateUrl: '/app/components/container/deleteDialog.html',
            locals: {
                item: obj,
                main: $scope
            },
            controller: function DialogController($scope, $filter, $mdDialog, item, main) {
                /** close dialog **/
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }

                $scope.confirmDialog = function() {
                    $mdDialog.hide();
                    main.onDelete(item);
                }
            }
        })
    }

    $scope.showMoreDialog = function (obj) {
        $mdDialog.show({
            clickOutsideToClose: true,
            templateUrl: '/app/components/container/moreDialog.html',
            locals: {
                item: obj,
                main: $scope
            },
            controller: function DialogController($scope, $filter, $mdDialog, item, main) {
                /** close dialog **/
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }

                $scope.onEdit = function() {
                    $mdDialog.hide();
                    main.onEdit(item);
                }

                $scope.onDelete = function() {
                    $mdDialog.hide();
                    main.showDeleteDialog(item);
                }
            }
        })
      }

      $scope.openDB = function() {

        var request = indexedDB.open("containers", 3);

        request.onerror = function(event) {
            console.log("ERROR", event.target.error);
        };

        request.onsuccess = function(event) {
           $scope.db = request.result;
           $scope.getContainers();
        };

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            //db.deleteObjectStore("containers");
            var objectStore = db.createObjectStore("containers", { autoIncrement : true });
            objectStore.createIndex("container", "container", { unique: false });
            objectStore.createIndex("status", "status", { unique: false });
            objectStore.transaction.oncomplete = function(event) {
                console.log("Opened successfully");
            }
        };
      }

      $scope.create = function() {
          if (!$scope.editDisabled) {
              $scope.edit();
          } else {
            var objectContainer = $scope.db.transaction(["containers"], "readwrite").objectStore("containers");
            var request = objectContainer.add($scope.container)

            request.onsuccess = function(event) {
                $scope.selectedIndex = 0;
                $scope.container = {container:'', size:'', status:'', mgw:'', tare:'', net:''};
                $scope.getContainers();
            };

            request.onerror = function(event) {
                console.log("ERROR", event.target.error);
            };
         }
      }

      $scope.getContainers = function() {
            $scope.listcontainer = [];
            var objectStore = $scope.db.transaction("containers").objectStore("containers");

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    $scope.listcontainer.push(cursor.value);
                    $scope.listcontainer[$scope.listcontainer.length-1].localId = cursor.key
                    cursor.continue();
                }
            };
      }

      $scope.delete = function(localId) {
            var objectStore = $scope.db.transaction(["containers"], "readwrite").objectStore("containers")
            var request = objectStore.delete(localId);
            request.onsuccess = function(event) {
                console.log("Deleted successfully");
            };
            request.onerror = function(event) {
                console.log("ERROR", event.target.error);
            };
      }

      $scope.edit = function() {
            var objectStore = $scope.db.transaction(["containers"], "readwrite").objectStore("containers")

            var request = objectStore.put($scope.container, $scope.container.localId);
            request.onerror = function(event) {
                console.log("ERROR", event.target.error);
            };
            request.onsuccess = function(event) {
                $scope.editDisabled = true;
                $scope.selectedIndex = 0;
                $scope.container = {container:'', size:'', status:'', mgw:'', tare:'', net:''};
            };
      }

      $scope.openDB();

});