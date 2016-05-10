/**
 * Created by apple on 15/11/16.
 */
angular.module('tzqApp.main-controllers', [])

/**
 *  圈子首页
 */

  // 圈子首页 -> 发帖
  .controller('teamIndexPostsController', function($scope, $ionicHistory) {

    //设置文本框的高度
    function setTextHeight(){
      var height =  $(document).height() - 45;
      height = 0.4 * height + 'px';
      $("#postsText").css( 'height', height);
    }

    /********** 初始化 start ***********/

    setTextHeight();//设置文本框的高度

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  })

  // 圈子首页 -> 公告
  .controller('teamIndexNoticeController', function($scope, $ionicHistory) {

    //设置文本框的高度
    function setTextHeight(){
      var height =  $(document).height() - 45;
      height = 0.3 * height + 'px';
      $("#postsText").css( 'height', height);
    }

    /********** 初始化 start ***********/

    setTextHeight();//设置文本框的高度

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  })

  // 圈子首页 -> 申请退出
  .controller('teamIndexQuitController', function($scope, $ionicHistory) {

    $scope.my = { isLeader: true };

    /********** 初始化 start ***********/

    var _isLeader = false;;//后台数据判断
    $scope.my.isLeader = _isLeader;

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  // 圈子首页 -> 讨论详情
  .controller('teamIndexTabDiscussDetailController', function($scope, $ionicHistory, $stateParams, testService) {

    $scope.my = { discussDetail:{} }

    //获取 讨论详情 的内容
    function getDetailData(){

      switch( $stateParams.tabName ){
        case 'index':{
          var _q = testService.getDiscussList();
          break;
        }
        case 'sub':{
          var _q = testService.getDiscussList();
          break;
        }
        case 'account':{//个人中心 -> 圈子
          var _q = testService.getDiscussList();
          break;
        }
        case 'news-content':{//个人中心 -> 消息
          var _q = testService.getAccountDynamicList();
          break;
        }
        case 'dynamic':{//个人中心 -> 动态
          var _q = testService.getAccountDynamicList();
          break;
        }
        case 'collection':{//个人中心 -> 收藏
          var _q = testService.getAccountCollectionList();
          break;
        }
      }

      _q.then(function(data){
        var list = data.list;
        //根据id 获取后台数据
        for (var i = 0; i < list.length; i++) {
          if (list[i].member.id === parseInt($stateParams.id)) {
            $scope.my.discussDetail = list[i];
          }
        }
      }, function(data){});

    }

    /********** 初始化 start ***********/

    getDetailData();//获取 讨论详情 的内容

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //点赞
    $scope.addGood = function( index ){
      //判断是否已点赞
    }
    //评论
    $scope.addFeedback = function( index ){
    }

  })

  // 圈子首页 -> 邀请
  .controller('inviteController', function($scope, $location, $ionicHistory, $interval, $ionicActionSheet, testService) {

    $scope.my = { }

    $scope.goBack = function(){
      $ionicHistory.goBack();
      $("#riseBox").css( "display", "none");
    }

    //点击“添加成员”事件
    $scope.show = function() {

      var windowHeight = $(document).height() - 45;//app-common-header的高度是45px
      var riseBoxHeight = $("#riseBox").height();
      var top = windowHeight - riseBoxHeight;

      $("#riseBox").css( "top", windowHeight + "px");//初始化
      $("#riseBox").css( "display", "block");

      //动画效果：上滑
      var _t = $interval(function () {
        var temp = document.getElementById("riseBox").offsetTop;
        if (temp > top) {
          temp -= 2;
          $("#riseBox").css("top", temp + "px");
        } else {
          $interval.cancel(_t);
        }
      }, 1);

    }

    //添加微信朋友
    $scope.add_weixin = function(){
      console.log("微信");
    }

    //添加朋友圈朋友
    $scope.add_friendCycle = function(){
      console.log("朋友圈");
    }

  })

  // 圈子首页 -> 成员
  .controller('teamMemberListController', function($scope, $ionicPopup, testService) {

    //获取 成员tab 数据
    $scope.list = [];
    function getMember(){ //控制器内调用
      var _q = testService.getTeamMemberList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    getMember(); //获取 成员tab 数据

    /********** 初始化 end ***********/

    //删除成员 确认窗口
    $scope.showConfirm = function( item ){
      var confirmPopup = $ionicPopup.confirm({
        template:'<br/><br/><div style="text-align: center; font-size: 18px"><strong>确定要把此人从圈内删除吗?</strong></div><br/><br/><br/><br/>',
        buttons: [{
          text: '取消',
          type: 'button-positive',
          onTap: function(e) {
            //e.preventDefault();//确认窗口不关闭
            console.log("not sure");
          }
        }, {
          text: '确定',
          type: 'button-positive',
          onTap: function(e) {
            console.log("sure");
          }
        }]
      });
      //console.log(item);
    }

  })


/**
 * 关注首页
 */
  .controller('subIndexController', function($scope, $ionicHistory, $interval, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate, $stateParams, $location, testService){

    $scope.my = { login:false  };

    //获取 已关注的列表
    $scope.teamList = [];
    function getSubList(type){//控制器内部调用
      var _q = testService.getSubList();
      _q.then(function(data){
        $scope.teamList = data.list;

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    //获取 推荐关注
    $scope.recommendList = [];
    function getRecommend(){
      var _q = testService.getRecommendList();
      _q.then(function(data){
        $scope.recommendList = data.list;

        $scope.recommendListLength = $scope.recommendList.length;

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    /********** 初始化 start ***********/

    var _islogin = localStorage.getItem('loginSuccess');
    if(_islogin){
      $scope.my.login = true;
    }else{
      $location.path('/login/login');//跳转到登录页面
    }

    getSubList();//获取 已关注的列表
    getRecommend();//获取 推荐关注

    /********** 初始化 end ***********/

      //监听来自登录页面的事件
    ionic.EventController.on('loginEvent', function(){
      var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
      if(_islogin){
        $scope.my.login = true;//本作用域的数据。已登录
      }
    });

    //监听来自退出页面的事件
    ionic.EventController.on('logoutEvent', function(){
      var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
      if(_islogin){
      }else{
        $scope.my.login = false;//本作用域的数据。未登录
        $location.path('/login/login');//跳转到登录页面
      }
    });

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.$broadcast("scroll.refreshComplete");//通知框架刷新
    }

    //点击 换一换 按钮
    $scope.nextIndex = function(){
      console.log("change");
    }

  })

/**
 * 个人中心
 */

  //个人中心 -> 消息
  .controller('accountNewsController', function($scope, $location, $ionicHistory, testService) {

    $scope.my = { href:'#' };

    // 获取消息列表
    $scope.newsList = [];
    function getNewsList(){//控制器内部调用
      var _q = testService.getAccountNewsList();
      _q.then(function(data){
        $scope.newsList = data.list;

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    /********** 初始化 start ***********/

    getNewsList();// 获取消息列表

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //下一页
    $scope.next = function( d ){
      if( d.type == '交易消息' ){
        $scope.my.href = "#/tab/account-news-content-tradeNews";
      }else{
        $scope.my.href = "#/tab/account-news-content/" + d.id;
      }
    }

  })

  //个人中心 -> 消息内容
  .controller('accountNewsContentController', function($scope, $location, $ionicHistory, $stateParams, testService) {

    $scope.my = { "type":'', "popData":'' };

    //根据id 匹配后台数据
    function getById( list, id ){
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === parseInt(id)) {
          return list[i];
        }
      }
      return null;
    }

    //获取对应的消息内容 列表
    $scope.newsContentList = [];
    function getNewsContentList(){//控制器内部调用

      var _q = testService.getAccountNewsContentList();
      _q.then(function(data){

        switch( $scope.my.type ){//根据id判断获取什么类型的消息数据
          case'cycleNews': $scope.newsContentList = data.list[1].cycleNews; break;
          case'systemNews': $scope.newsContentList = data.list[0].systemNews; break;
          case'interactionNews': $scope.newsContentList = data.list[2].interactionNews; break;
        }

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    /********** 初始化 start ***********/

    //根据id，判断消息内容的类型
    switch( $stateParams.id ){
      case'1': $scope.my.type = 'cycleNews'; break;
      case'2': $scope.my.type = 'systemNews'; break;
      case'3': $scope.my.type = 'interactionNews'; break;
    }

    getNewsContentList();//获取对应的消息内容 列表

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //点击具体某条消息内容，弹框/页面跳转 显示 消息内容详情
    $scope.showDetail = function( id ){

      switch( $scope.my.type ){
        case'interactionNews':{ //互动消息
          $location.path('/tab/news-content/account-detail/'+ id);
          break;
        }
        case'cycleNews':{ //我的圈子
          $scope.my.popData = getById( $scope.newsContentList, id );
          $scope.openModal();//打开弹出框
          break;
        }
        case'systemNews':{ //系统消息
          $location.path('/tab/account-news-content-systemNews/' + id);
          break;
        }
      }
    }

  })

  //个人中心 -> 消息内容（系统消息）
  .controller('accountNewsContentSystemNewsController', function($scope, $location, $ionicHistory, $stateParams, testService) {

    $scope.my = { detailData:{}, isChecked: true };

    //根据id 匹配后台数据
    function getById( list, id ){
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === parseInt(id)) {
          return list[i];
        }
      }
      return null;
    }

    //获取对应的 消息列表
    var newsContentList = [];
    function getNewsContentList(){//控制器内部调用
      var _q = testService.getAccountNewsContentList();
      _q.then(function(data){
        newsContentList = data.list[0].systemNews;
        $scope.my.detailData = getById( newsContentList, $stateParams.id );

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    /********** 初始化 start ***********/

    getNewsContentList();//获取对应的 消息列表

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 消息内容（交易消息）
  .controller('accountNewsContentTradeNewsController', function($scope, $location, $ionicHistory, $stateParams, testService) {

    $scope.my = { "popData":'' };

    //根据id  匹配后台数据
    function getById( list, id ){
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === parseInt(id)) {
          return list[i];
        }
      }
      return null;
    }

    //获取对应的 消息列表
    $scope.newsContentList = [];
    function getNewsContentList(){//控制器内部调用
      var _q = testService.getAccountNewsContentList();
      _q.then(function(data){
        $scope.newsContentList = data.list[3].tradeNews;

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    /********** 初始化 start ***********/

    getNewsContentList(); //获取对应的 消息列表

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //打开弹出窗口
    $scope.showDetail = function( id ){
      $scope.my.popData = getById( $scope.newsContentList, id );
      $scope.openModal();//打开弹出框
    }

    //点击 送赢家券 按钮
    $scope.sendWinTicket = function(){
    //判断是否能送赢家券，按钮是否可点击
      $scope.closeBtn();
    }

    //点击 弹出窗口 右上角关闭 按钮
    $scope.closeBtn = function(){
      $scope.closeModal();
    }

  })

  //个人中心 -> 交易历史
  .controller('accountHistoryController', function($scope, $ionicHistory, $stateParams, $location, $ionicModal, $cordovaCalendar, $ionicPopover, testService) {

    //获取 交易历史 数据
    $scope.list = [];
    function getHisList(){
      var _q = testService.getAccountHistoryList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    getHisList();//获取 交易历史 数据

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 经纪人
  .controller('accountBrokersController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    $scope.my = { "popData":'' };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //点击“二维码”。弹出窗口
    $scope.showCode = function(){
      //设置弹出窗口内容
      $scope.openModal();
    }

  })

  //个人中心 -> 我的动态
  .controller('accountDynamicController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    $scope.fullText = { } ;//默认false

    //获取 我的动态 数据
    $scope.list = [];
    function getDynList(){
      var _q = testService.getAccountDynamicList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    getDynList();//获取 我的动态 数据

    /********** 初始化 end ***********/


      //点击“全文”按钮，显示全文
    $scope.fullText = function(id){
      //字符串转换为变量名,并赋值
      eval("$scope.fullText.show" + id  + "= !$scope.fullText.show" + id);
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 我的收藏
  .controller('accountCollectionController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    $scope.fullText = { } ;//默认false

    //获取 我的收藏 数据
    $scope.list = [];
    function getColList(){
      var _q = testService.getAccountCollectionList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    getColList();//获取 我的收藏 数据

    /********** 初始化 end ***********/

      //点击“全文”按钮，显示全文
    $scope.fullText = function(id){
      //字符串转换为变量名,并赋值
      eval("$scope.fullText.show" + id  + "= !$scope.fullText.show" + id);
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 设置
  .controller('accountSettingController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 我的收入
  .controller('accountIncomeController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    //获取 我的收入 数据
    $scope.list = [];
    function getIncList(){
      var _q = testService.getAccountIncomeList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    //设置 固定div、滑动div 的位置
    var offsetLeft = document.getElementById("fixedBox").offsetWidth;
    $("#slideBox").css( 'left', offsetLeft + "px");
    $("#slideBox").css( 'top', "-4px");

    getIncList();//获取 我的收入 数据

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 直属客户
  .controller('accountCustomerController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    //获取 直属客户 数据
    $scope.list = [];
    function getCusList(){
      var _q = testService.getAccountCustomerList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    //设置 固定div、滑动div 的位置
    var offsetLeft = document.getElementById("fixedBox").offsetWidth;
    $("#slideBox").css( 'left', offsetLeft + "px");
    $("#slideBox").css( 'top', "-4px");

    getCusList();//获取 直属客户 数据

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 直属平仓
  .controller('accountCloseController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    //获取 直属平仓 数据
    $scope.list = [];
    function getCloList(){
      var _q = testService.getAccountCloseList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    //设置 固定div、滑动div 的位置
    var offsetLeft = document.getElementById("fixedBox").offsetWidth;
    $("#slideBox").css( 'left', offsetLeft + "px");
    $("#slideBox").css( 'top', "-4px");

    getCloList();//获取 直属平仓 数据

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 直属持仓
  .controller('accountPositionController', function($scope, $ionicHistory, $stateParams, $location, testService) {

    //获取 直属持仓 数据
    $scope.list = [];
    function getPosList(){
      var _q = testService.getAccountPositionList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    var offsetLeft = document.getElementById("fixedBox").offsetWidth;
    $("#slideBox").css( 'left', offsetLeft + "px");
    $("#slideBox").css( 'top', "-4px");

    getPosList();//获取 直属持仓 数据

    /********** 初始化 end ***********/

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  })

  //个人中心 -> 设置 -> 账户信息
  .controller('accountSettingInfoController', function($scope, $location, $ionicHistory,  $ionicActionSheet, testService) {

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //修改头像
    $scope.changeImg = function() {

    };

    //退出登录
    $scope.logout = function(){

      localStorage.removeItem('loginSuccess');
      localStorage.removeItem('tradeSuccess');
      $ionicHistory.clearCache();//清空缓存

      ionic.EventController.trigger('logoutEvent');//触发一个事件
    }

  })

  //个人中心 -> 消息推送
  .controller('accountSettingPushController', function($scope, $location, $ionicHistory, testService) {

    $scope.my = { pushFlag:true, commentFlag:true, transferFlag:false, allTransferFlag:true };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  })

  //个人中心 -> 意见反馈
  .controller('accountSettingFeedbackController', function($scope, $location, $ionicHistory, testService) {
    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  })

  //个人中心 -> 赢家券
  .controller('accountWinTicketController', function($scope, $location, $ionicHistory, $ionicSlideBoxDelegate, $ionicScrollDelegate, $cordovaDevice, testService) {

    $scope.my = { winTabs:0,
      slideBox:{ box0:true, box1:false, box2:false}, //是否显示slide-box里面的div
      used_tenList:[], used_twoHundredList:[], unUsed_tenList:[], unUsed_twoHundredList:[], useless_tenList:[], useless_twoHundredList:[] };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    // 1：未使用； 2：已使用； 3：已过期
    $scope.switchTo = function(index, isTab){
      $('#account-winTicket-tab-hd').children('div').filter('.active').removeClass('active');
      $('#account-winTicket-tab-hd div:nth-child('+ index +')').addClass('active');//其父元素的第index个子元素（从1开始）
      if(!isTab)
        $ionicSlideBoxDelegate.$getByHandle('accountWinTicketTab').slide(index-1);
    }

    $scope.slideHasChanged = function(index) { //滑动
      $scope.switchTo(index + 1, true);
      $ionicScrollDelegate.scrollTo(0, 0, true);//上滚


      //是否显示。防止下拉一大片空白
      $scope.my.slideBox.box0 = false;
      $scope.my.slideBox.box1 = false;
      $scope.my.slideBox.box2 = false;

      switch(index){
        case 0: $scope.my.slideBox.box0 = true; break;
        case 1: $scope.my.slideBox.box1 = true; break;
        case 2: $scope.my.slideBox.box2 = true; break;
      }

    }

    //向arr数组中加入num个元素
    function pushItemToArray( arr, num ){
      for( var i=0; i < num; i++ ){
        arr.push( i );
      }
    }

    function getAccountWinTicketList(){
      var _q = testService.getAccountWinTicketList();
      _q.then(function(data){
        $scope.list = data.list;

        pushItemToArray( $scope.my.unUsed_tenList, $scope.list[0].unUsed.ten );
        pushItemToArray( $scope.my.unUsed_twoHundredList, $scope.list[0].unUsed.twoHundred );
        pushItemToArray( $scope.my.used_tenList, $scope.list[1].used.ten );
        pushItemToArray( $scope.my.used_twoHundredList, $scope.list[1].used.twoHundred );
        pushItemToArray( $scope.my.useless_tenList, $scope.list[2].useless.ten );
        pushItemToArray( $scope.my.useless_twoHundredList, $scope.list[2].useless.twoHundred );

      }, function(data){});
    }
    getAccountWinTicketList();

    //relocate the the main content position
    try{
      var _pl = $cordovaDevice.getPlatform();
      if(_pl.indexOf('iOS') != -1){
        $('#account-winTicket-fix-content').css('top', '120px');
      }
      else if(_pl.indexOf('Android') != -1){
        $('#account-winTicket-fix-content').css('top', '110px');
      }
    }catch(e){
      $('#account-winTicket-fix-content').css('top', '110px');
    }

  })

  .controller('accountWinTicketRecommendGiftController', function($scope, $location, $ionicHistory, testService) {
    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  })

/**
 * 发现首页
 */
  .controller('discoveryIndexController', function($scope, $rootScope,  $stateParams, $location, testService){

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.$broadcast("scroll.refreshComplete");//通知框架刷新
    }

    $scope.list = [];
    function getDisList(){
      var _q = testService.getDiscoveryList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }
    getDisList();

  })

  .controller('discoveryDetailController', function($scope, $location, $ionicHistory, $stateParams, testService) {

    $scope.my = { discoveryDetail:{} };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    function getDetailData(){

      var _q = testService.getDiscoveryList();
      _q.then(function(data){
        var list = data.list;//注意 .list！！！
        //根据id 获取后台数据
        for(var i = 0; i < list.length; i++) {
          if (list[i].id === parseInt($stateParams.id)) {
            $scope.my.discoveryDetail = list[i];
            break;
          }
        }
      }, function(data){});
    }
    getDetailData();

  })


/**
 * 登录
 */
  .controller('loginController', function($scope, $rootScope, $stateParams, $location, $ionicHistory, $state, testService){

    $scope.my = {isChecked:true, phoneNo:'', pwd:'', errorMsg:'', errorMsgs:{a:'账号信息错误,登录失败', b:'输入完整的登录信息'}};

    //监听来自退出登录的事件  不能监听？？？？？
    ionic.EventController.on('logoutEvent', function(){
      console.log("tab.account-setting-info -> logout");
      var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
      if(_islogin){//已登录
      }else{
      }
    });

    //登录后跳转
    function jumpTo(){
      switch( $rootScope.previousState.name ){
        case'tab.trade-index':
        case'tab.sub-index': $ionicHistory.goBack(); break;
        default: $location.path('/tab/account-index');//退出登录后重新登录、从未登录、忘记密码重设密码后登录
      }
    }

    //点击登录
    $scope.login = function(){

      if($scope.my.phoneNo == '' || $scope.my.pwd == ''){//没输入
        $scope.my.errorMsg = $scope.my.errorMsgs.b;
        $scope.my.isChecked = false;
      }
      else{
        //TODO, to implement the login function
        //判断输入是否正确
        $scope.my.isChecked = true;
        localStorage.setItem('loginSuccess', 'true');
        ionic.EventController.trigger('loginEvent');

        //判断是否是新用户
        if( 1 ){
          $scope.openModal();

        }else{
          jumpTo();
        }

      }

    }

    //注册有礼
    $scope.receiveRegisterGift = function(){
      $scope.closeModal();
      jumpTo();
    }

  })

  //修改密码 -> 输入原密码  /  输入交易密码
  .controller('InputPswController', function($scope, $rootScope, $location, $stateParams, $ionicHistory,  $ionicActionSheet, deviceServices, testService) {

    $scope.my = { pwd:'', passed:true, id:-1, LoginPswOrTradePsw:''};

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    $scope.my.id = $stateParams.id;
    var _password;//保存从后台获取的数据
    if( $stateParams.id == 0 ){//登录密码
      _password = '123';
      $scope.my.LoginPswOrTradePsw = '原密码';

    }else if( $stateParams.id == 1 ){//交易密码
      _password = '123456';
      $scope.my.LoginPswOrTradePsw = '交易密码';
    }

    $scope.$watch('my.pwd', function(newValue, oldValue){

      if( newValue.length == _password.length ){
        if(newValue == _password){
          $scope.my.passed = true;

          if( $rootScope.previousState.name == 'tab.account-setting-info' ){//修改密码 -> 输入原密码
            $location.path('/login/changePsw/' + $stateParams.id);//跳转到修改密码页面

          }else{//输入交易密码
            localStorage.setItem('tradePswSuccess', 'true');
            ionic.EventController.trigger('tradePswEvent');
            $scope.goBack();
          }

          $scope.my.pwd = '';
        }
        else{
          $scope.my.passed = false;
          deviceServices.vibrate(2);
        }

      } else if( newValue.length < _password.length ){
        $scope.my.passed = true;

      }else if( newValue.length > _password.length ){
        $scope.my.passed = false;

      }
    })

  })

  //修改密码
  .controller('ChangePswController', function($scope, $rootScope, $location, $stateParams,  $ionicHistory,  $ionicActionSheet, testService) {

    $scope.my = { login:false, isChecked:true, isDisabled:true,  pwd:'', repwd:'', LoginPswOrTradePsw:'', placeholderText:''};

    var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
    if(_islogin){//已登录
      $scope.my.login = true;
    }else{
      $scope.my.login = false;
    }

    if( $stateParams.id == 0 ){//修改登录密码
      $scope.my.LoginPswOrTradePsw = '登录密码';
      $scope.my.placeholderText = '输入新密码';

    }else if( $stateParams.id == 1 ){//修改交易密码
      $scope.my.LoginPswOrTradePsw = '交易密码';
      $scope.my.placeholderText = '输入6位新密码';
    }

    $scope.goBack = function(){
      //忘记密码：如果是已登录修改密码时忘记密码，返回-3返回到设置个人信息页面；如果是登录时忘记密码，返回-2返回到登录页面
      if( $rootScope.previousState.name == 'login.forgetPsw'  &&  $scope.my.login ){//忘记密码（修改密码、登录时）
        $ionicHistory.goBack(-3);
      }else{// login.inputPsw
        $ionicHistory.goBack(-2);
      }
      $scope.my.pwd = '';
      $scope.my.repwd = '';
    }

    $scope.changeLoginPswConfirm = function() {
      //修改后台数据
      if( $stateParams.id == 0 ){//修改登录密码

      }else if( $stateParams.id == 1 ){//修改交易密码

      }

      $scope.goBack();//返回
    }

    //监听输入内容，确定是否显示错误信息，以及提交按钮是否可用
    function watchInput(){

      if($scope.my.pwd != $scope.my.repwd){//两次密码不同
        $scope.my.isChecked = false;
        $scope.my.isDisabled = true;

      } else{//两次密码相同
        $scope.my.isChecked = true;
        if( $scope.my.pwd != '' ){//两次密码相同，且都不为空

          if( $stateParams.id == 0 ) {//修改登录密码
            $scope.my.isDisabled = false;

          }else{//修改交易密码
            if( $scope.my.pwd.length == 6 ){
              $scope.my.isDisabled = false;
            }else{
              $scope.my.isDisabled = true;
            }
          }
        }
      }
    }

    //监听密码（防止输入确认密码后，再更改密码）
    $scope.$watch('my.pwd', function(newdata, olddata){
      if( $scope.my.repwd != ''){
        watchInput();
      }
    });

    //监听确认密码
    $scope.$watch('my.repwd', function(newdata, olddata){
      watchInput();
    });

  })

  //忘记密码
  .controller('ForgetPswController', function($scope, $location, $stateParams, $ionicHistory, $interval, testService) {
    $scope.my = { phoneNum:'', isChecked:false, vCode:'', vCodeChecked:true, timeup:true, countdown:"验证码" }

    var _phoneNum = '15625042002';
    $scope.my.phoneNum = _phoneNum;

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    var _c = null;
    $scope.startVcodeCountDown = function(){
      //TODO, to send the validation code to the phone
      if(_c == null) {
        $scope.my.timeup = false;
        var temp = 10;
        $scope.my.countdown = temp + "秒";

        _c = $interval(function () {
          temp --;
          $scope.my.countdown = temp + "秒";
          if (temp < 0) {
            $scope.my.timeup = true;
            $scope.my.countdown = "验证码";
            $interval.cancel(_c);
            _c = null;
          }
        }, 1000);
      }
    }

    $scope.$watch('my.vCode', function(newdata, olddata){
      if(newdata.trim() == ''){//没输入
        $scope.my.isChecked = false;
      } else{
        $scope.my.isChecked = true;
      }
    });

    var _vCode = "123";
    $scope.next = function(){
      //判断输入是否正确
      if( $scope.my.vCode == _vCode ){
        $scope.my.vCodeChecked = true;
        $location.path("/login/changePsw/" + $stateParams.id);
        $scope.my.vCode = '';

      }else{
        $scope.my.vCodeChecked = false;
      }
    }
  })

/**
 * 查找、加入圈子
 */
  .controller('searchController', function($scope, $location, $ionicHistory, $interval, $ionicActionSheet, testService) {

    $scope.my = { searchText:'', href:'#' }

    $scope.goBack = function(){
      $ionicHistory.goBack();

      $scope.searchText = '';
      $scope.href = '#';
    }

    $scope.searchList = [];
    function getSearchData(){
      var _q = testService.getTeamCreationSearchList();
      _q.then(function(data){
        $scope.searchList = data.list;//注意 .list
      }, function(data){});
    }

    $scope.$watch('my.searchText', function(newdata, olddata){

      if( $scope.my.searchText == ''){//没输入，不跳转
        $scope.my.href = "#";

      }else{
        $scope.my.href = "#/team-creation/searchResult/" + $scope.my.searchText;

        if( newdata == '广州'){
          getSearchData();//获取数据，显示

        }else{
          $scope.searchList = [];
        }
      }

    });

  })

  .controller('searchResultController', function($scope, $location, $ionicHistory, $stateParams, $interval, $ionicActionSheet, testService) {

    $scope.my = { cycleName:'' }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $scope.my.cycleName = $stateParams.name;

  })

  .controller('joinRequestController', function($scope, $location, $ionicHistory, $stateParams, $interval, $ionicActionSheet, testService) {

    $scope.my = { };

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    $scope.joinRequest = function(){
      //do something
      $location.path('/tab/index');
    }

    //设置文本框的高度
    function setTextHeight(){
      var height =  $(document).height() - 45;
      height = 0.2 * height + 'px';
      $("#requestText").css( 'height', height);
    }
    setTextHeight();

  })
