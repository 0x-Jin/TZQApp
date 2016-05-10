// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var tzqApp = angular.module('tzqApp', ['ionic', 'tzqApp.controllers', 'tzqApp.deviceService',
      'tzqApp.main-controllers', 'tzqApp.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

    //pyb add
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
    if ( toState.name == 'tab.index' || toState.name == 'tab.discovery-index' || toState.name == 'tab.trade-index'
      || toState.name == 'tab.sub-index' || toState.name == 'tab.account-index') {
      $rootScope.hideTabs = false;//不隐藏
    } else {
      $rootScope.hideTabs = true;
    }
  });

    //查看前一页面url
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from;
      $rootScope.previousParams = fromParams;
    });
});
