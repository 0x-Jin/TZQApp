/**
 * service class
 * @type {module|*}
 */
var deviceService = angular.module('tzqApp.deviceService', []);

/**
 *
 */
deviceService.service('deviceServices', function($cordovaVibration, $cordovaDevice){


  /**
   * 让手机震动
   * @param count 震动多少次
   */
  this.vibrate = function(count){
    $cordovaVibration.vibrate(200);
  }

  this.getDeviceInfo = function(){
    return $cordovaDevice.getDevice();
  }

});

