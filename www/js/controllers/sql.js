'use strict';

app.controller("sqlCtrl", function($scope, $cordovaSQLite, $timeout){

// insert into sqlite db function
  $scope.insert = function(task){
    var query = "INSERT INTO todos (task) VALUES (?)"; //query in sqlite syntax
    $cordovaSQLite.execute(db, query, [task]).then(function(result){
      console.log("INSERT ID =>" + result.insertId);
    }, function(error){
      console.log(error);
    });
    $scope.select(); //calling select function to update information displayed
  };

  // this function updates status of a task passing id and new status completed/uncompleted
  $scope.update = function(id,done){
    var query = "UPDATE todos SET done = ? WHERE id = ?";
    $cordovaSQLite.execute(db, query, [done, id]).then(function(result){
      console.log("UPDATED ID =>" + id + " to =>" + done);
    }, function(error){
      console.log(error);
    });
    $scope.select(); //same as above
  };

  // this function deletes a task using its id
  $scope.delete = function(id){
    var query = "DELETE FROM todos WHERE id = ?";
    $cordovaSQLite.execute(db, query, [id]).then(function(result){
      console.log("DELETED ID =>" + id);
    }, function(error){
      console.log(error);
    });
    $scope.select(); //same as above
  };

  // function to retreiving data from sqlite db, it selects all existing tasks
  $scope.select = function(){
    $scope.todoList = []; //initializing uncompleted tasks array
    $scope.todoDone = []; //initializing completed tasks array
    var query = "SELECT id, task, done FROM todos"; //query to select all tasks
    $cordovaSQLite.execute(db, query).then(function(result){
      if(result.rows.length > 0){ //checking if there any rows in db
        for(var i=0;i<result.rows.length;i++) { //if so then itirate all rows
          console.log("SELECTED =>" + result.rows.item(i).task + " " + result.rows.item(i).id);
          if(result.rows.item(i).done === 'true'){ // if task is already completed then put it into completed tasks
            $scope.todoDone.unshift({id:result.rows.item(i).id,
                                    task:result.rows.item(i).task,
                                    done:result.rows.item(i).done});
          } else { //if task is not completed yet then put it into due tasks
            $scope.todoList.unshift({id:result.rows.item(i).id,
                                    task:result.rows.item(i).task,
                                    done:result.rows.item(i).done
                                    })
          }
        }

      }
    }, function(error){
      console.log(error);
    });
  };

  // load tasks when page is just opened
  $timeout(function () {
        $scope.select();
        console.log("autoloaded");
  }, 100);

});
