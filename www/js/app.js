// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null; //declaring db
var tasks = [];
var app = angular.module('todo', ['ionic', 'ngCordova'])
.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Checking if the app is opened in cordova/phonegap or on browser
    if (window.cordova) {
      console.log("yes, we are in cordova...")
      db = $cordovaSQLite.openDB({ name: "my.db", location: 'default'}); //device
    }else{
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
    }
    // creating table in the my.db database
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS todos (id integer primary key autoincrement, task text, done boolean)");
  });
})
