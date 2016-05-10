/**
 * Created by Allen Wong on 15/11/5.
 */

/**
 * App 公共 Modal
 */
tzqApp
  .directive('tzqModal', function($ionicModal){
  return {
    restrict:'E',
    transclude:true,
    replace:false,
    //templateUrl:'directives/tzq-modal.html',

    link:function(scope, el, attrs){

    },
    controller:function($scope, $element, $attrs, $transclude){
      $scope.modalId = $attrs.modalId;
      var _content = ''
      var _eA = $transclude();
      for(var i=0;i<_eA.length;i++) {
        if (_eA[i] &&  _eA[i].outerHTML) {
          _content += _eA[i].outerHTML;
        }
      }

      $($element).remove();

      var _temp = '<ion-modal-view  style="background:rgba(0, 0, 0, 0.5); height: 100%;top:0px;">' +
        '<ion-content  class="app-team-creation-body" has-bouncing="true" >' +
        '<div class="app-popup-top" id="' + $scope.modalId + '"></div>' +
        '<div class="app-popup-content" id="' + $scope.modalId + '-content" >' +
        _content +
        '</div>' +
        '</ion-content>' +
        '</ion-modal-view>'

      $scope.modal = $ionicModal.fromTemplate(_temp, //模板的字符串作为模型的内容。
        {
        scope: $scope,
        animation: 'qshow'
      });

      $scope.openModal = function() {
        $scope.modal.show();
        var _h = $('#' + $scope.modalId).parent().parent().height();
        var _h2 = $('#' + $scope.modalId + '-content').height();
        //$('#' + $scope.modalId).height(0.9*_h);

        var _anum = ( _h - _h2 ) / 2 ;
        $('#' + $scope.modalId).height( _anum * 1.1 );

        $('#' + $scope.modalId).css('zIndex', _anum + 100);
        $('#' + $scope.modalId + '-content').css('zIndex', _anum + 100) ;

        $('#' + $scope.modalId).animate({ zIndex: 100 }, {
          step:function(now, fx){
            $(this).css('transform', 'translateY(-' + (_anum - (now)) + 'px)');
          },
          duration:300
        }, 'ease-in-out');

        $('#' + $scope.modalId + '-content').animate({ zIndex: 100 }, {
          step:function(now, fx){
            $(this).css('transform', 'translateY(-' + (_anum - (now)) + 'px)');
          },
          duration:300
        }, 'ease-in-out');

      };
      /**
       * 支持关闭之后调用其他的方法
       * @param fn
       */
      $scope.closeModal = function(fn) {
        $scope.modal.hide();
        if(fn && typeof fn == 'function'){
          fn.call($scope);
        }
      };

      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
    }
  }
})

//pyb add
  .directive('popModal', function($ionicModal){
    return {
      restrict:'E',
      transclude:true,
      replace:false,

      link:function(scope, el, attrs){

      },
      controller:function($scope, $element, $attrs, $transclude){
        $scope.modalId = $attrs.modalId;
        var _content = ''
        var _eA = $transclude();
        for(var i=0;i<_eA.length;i++) {
          if (_eA[i] &&  _eA[i].outerHTML) {
            _content += _eA[i].outerHTML;
          }
        }

        $($element).remove();

        var _temp = '<ion-modal-view  style="background:rgba(0, 0, 0, 0.5); height: 100%;top:0px;">' +
          '<ion-content  class="app-team-creation-body" has-bouncing="true" >' +
          '<div class="" id="' + $scope.modalId + '"></div>' +
          '<div class="app-popup-pop-content" id="' + $scope.modalId + '-content" >' +
          _content +
          '</div>' +
          '</ion-content>' +
          '</ion-modal-view>'

        $scope.modal = $ionicModal.fromTemplate(_temp,
          {
            scope: $scope,
            animation: 'qshow'
          });

        $scope.openModal = function() {
          $scope.modal.show();
          var _h = $('#' + $scope.modalId).parent().parent().height();
          var _h2 = $('#' + $scope.modalId + '-content').height();

          var _anum = ( _h - _h2 ) / 2 ;
          $('#' + $scope.modalId).height( _anum );

          $('#' + $scope.modalId).css('zIndex', _anum + 100);
          $('#' + $scope.modalId + '-content').css('zIndex', _anum + 100) ;

          $('#' + $scope.modalId).animate({ zIndex: 100 }, {
            step:function(now, fx){
              $(this).css('transform', 'translateY(-' + (_anum - (now)) + 'px)');
            },
            duration:300
          }, 'ease-in-out');

          $('#' + $scope.modalId + '-content').animate({ zIndex: 100 }, {
            step:function(now, fx){
              $(this).css('transform', 'translateY(-' + (_anum - (now)) + 'px)');
            },
            duration:300
          }, 'ease-in-out');

        };
        /**
         * 支持关闭之后调用其他的方法
         * @param fn
         */
        $scope.closeModal = function(fn) {
          $scope.modal.hide();
          if(fn && typeof fn == 'function'){
            fn.call($scope);
          }
        };

        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
      }
    }
  })

