myTaskList.controller('taskListCtrl', ['$scope', '$http', function($scope, $http){


   // Data received from the server
    var refresh = function() {
        $http.get('/tasklist').success(function (res) {
            console.log ("Got response from the Database");
            $scope.tasklist = res;
            $scope.task = "";
            $scope.addDisabled = false;
        });
    };

    refresh();

    $scope.addTask = function (){
        //log the data in the browser
        console.log($scope.task);

        //send the data to the server
        $http.post('/tasklist', $scope.task).success(function(res){
            console.log(res);
            refresh();
        });
    };

    $scope.deleteTask = function (id){
        //log the data in the browser
        console.log(id);

        //send the data to the server
        $http.delete('/tasklist/'+id).success(function(res){
            refresh();
        });
    };

    $scope.editTask = function (id){
        //log the data in the browser
        console.log(id);
        $scope.addDisabled = true;

        $http.get('/tasklist/'+id).success(function (res) {
            console.log ("Got response from the Database");
            $scope.task = res;
        });
    };

    $scope.updateTask = function(){
        console.log($scope.task._id);

        $http.put('/tasklist/'+$scope.task._id, $scope.task).success(function(res){
            refresh();
        });
    };

    $scope.clearTask = function(){
        $scope.task = "";
    }


    /* Static Data in controller  for testing, not needed anymore.
    $scope.tasks = [
        {taskName:'task1', taskDescription:'first task', taskDueDate:'18th Nov 2015'},
        {taskName:'task2', taskDescription:'second task', taskDueDate:'19th Nov 2015'}
    ];
    */
}]);


