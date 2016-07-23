'use strict';

app.controller("sqlCtrl", function($scope, $cordovaSQLite){

  $scope.insert = function(task){
    var query = "INSERT INTO todos (task) VALUES (?)";
    $cordovaSQLite.execute(db, query, [task]).then(function(result){
      console.log("INSERT ID =>" + result.insertId);
    }, function(error){
      console.log(error);
    });
    $scope.select();
  };

  $scope.update = function(id,done){
    var query = "UPDATE todos SET done = ? WHERE id = ?";
    $cordovaSQLite.execute(db, query, [done, id]).then(function(result){
      console.log("UPDATED ID =>" + id + " to =>" + done);
    }, function(error){
      console.log(error);
    });
    $scope.select();
  };

  $scope.delete = function(id){
    var query = "DELETE FROM todos WHERE id = ?";
    $cordovaSQLite.execute(db, query, [id]).then(function(result){
      console.log("DELETED ID =>" + id);
    }, function(error){
      console.log(error);
    });
    $scope.select();
  };

  $scope.select = function(){
    $scope.todoList = [];
    $scope.todoDone = [];
    var query = "SELECT id, task, done FROM todos";
    $cordovaSQLite.execute(db, query).then(function(result){
      if(result.rows.length > 0){
        for(var i=0;i<result.rows.length;i++) {
          console.log("SELECTED =>" + result.rows.item(i).task + " " + result.rows.item(i).id);
          if(result.rows.item(i).done === 'true'){
            $scope.todoDone.unshift({id:result.rows.item(i).id,
                                    task:result.rows.item(i).task,
                                    done:result.rows.item(i).done});
          } else {
            $scope.todoList.unshift({id:result.rows.item(i).id,
                                    task:result.rows.item(i).task,
                                    done:result.rows.item(i).done})
          }
        }

      }
    }, function(error){
      console.log(error);
    });
  };

});
