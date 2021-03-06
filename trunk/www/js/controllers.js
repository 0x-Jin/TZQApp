angular.module('tzqApp.controllers', [])


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});ok??

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('tabsController', function($scope, $rootScope, $location,  $ionicTabsDelegate){

})

.controller('indexController', function($scope, $rootScope, $stateParams, $ionicSlideBoxDelegate, testService){

    //pyb add start
    $scope.my = { searchText:'',  href:'' };

    $scope.$watch('my.searchText', function(newdata, olddata){

      if( $scope.my.searchText == ''){//没输入，不跳转
        $scope.my.href = "#";

      }else{
        $scope.my.href = "#";

      }

    });

    //pyb add end

    $scope.addSub = function($event){
      console.log(123)
      $event.stopPropagation();
    }
    $scope.doRefresh = function(){
      getTeam('v');
      $scope.$broadcast("scroll.refreshComplete");//通知框架刷新
    }

    /**
     * 广告点击
     * @param index
     */
    $scope.adClick = function(index){
      alert('Processing the Development.....');
    }


    $scope.switchTo = function(index, isTab){

      $('.app-card-tab-title').children('a').filter('.active').removeClass('active');
      $('.app-card-tab-title a:nth-child('+ index +')').addClass('active');
      if(!isTab)
        $ionicSlideBoxDelegate.$getByHandle('teamTab').slide(index-1);

      if(index == 1){
        getTeam('v')
      }
      else if(index == 2){
        getTeam('person')
      }
      else{
        //reload the wealth calendar
      }
    }

    $scope.teamTabChange = function(index){
      $scope.switchTo(index + 1, true);
    }

    getTeam('v');

    function getTeam(type){
      var _q = testService.getTop10();
      _q.then(function(data){
        if(type == 'v')
          $scope.teamList = data.v;
        else
          $scope.teamList = data.person;

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

  })

.controller('teamIndexPageController', function($scope, $rootScope, $stateParams, $location, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicHistory, $timeout, testService){

    $scope.person2Show = {};

    //pyb add
    $scope.my = { tabShow: true,//tabShow：true显示ion-content的tab, false显示ion-view的tab
      slideBox:{ box0:true, box1:false, box2:false} //是否显示slide-box里面的div
    };

    //根据url的tabName，获取数据
    function getDetailData(){

      switch( $stateParams.tabName ){
        case 'index':{
          console.log("index");
          var _q = testService.getTop10();

          _q.then(function(data){
            var list = data;//二维数组
            //根据id 获取后台数据
            for(var i = 0; i < list.v.length; i++) {
              if (list.v[i].id === parseInt($stateParams.id)) {
                //console.log(list.v[i]);
              }
            }
            for(var i = 0; i < list.person.length; i++) {
              if (list.person[i].id === parseInt($stateParams.id)) {
                //console.log(list.person[i]);
              }
            }
          }, function(data){});
          break;
        }
        case 'sub':{
          console.log("sub");
          var  _q = testService.getSubList();

          _q.then(function(data){
            var list = data;//二维数组
            //根据id 获取后台数据
            for(var i = 0; i < list.length; i++) {
              if (list[i].id === parseInt($stateParams.id)) {
                //console.log(list[i]);
              }
            }
          }, function(data){});
          break;
        }
        case 'account':{
          var  _q = testService.getAccountCircleList();

          _q.then(function(data){
            var list = data;//二维数组
            //根据id 获取后台数据
            for(var i = 0; i < list.length; i++) {
              if (list[i].id === parseInt($stateParams.id)) {
                //console.log(list[i]);
              }
            }
          }, function(data){});
          break;
        }
      }

    }

    //获取成绩tab 数据
    $scope.list = [];
    function getTeamScoreList(){
      var _q = testService.getTeamMemberList();
      _q.then(function(data){
        $scope.list =data.list;
      }, function(data){

      })
    }

    /************ 初始化 start **************/

    //下拉刷新，背景图放大。获取句柄
    var _img = $('#bgImg');
    var _div = $('#bgDiv');
    var _imgHeight = $('#bgImg').height();

    //判断是否是组长
    var _isLeader = true;
    $scope.notice = function(){
      if( _isLeader ){
        $location.path('/teamIndex/team-index-notice');//跳转到登录页面
      }
    }

    //获取页面数据
    getDetailData();//根据url的tabName，获取数据
    getTeamScoreList();//获取成绩tab 数据

    /************ 初始化 end **************/


      //进入页面后执行，局部刷新
    $scope.$on('$ionicView.afterEnter', function () {

    })

    //ion-content滚动事件
    $scope.mainScrollFunc = function(){
      var _p = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition();

      if( _p ){//如果有滚动

        var _zoolInt = _p.top;
        if( _zoolInt <= 0 ){
          var _scaleSize = ( _imgHeight - _zoolInt * 2 ) / _imgHeight;

          _img.css({
            'transform': 'scale(' + _scaleSize + ')',
            'top': _zoolInt - 10 + 'px' //原本 top == -10px
          });
          _div.css({
            'transform': 'scaleY(' + _scaleSize + ')',
            'top': _zoolInt - 10 + 'px'
          });
        }

        //上滚时，显示 ion-view 或 ion-content 的 tab
        if( _p.top > 211  &&   $scope.my.tabShow ){
          $scope.my.tabShow = false;
          $scope.$broadcast('scroll.refreshComplete');

        }else if( _p.top < 211  &&  !$scope.my.tabShow){
          $scope.my.tabShow = true;
          $scope.$broadcast('scroll.refreshComplete');
        }

      }
    }

    $scope.onRefresh = function() {

      setTimeout(function () {
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    }

    $scope.goBack = function() {
      $ionicHistory.goBack();
    };

    //弹出窗口
    $scope.showDetail = function(m){
      $scope.person2Show = m;
      $scope.openModal();
    }

    //点击tab, 切换tab
    $scope.switchTo = function(index, isTab){

      //pyb add
      //ion-view
      $('.app-team-index-tab-hd').children('div').filter('.active').removeClass('active');
      $('.app-team-index-tab-hd div:nth-child('+ index +')').addClass('active');

      //ion-content
      $('.app-team-index .app-team-index-tab-hd').children('div').filter('.active').removeClass('active');
      $('.app-team-index .app-team-index-tab-hd div:nth-child('+ index +')').addClass('active');

      if(!isTab){
        $ionicSlideBoxDelegate.$getByHandle('teamIndexTab').slide(index-1);
      }

      $ionicSlideBoxDelegate.enableSlide(true);//允许滑动 ( pyb add )

      if(index == 1){

      }
      else if(index == 2){

      }
      else if( index == 3 ){
        $ionicSlideBoxDelegate.enableSlide(false);//禁止滑动（当右滑时滑至index=2，即禁止左滑） ( pyb add )
      }

    }

    //滑动，切换tab
    $scope.teamTabChange = function(index){
      $scope.switchTo(index + 1, true);

      $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, 210, true);//上滚 显示 ion-content的tab

      //是否显示div。防止下拉一大片空白
      $scope.my.slideBox.box0 = false;
      $scope.my.slideBox.box1 = false;
      $scope.my.slideBox.box2 = false;

      switch(index){
        case 0: $scope.my.slideBox.box0 = true; break;
        case 1: $scope.my.slideBox.box1 = true; break;
        case 2: $scope.my.slideBox.box2 = true; break;
      }

    }

    //右滑动作( index == 3 )
    $scope.onSwipeRight = function(){
      $scope.switchTo( 2, false );
    }

})
/**
 *  圈子首页 -> 讨论 tab
 */
.controller('teamDiscusslistController', function($scope, $location, $stateParams, $ionicScrollDelegate, testService){

    $scope.fullText = { } ;//继承 teamIndexPageController，不能再用$scope.my
    //里面的属性值 默认false

    //获取 讨论tab 的数据
    $scope.list = [];
    function getDisList(){
      var _q = testService.getDiscussList();
      _q.then(function(data){
        $scope.list = data.list;
      }, function(data){});
    }

    /********** 初始化 start ***********/

    $scope.tabName = $stateParams.tabName;
    getDisList();//获取 讨论tab 的数据

    /********** 初始化 end ***********/

    //点击全文，显示全文
    $scope.fullText = function(id){
      //字符串转换为变量名,并赋值
      eval("$scope.fullText.show" + id  + "= !$scope.fullText.show" + id);
    }

})
/**
 * 总榜controller
 */
.controller('rankSummaryController', function($scope, $stateParams, $ionicSlideBoxDelegate, testService){

    $scope.teamList = [];//列表数据
    $scope.isBigV = true;//当前是否是显示大V的列表
    $scope.doRefresh = function(){
      getRank('day');
    }

    $scope.switchTo = function(index, isTab, type){

      $('.app-card-tab-title').children('a').filter('.active').removeClass('active');
      $('.app-card-tab-title a:nth-child('+ index +')').addClass('active');
      if(!isTab)
        $ionicSlideBoxDelegate.$getByHandle('teamTab').slide(index-1);
    }

    $scope.changeTeam = function(type){
      $scope.isBigV = type=='v';
      $scope.switchTo(1, false, 'day')
    }

    $scope.teamTabChange = function(index){
      var _type = 'day';
      switch(index){
        case 0:
              _type = 'day';
              break;
        case 1:
              _type = 'week';
              break;
        default :
              _type = 'month';
      }

      $scope.switchTo(index + 1, true, _type);
      getRank(_type);
    }

    getRank('day');

    function getRank(type){
      var _q = testService.getRank();
      _q.then(function(data){
        if(type == 'day')
          $scope.teamList = data.day;
        else if(type == 'week')
          $scope.teamList = data.week;
        else
          $scope.teamList = data.month;

        setTimeout(function(){
          $scope.$broadcast('scroll.refreshComplete');
        },1000)
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
  })

/**
 * 组队
 */
  .controller('creationController', function($scope, $rootScope, $stateParams, $ionicHistory, testService){

    $scope.goBack = function() {
      $ionicHistory.goBack();
    };
  })
  .controller('teamCreationController', function($scope, $stateParams, $location, testService){
    $scope.rule = '';
    $scope.my = {isChecked:false};


    var _ruleQ = testService.getCreateTeamRule();
    _ruleQ.then(function(data){
      $scope.rule = data.rule;
    }, function(data){});

    $scope.next = function(){
      if(!$scope.my.isChecked){
        return false;
      }
      else{
        $location.path('/team-creation/action');
      }
    }
})
  .controller('actionController', function($scope, $stateParams, $location, testService){
    $scope.next = function(type){
      if(type == 1){
        $location.path('/team-creation/teamtype');
      }
      else{
        $location.path('/team-creation/search');
      }
    }
  })
  .controller('teamTypeSelectController', function($scope,  $stateParams, $location, testService){
    $scope.next = function(type){
      if(type == 1){
        $location.path('/team-creation/teamname/1');
      }
      else{
        //$location.path('/team-creation/teamname/2');
        $location.path('/team-creation/authentication');
      }
    }
  })
  .controller('teamAuthenticationController', function($scope,  $stateParams, $location, testService){

    $scope.my = { phoneNo:'', pwd:'', disabled: true};

    //监听输入
    function watchInput(){
      if( $scope.my.phoneNo != ''  &&  $scope.my.pwd != '' ){
        $scope.my.disabled = false;
      }else{
        $scope.my.disabled = true;
      }
    }

    $scope.$watch('my.phoneNo', function(newValue, oldValue){
      watchInput();
    })

    $scope.$watch('my.pwd', function(newValue, oldValue){
      watchInput();
    })

    $scope.next = function(){
      if( 1 ){//判断输入是否正确
        $location.path("/team-creation/teamname/2");
      }
    }
  })

  .controller('teamNameController', function($scope, $stateParams, $location, testService){
    $scope.createTeamType = $stateParams.type;
    $scope.my = {teamName:'', isChecked:false};

    $scope.next = function(type){
      if($scope.my.teamName.trim() == ''){
        return false;
      }
      else{
        $location.path('/teamIndex/team-index-invite/teamId');//TODO, to create the team and get the new id
      }
    }

    $scope.$watch('my.teamName', function(newdata, olddata){
      if(newdata.trim() == ''){
        $scope.my.isChecked = false;
      }
      else{
        $scope.my.isChecked = true;
      }
    });
  })

/**
 * 交易首页
 */
    .controller('tradeIndexController', function($scope, $rootScope, $ionicHistory,  $stateParams, $location, $cordovaDevice, $ionicPopup, $timeout, testService, deviceServices){

    $scope.my = { login:false, tradePsw:false, toggle:true, product:'粤银',
      upOrDownBtn:-1, popUpPage:-2,// 点击买涨/买跌，弹出窗口显示的内容
      profitSettingLastPage:-2,//盈亏设置的前一内容（返回未建仓详情，或者是直接关闭盈亏设置。默认直接关闭）
      buildRiseFlag:false, buildDropFlag:false, //建仓div的上升、下降效果
      popData:{}, buildData:{},
      buttonDisabled:{ }//判断一对 买涨买跌按钮 是否可用
    };

    //进入页面后执行，局部刷新
    $scope.$on('$ionicView.afterEnter', function () {
      $('#app-trade-index-chart').highcharts().reflow();//调整图表大小，重绘
    });

    //是否已登录
    var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
    if(_islogin){
      $scope.my.login = true;//本作用域的数据。已登录
    }
    var _tradePsw = localStorage.getItem('tradeSuccess');//localStorage是本地存储
    if(_tradePsw){
      $scope.my.tradePsw = true;//本作用域的数据。已登录
    }

    var _chart = new Highcharts.StockChart({
      chart:{
        backgroundColor:'#f5f5f5',
        plotBackgroundColor:'#e8e8e8',//画布背景色
        plotBorderWidth:1,//画布边框
        plotBorderColor:'rgba(79,79,79,0.5)',
        renderTo:'app-trade-index-chart',//放在对应html中的id（画布所在的div id ）
        },
      rangeSelector : {
        enabled:false,
      },
      title : {//画布题目，此处置空
        text : null
      },
      navigator: {
        enabled: false
      },
      scrollbar:{
        enabled: false
      },
      yAxis: {
        crosshair: false,
        opposite: false,
        gridLineColor: 'rgba(79,79,79,0.5)',
        tickAmount: 6,
        tickPixelInterval:50,
        labels: {
          align: 'right',
          x: -8
        },
        title: {
          text: null,
        },
        height: '100%',
        lineWidth: 0,
      },
      //横坐标下标
      xAxis: {
        lineWidth: 0,
        ordinal:true,
        floor:100,

        tickLength: 5,
        tickPosition: 'inside'
      },
      //表格图形的具体数据
      series : [{
        type : 'candlestick',
        name : 'AAPL Stock Price',
        upColor:'#fc6045',
        upLineColor:'#fc6045',
        data : $scope.data,
        lineColor:'#05c500',
        shadow:true,
        allowPointSelect:true,
        color:'#05c500',
        dataGrouping : {
          units : [
            [
              'week', // unit name
              [1] // allowed multiples
            ], [
              'month',
              [1, 2, 3, 4, 6]
            ]
          ]
        }
      }]
    });

    _chart.showLoading('loading....');
    var _q = testService.getChartTestData();
    _q.then(function(data){
      _chart.series[0].setData(data);
      _chart.hideLoading();
    },function(){
      _chart.hideLoading();
    });


    //TODO, 集成后端后,这段代码需要修改
    $scope.range = function(m){
      eval('setCurrent(' + m + ')');
      if(m != 0) {
        var _d = new Date();
        var _y = _d.getFullYear(),
          _m = _d.getMonth() - 1,
          _dt = _d.getDate();
        _chart.xAxis[0].setExtremes(
          Date.UTC(_y, _m, _dt - m),
          Date.UTC(_y, _m, _dt)
        );
        _chart.series[0].update({
          type: 'candlestick',
          lineColor:'#05c500'
        });
      }
      else{
        _chart.series[0].update({
          type: 'spline',
          lineColor:'#020e3f',
        });
      }
    }

    function setCurrent(m){
      if($scope.my.currentRange == m)
        return false;
      eval('$scope.my.p' + m + '=true');
      console.log($scope.my.currentRange);

      if($scope.my.currentRange || $scope.my.currentRange == 0){
        eval('$scope.my.p' + $scope.my.currentRange + '=false');
      }
      $scope.my.currentRange = m;
    }

    $scope.orderSummary = {};

    getOrderlist();

    $scope.prdList = [];
    getPrdList();

    $scope.toggle = function(){
      $('#list-con').toggle(100);// 显示/隐藏交互事件。参数是下拉速度
      $scope.my.toggle = !$scope.my.toggle;
    }

    function getOrderlist(){ //总盈亏下拉
      var _q = testService.getTradeOrderList();
      _q.then(function(data){
        $scope.orderSummary = data;
      }, function(data){});
    }

    function getPrdList(){
      var _q = testService.getPrdList();
      _q.then(function(data){
        $scope.prdList = data.list;
      }, function(data){});
    }

    function setSize( num ){
      var windowHeight = window.innerHeight;

      $('#trade-index-fix-content').css('top', num + 'px');
      $('#buildBox').css('top', num + 'px');
      $('#buildBox').css('height', ( windowHeight - num ) / windowHeight * 100  + '%');
    }

    //relocate the the main content position
    try{
      var _pl = $cordovaDevice.getPlatform();
      if(_pl.indexOf('iOS') != -1){
        setSize( 178 );
      }
      else if(_pl.indexOf('Android') != -1){
        setSize( 160 );
      }
    }catch(e){
      setSize( 160 );
    }


/**********pyb add**********/

    //空白处点击关闭toggle
    $scope.toggleClose = function(){
      if( !$scope.my.toggle ){
        $scope.toggle();
      }
    }

    //选择：粤银、粤铜、粤油tabs
    $scope.chooseTab = function(index){
      $("#tab" + index).addClass("down");
      $("#tab" + index + " div i").removeClass("ion-arrow-up-c");
      $("#tab" + index + " div i").addClass("ion-arrow-down-c");

      $("#tab" + index).siblings().removeClass("down");
      $("#tab" + index).siblings().find("i").removeClass("ion-arrow-down-c");
      $("#tab" + index).siblings().find("i").addClass("ion-arrow-up-c");


      switch( index ){
        case 1:{
          $scope.my.product="粤银"; break;
        }
        case 2:{
          $scope.my.product="粤铜"; break;
        }
        case 3:{
          $scope.my.product="粤油"; break;
        }
      }

    }

/*********** pop-modal **************/

    //监听当前页面号$scope.my.popUpPage：-1表示交易有礼，0表示盈亏设置，1表示未平仓详细信息，2表示已平仓详细信息。（-2是初始化，表示不在任何一个页面）
    $scope.$watch('my.popUpPage', function(newdata, olddata){
      if(newdata == '-2'){
        $scope.closeModal();
      } else{
        $scope.openModal();
      }
    });

    //打开盈亏设置
    $scope.profitSetting = function(data){
      $scope.my.profitSettingLastPage = $scope.my.popUpPage;//保存当前页面
      $scope.my.popUpPage = 0;//显示盈亏设置
    }

    //关闭盈亏设置，返回上一层
    function profitSettingClose(){
      if( $scope.my.profitSettingLastPage == -2 ){//从建仓中 打开盈亏设置

        if( 1 ){//判断是否弹出交易有礼
          $scope.my.popUpPage = -1;//交易有礼

        }else{
          $scope.my.popUpPage = -2;//关闭弹出窗口
        }

      }else{//从未平仓详情中 打开盈亏设置
        $scope.my.popUpPage = $scope.my.profitSettingLastPage;//返回前一页面
        $scope.my.profitSettingLastPage = -2;
      }
    }

    //盈亏设置保存
    $scope.profitSettingSave = function(){
      //保存数据到后台，修改 $scope.my.popData
      console.log("已保存");

      profitSettingClose();
    }

    //点击 pop-modal右上角的关闭按钮
    $scope.closeBtn = function(){
      if( $scope.my.popUpPage ){ //当前显示：详细信息（已平仓/未平仓），或者交易有礼
        $scope.my.popUpPage = -2;//关闭

      }else{ //当前显示 盈亏设置
        profitSettingClose();
      }
    }

    //查看详情
    $scope.showDetail = function( data ){
      $scope.my.popData = data;
      $scope.my.popUpPage = 1;//未平仓详细信息
    }

    //查看详情 -> 点击平仓按钮
    $scope.close = function(data){
      $scope.closeComfirm(data);//平仓确认
    }

    //点击送赢家券按钮
    $scope.sendWinTicket = function(){
      //do something
      $scope.my.popUpPage = -2;//关闭
    }

    //确认建仓 -> 盈亏设置 ->交易有礼 领取
    $scope.receiveGift = function(){
      //修改后台数据
      console.log("领取交易有礼");
      $scope.my.popUpPage = -2;//关闭
    }

/*********** pop-modal **************/

    //平仓确认
    $scope.closeComfirm = function( data ){

      var confirmPopup = $ionicPopup.confirm({
        template:
        '<div style="padding-left: 5%; padding-top: 0px; font-size: 16px">' +
        '<div>'+ data.prdDesc + '：'+ data.weight + ' ' + data.price + '/手</div> ' +
        '<div style="margin: 5% 0%" ng-show=" ' + data.orderType + '">方向：多</div>' +
        '<div style="margin: 5% 0%" ng-show=" ' + !data.orderType + '">方向：空</div>' +
        '<div>盈亏：-12元（-10.5%）</div>' +
        '<br/><br/>' +
        '</div>',

        buttons: [{
          text: '取消',
          type: 'button-positive',
          onTap: function(e) {
            console.log("not sure");
          }
        }, {
          text: '确定',
          type: 'button-positive',
          onTap: function(e) {
            //修改后台数据
            if( $scope.my.popUpPage == -2 ){//直接点击“平仓”按钮，pop-modal没打开.初始化$scope.my.popData
              $scope.my.popData = data;
            }
            $scope.my.popUpPage = 2;//显示已平仓详细信息
          }
        }]
      });
    }

//建仓

    //显示建仓div
    function showBuildDiv(){
      $rootScope.hideTabs = true;//隐藏tabs
      $("#buildBox").css("display", "block");//显示
      $scope.my.buildRiseFlag = true;//上升效果
    }

    //关闭建仓div
    function hideBuildDiv(){
      $scope.my.buildRiseFlag = false;//取消上升效果
      $scope.my.buildDropFlag = true;//下降效果
      $rootScope.hideTabs = false;//显示tabs
      $scope.my.upOrDownBtn = -1;//没选择买涨和买跌

      $timeout( function(){
        $("#buildBox").css("display", "none");//隐藏
        $scope.my.buildDropFlag = false;//取消下降效果
      }, 500 );
    }

    //根据id查找对应数据
    function getDataById( list, id ){
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === parseInt(id)) {
          return list[i];
        }
      }
      return null;
    }

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
      }
    });

    //监听来自微盘交易登录页面的事件
    ionic.EventController.on('tradePswEvent', function(){
      var _tradePsw = localStorage.getItem('tradePswSuccess');//localStorage是本地存储
      if(_tradePsw){
        $scope.my.tradePsw = true;//本作用域的数据。已登录
      }

      //19分钟后自动退出微盘交易，重新输入密码
      var t = $timeout( function(){
        localStorage.removeItem('tradePswSuccess');
        $scope.my.tradePsw = false;//本作用域的数据。未登录
        $timeout.cancel( t );
      }, 19*60000);

    })

    //买涨、买跌
    $scope.buy = function( upOrDownBtn, id ){

      $scope.my.upOrDownBtn = upOrDownBtn; //买涨 0、买跌 1

      if( $scope.my.login ){
        showBuildDiv();
        $scope.my.buildData = getDataById( $scope.prdList, id);
      }else{
        $location.path('/login/login');//跳转到登录页面
      }

    }

    //建仓 -> 选择手数
    $scope.selectAmount = function( index ){

      $("#amountRadio").find(".col").removeClass("selected_bg");
      $("#amountRadio").find(".col").addClass("unselected_bg");
      $("#option"+index).removeClass("unselected_bg");
      $("#option"+index).addClass("selected_bg");
    }

    //取消建仓
    $scope.buildCancel = function(){
      hideBuildDiv();
    }

    //建仓后修改样式
    function buildConfirmStyle(id){

      //设置按钮不可用
      switch( id ){
        case 1: $scope.my.buttonDisabled.btn1 = true; break;
        case 2: $scope.my.buttonDisabled.btn2 = true; break;
        case 3: $scope.my.buttonDisabled.btn3 = true; break;
        case 4: $scope.my.buttonDisabled.btn4 = true; break;
        case 5: $scope.my.buttonDisabled.btn5 = true; break;
        case 6: $scope.my.buttonDisabled.btn6 = true; break;
      }

      //呈现效果
      if( !$scope.my.upOrDownBtn ){//买涨 0
        $("#up"+id).addClass("chooseUpBtn");

      }else if( $scope.my.upOrDownBtn == 1 ){//买跌 1
        $("#down"+id).addClass("chooseDownBtn");
      }
    }

    //确认建仓
    $scope.buildConfirm = function( id ){
      if( !$scope.my.tradePsw ){//未输入微盘交易密码
        $location.path("/login/inputPsw/1"); //输入交易密码

      } else{
        $scope.my.popData = $scope.my.buildData;//获取弹出窗口的数据
        $scope.my.popUpPage = 0;//显示盈亏设置
        //修改后台数据

        buildConfirmStyle(id);
      }

      //没有弹出框，则隐藏建仓div
      $scope.$watch('my.popUpPage', function(newdata, olddata){
        if(newdata == '-2'){//没有弹出框
          hideBuildDiv();
        }
      });

    }

  })


/**
 * 个人中心首页
 */
  .controller('accountIndexController', function($scope, $ionicHistory,  $rootScope, $stateParams, $location, $state, testService){

    $scope.my = { login:false }
    var _islogin = localStorage.getItem('loginSuccess');
    if(_islogin){
      $scope.my.login = true;
    }else{
      $location.path('/login/login');//跳转到登录页面
    }

    //监听来自登录页面的事件
    ionic.EventController.on('loginEvent', function(){
      var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
      if(_islogin){
        $scope.my.login = true;//本作用域的数据。已登录
      }
    });

    //监听来自退出页面的事件 ( pyb add)
    ionic.EventController.on('logoutEvent', function(){
      var _islogin = localStorage.getItem('loginSuccess');//localStorage是本地存储
      if(_islogin){
      }else{
        $scope.my.login = false;//本作用域的数据。未登录
        $location.path('/login/login');//跳转到登录页面
      }
    });
  })

  .controller('registerIndexController', function($scope, $rootScope, $stateParams, $location, $ionicHistory, testService){
    $scope.my = {isChecked:false, isDisabled:true, teamName:''};

    $scope.next = function(path){
      $location.path(path);
      //$scope.my.teamName = '';
      //$scope.my.isChecked = false;
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    //监听输入
    function watchInput(){

      if( $scope.my.isChecked  &&  $scope.my.teamName != ''){//已输入手机号、已勾选协议
        $scope.my.isDisabled = false;

      } else {//没输入手机号 或者没勾选协议，不可点击
        $scope.my.isDisabled = true;
      }
    }

    //监听是否勾选
    $scope.$watch('my.isChecked', function(newdata, olddata){
      watchInput();
    });

    //监听手机号
    $scope.$watch('my.teamName', function(newdata, olddata){
      watchInput();
    });

  })

  .controller('validatePhoneNoController', function($scope, $stateParams, $location, $interval, testService){
    $scope.my = {isChecked:false, vCode:'', timeup:true, countdown:"验证码"};
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

    $scope.next = function(path){
      $location.path(path);
      $scope.my.vCode = '';
    }

    $scope.$watch('my.vCode', function(newdata, olddata){
      if(newdata.trim() == ''){//没输入
        $scope.my.isChecked = false;
      }
      else{
        //判断输入是否正确
        $scope.my.isChecked = true;
      }
    });
  })

  .controller('setPwdController', function($scope, $stateParams, $ionicHistory,  $location, testService){
    $scope.my = { isChecked:true, isDisabled:true, pwd:'', repwd:'', code:'' };

    //显示弹出窗口
    $scope.submitRegister = function(){
      //TODO, submit the user information
      $scope.openModal();

    }

    //关闭弹出窗口后调用的方法
    $scope.callBack = function(){
      $ionicHistory.goBack(-3);
      $scope.my.pwd = '';
      $scope.my.repwd = '';
      $scope.my.code = '';
    }


    //监听输入
    function watchInput(){

      if($scope.my.pwd != $scope.my.repwd){//两次密码不同
        $scope.my.isChecked = false;
        $scope.my.isDisabled = true;

      } else{//两次密码相同
        $scope.my.isChecked = true;
        if( $scope.my.pwd != ''  &&  $scope.my.code != '' ) {//两次密码相同且都不为空，且code不为空
          $scope.my.isDisabled = false;
        }else{
          $scope.my.isDisabled = true;
        }
      }

    }

    //监听密码（防止输入全部信息后，再更改密码）
    $scope.$watch('my.pwd', function(newdata, olddata){
      if( $scope.my.repwd != ''){//不是首次输入
        watchInput();
      }
    });

    //监听”重复输入确认密码“
    $scope.$watch('my.repwd', function(newdata, olddata){
     watchInput();
    });

    //监听邀请码
    $scope.$watch('my.code', function(newdata, olddata){
      watchInput();
    });

  })




