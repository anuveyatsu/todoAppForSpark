/*
'use strict';

app.controller('mainCtrl', function($scope) {

  $scope.todoList = sqlCtrl.select();

  [
    {"todoText":"Clean House", "done":false},
    {"todoText":"Buy some eggs", "done":false},
    {"todoText":"Write a review", "done":false},
    {"todoText":"Read a chapter", "done":false},
    {"todoText":"Go to gym", "done":false}
  ];


  $scope.todoAdd = function() {

        $scope.todoList.unshift({todoText:$scope.todoInput, done:false});
        $scope.todoInput = "";
  };

  $scope.remove = function(todo) {
    $scope.todoList.splice($scope.todoList.indexOf(todo), 1);
  };
});
*/
