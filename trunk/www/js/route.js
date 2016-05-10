/**
 * Created by Allen Wong on 15/10/19.
 *
 * MVC page router configuration
 */
tzqApp
  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
/*****************************************************************************/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');


    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('ios');
  })

  .config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller:'tabsController'
    })

  .state('tab.index', {
      url:'/index',
      views:{
        'app-index':{
          templateUrl:'templates/teams/index.html',
          controller:'indexController'
        }
      }
  })
    .state('tab.team-rankSummary', {
      url:'/teamRank',
      views:{
        'app-index':{
          templateUrl:'templates/teams/rank-summary.html',
          controller:'rankSummaryController'
        }
      }
    })
    .state('team-creation.search', {
      url:'/search',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/search.html',
          controller:'searchController'
        }
      }
    })
    .state('team-creation.searchResult', {
      url:'/searchResult/:name',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/searchResult.html',
          controller:'searchResultController'
        }
      }
    })
    .state('team-creation.joinRequest', {
      url:'/joinRequest',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/joinRequest.html',
          controller:'joinRequestController'
        }
      }
    })

  /**组队**/
    .state('team-creation', {
      url:'/team-creation',
      cache:'false',
      abstract: true,
      templateUrl:'templates/teamcreation/index.html',
      controller:'creationController'
    })
    .state('team-creation.rule', {
      url:'/rule',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/01_rule.html',
          controller:'teamCreationController'
        }
      }
    })
    .state('team-creation.action', {
      url:'/action',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/02_action.html',
          controller:'actionController'
        }
      }
    })
    .state('team-creation.teamtype', {
      url:'/teamtype',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/03_teamtype.html',
          controller:'teamTypeSelectController'
        }
      }
    })
    .state('team-creation.authentication', {
      url:'/authentication',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/03-04_authentication.html',
          controller:'teamAuthenticationController'
        }
      }
    })
    .state('team-creation.teamname', {
      url:'/teamname/:type',
      views:{
        'team-creation':{
          templateUrl:'templates/teamcreation/04_teamname.html',
          controller:'teamNameController'
        }
      }
    })

  /**
   * 个人中心
   */
    .state('tab.account-index', {
      url:'/account-index',
      views:{
        'tab-account':{
          templateUrl:'templates/account/index.html',
          controller:'accountIndexController'
        }
      }
    })
    .state('tab.account-news', {
      url:'/account-news',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-news.html',
          controller:'accountNewsController'
        }
      }
    })
    .state('tab.account-news-content', {
      url:'/account-news-content/:id',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-news-content.html',
          controller:'accountNewsContentController'
        }
      }
    })
    .state('tab.account-news-content-systemNews', {
      url:'/account-news-content-systemNews/:id',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-news-content-systemNews.html',
          controller:'accountNewsContentSystemNewsController'
        }
      }
    })
    .state('tab.account-news-content-tradeNews', {
      url:'/account-news-content-tradeNews',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-news-content-tradeNews.html',
          controller:'accountNewsContentTradeNewsController'
        }
      }
    })
    .state('tab.account-history', {
      url:'/account-history',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-history.html',
          controller:'accountHistoryController'
        }
      }
    })
    .state('tab.account-brokers', {
      url:'/account-brokers',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-brokers.html',
          controller:'accountBrokersController'
        }
      }
    })
    .state('tab.account-dynamic', {
      url:'/account-dynamic',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-dynamic.html',
          controller:'accountDynamicController'
        }
      }
    })
    .state('tab.account-collection', {
      url:'/account-collection',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-collection.html',
          controller:'accountCollectionController'
        }
      }
    })
    .state('tab.account-setting', {
      url:'/account-setting',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-setting.html',
          controller:'accountSettingController'
        }
      }
    })
    .state('tab.account-setting-info', {
      url:'/account-setting-info',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-setting-info.html',
          controller:'accountSettingInfoController'
        }
      }
    })
    .state('tab.account-setting-push', {
      url:'/account-setting-push',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-setting-push.html',
          controller:'accountSettingPushController'
        }
      }
    })
    .state('tab.account-setting-feedback', {
      url:'/account-setting-feedback',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-setting-feedback.html',
          controller:'accountSettingFeedbackController'
        }
      }
    })

    .state('tab.account-brokers-income', {
      url:'/account-brokers-income',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-brokers-income.html',
          controller:'accountIncomeController'
        }
      }
    })
    .state('tab.account-brokers-customer', {//客户
      url:'/account-brokers-customer',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-brokers-customer.html',
          controller:'accountCustomerController'
        }
      }
    })
    .state('tab.account-brokers-close', {//平仓
      url:'/account-brokers-close',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-brokers-close.html',
          controller:'accountCloseController'
        }
      }
    })
    .state('tab.account-brokers-position', {//持仓
      url:'/account-brokers-position',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-brokers-position.html',
          controller:'accountPositionController'
        }
      }
    })
    .state('tab.account-winTicket', {
      url:'/account-winTicket',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-winTicket.html',
          controller:'accountWinTicketController'
        }
      }
    })
    .state('tab.account-winTicket-recommendGift', {
      url:'/account-winTicket-recommendGift',
      views:{
        'tab-account':{
          templateUrl:'templates/account/account-winTicket-recommendGift.html',
          controller:'accountWinTicketRecommendGiftController'
        }
      }
    })

  /**
   * 交易中心
   */
    .state('tab.trade-index', {
      url:'/trade-index',
      views:{
        'tab-trade':{
          templateUrl:'templates/trade/index.html',
          controller:'tradeIndexController'
        }
      }
    })

  /**
   * 关注首页
   */
    .state('tab.sub-index', {
      url:'/sub-index',
      views:{
        'tab-subscrib':{
          templateUrl:'templates/sub/index.html',
          controller:'subIndexController'
        }
      }
    })
  /**
   * 发现首页
   */
    .state('tab.discovery-index', {
      url:'/discovery-index',
      views:{
        'tab-discovery':{
          templateUrl:'templates/discovery/index.html',
          controller:'discoveryIndexController'
        }
      }
    })
    .state('tab.discovery-detail', {
      url:'/discovery-detail/:id',
      views:{
        'tab-discovery':{
          templateUrl:'templates/discovery/discovery-detail.html',
          controller:'discoveryDetailController'
        }
      }
    })

  /**
   * 注册
   */
    .state('register', {
      url:'/register',
      abstract: true,
      templateUrl:'templates/register/index.html',
      controller:'registerIndexController'
    })
    .state('register.phone-no', {
      url:'/phone-no',
      views:{
        'register':{
          templateUrl:'templates/register/01_phone.html',
          controller:'registerIndexController'
        }
      }

    })
    .state('register.phone-no-validate', {
      url:'/phone-no-validate',
      views:{
        'register':{
          templateUrl:'templates/register/02_phone_validate.html',
          controller:'validatePhoneNoController'
        }
      }

    })
    .state('register.set-pwd', {
      url:'/set-pwd',
      views:{
        'register':{
          templateUrl:'templates/register/03_setPwd.html',
          controller:'setPwdController'
        }
      }
    })

  /**
   * 登录
   */
    .state('login', {
      url:'/login',
      abstract: true,
      templateUrl:'templates/login/index.html',
    })
    .state('login.login', {
      url:'/login',
      views:{
        'login': {
          templateUrl: 'templates/login/login.html',
          controller:'loginController'
        }
      }
    })
    .state('login.inputPsw', {
      url:'/inputPsw/:id',
      views:{
        'login':{
          templateUrl:'templates/login/inputPsw.html',
          controller:'InputPswController'
        }
      }
    })
    .state('login.forgetPsw', {
      url:'/forgetPsw/:id',
      views:{
        'login': {
          templateUrl: 'templates/login/forgetPsw.html',
          controller: 'ForgetPswController'
        }
      }
    })
    .state('login.changePsw', {
      url:'/changePsw/:id',
      views:{
        'login':{
          templateUrl:'templates/login/changePsw.html',
          controller:'ChangePswController'
        }
      }
    })


    //发帖
    .state('teamIndex.team-index-posts', {
      url:'/team-index-posts',
      views: {
        'teamIndex': {
          templateUrl: 'templates/team-index/team-index-posts.html',
          controller: 'teamIndexPostsController'
        }
      }
    })

    //申请退出
    .state('teamIndex.team-index-quit', {
      url:'/team-index-quit',
      views: {
        'teamIndex': {
          templateUrl: 'templates/team-index/team-index-quit.html',
          controller: 'teamIndexQuitController'
        }
      }
    })

    ////////////////////////////公共模板/////////////////////////////

    .state('teamIndex', {
      url:'/teamIndex',
      abstract: true,
      cache: false, //不缓存，每次离开就清空这个view的缓存。继承它的view之间切换，缓存不清空
      templateUrl: 'templates/team-index/index.html',
    })

    //index-team
    .state('teamIndex.team-index', {
      url:'/:tabName/team-index/:id',
      views: {
        'teamIndex': {
          templateUrl: 'templates/team-index/team-index.html',
          controller: 'teamIndexPageController'
        }
      }
    })

    //圈内公告
    .state('teamIndex.team-index-notice', {
      url:'/team-index-notice',
      views: {
        'teamIndex': {
          templateUrl: 'templates/team-index/team-index-notice.html',
          controller: 'teamIndexNoticeController'
        }
      }
    })

    //邀请
    .state('teamIndex.team-index-invite', {
      url:'/team-index-invite/:id',
      views:{
        'teamIndex':{
          templateUrl:'templates/team-index/team-index-invite.html',
          controller:'inviteController'
        }
      }
    })

    //帖子详情
    .state('teamIndex.team-index-tab-discuss-detail', {
      url:'/:tabName/team-index-tab-discuss-detail/:id',
      views: {
        'teamIndex': {
          templateUrl: 'templates/team-index/team-index-tab-discuss-detail.html',
          controller: 'teamIndexTabDiscussDetailController'
        }
      }

    })
    //【重复】（account->我的动态/我的收藏->帖子详情、account->消息），为了执行控制器初始化语句
    .state('tab.account-detail', {
      url:'/:tabName/account-detail/:id',
      views: {
        'tab-account': {
          templateUrl: 'templates/team-index/team-index-tab-discuss-detail.html',
          controller: 'teamIndexTabDiscussDetailController'
        }
      }

    })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/index');

});


