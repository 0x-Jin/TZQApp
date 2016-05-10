/**
 * service class
 * @type {module|*}
 */
var tzqAppServices = angular.module('tzqApp.services', []);

/**
 *
 */
tzqAppServices.service('testService', function($http, $q){

  /**
   * 获取首页排行榜数据
   * @returns {*}
   */
  this.getTop10 = function(){
    return request('GET', 'testData/top10.json', {});
  }

  /**
   * 获取总榜的排名数据
   * @returns {*}
   */
  this.getRank = function(){
    return request('GET', 'testData/rank.json', {});
  }


  this.getChartTestData = function(){
    //return jsonpRequest('http://www.highcharts.com/samples/data/jsonp.php?a=e&filename=aapl-ohlc.json&callback=JSON_CALLBACK');
    return request('GET', 'testData/chat.json');
  }

  /**
   * 获取组队规则
   * @returns {*}
   */
  this.getCreateTeamRule = function(){
    return request('GET', 'testData/create_team_rule.json');
  }

  this.searchTeamListByKeyword = function(key){
    return request('GET', 'testData/team-list.json');
  }

  this.getTeamMemberList = function(){
    return request('GET' ,'testData/team-member-list.json');
  }

  this.getDiscussList = function(){
    return request('GET', 'testData/team-discuss-list.json');
  }

  this.getRecommendList = function(){
    return request('GET', 'testData/sub-recommend-list.json');
  }
  //获取用户当前的持仓单-trade-index
  this.getTradeOrderList = function(){
    return request('GET', 'testData/order-list.json');
  }

  //获取系统产品列表-trade-index
  this.getPrdList = function(){
    return request('GET', 'testData/product-list.json');
  }

//pyb add

  //根据id 获取后台数据
  this.getById = function( list, id ){
    for (var i = 0; i < list.length; i++) {
      if (list[i].member.id === parseInt(id)) {
        return list[i];
      }
    }
    return null;
  }

  this.getSubList = function(){
    return request('GET', 'testData/sub-list.json');
  }

  this.getAccountDynamicList = function(){
    return request('GET', 'testData/account-dynamic-list.json');
  }

  this.getAccountCollectionList = function(){
    return request('GET', 'testData/account-collection-list.json');
  }

  this.getAccountHistoryList = function(){
    return request('GET', 'testData/account-history-list.json');
  }

  this.getAccountCircleList = function(){
    return request('GET', 'testData/account-circle-list.json');
  }

  this.getAccountIncomeList = function(){
    return request('GET', 'testData/account-brokers-income-list.json');
  }
  this.getAccountCustomerList = function(){
    return request('GET', 'testData/account-brokers-customer-list.json');
  }
  this.getAccountPositionList = function(){
    return request('GET', 'testData/account-brokers-position-list.json');
  }
  this.getAccountCloseList = function(){
    return request('GET', 'testData/account-brokers-close-list.json');
  }


  //获取用户当前的持仓单-trade-index
  this.getTradeOrderList = function(){
    return request('GET', 'testData/order-list.json');
  }

  //获取系统产品列表-trade-index
  this.getPrdList = function(){
    return request('GET', 'testData/product-list.json');
  }

  this.getAccountDynamicList = function(){
    return request('GET', 'testData/account-dynamic-list.json');
  }

  this.getAccountCollectionList = function(){
    return request('GET', 'testData/account-collection-list.json');
  }

  this.getAccountHistoryList = function(){
    return request('GET', 'testData/account-history-list.json');
  }

  this.getAccountIncomeList = function(){
    return request('GET', 'testData/account-brokers-income-list.json');
  }
  this.getAccountCustomerList = function(){
    return request('GET', 'testData/account-brokers-customer-list.json');
  }
  this.getAccountPositionList = function(){
    return request('GET', 'testData/account-brokers-position-list.json');
  }
  this.getAccountCloseList = function(){
    return request('GET', 'testData/account-brokers-close-list.json');
  }
  this.getDiscoveryList = function(){
    return request('GET', 'testData/discovery-list.json');
  }
  this.getAccountWinTicketList = function(){
    return request('GET', 'testData/account-winTicket-list.json');
  }
  this.getAccountNewsList = function(){
    return request('GET', 'testData/account-news-list.json');
  }
  this.getAccountNewsContentList = function(){
    return request('GET', 'testData/account-news-content-list.json');
  }
  this.getTeamCreationSearchList = function(){
    return request('GET', 'testData/teamcreation-search-list.json');
  }


  function request(method, url, params){
    var deferred = $q.defer();
    $http({method: method, url:url, params:params}).
      success(function(data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject(data);
      });
    return deferred.promise;
  }

  function jsonpRequest(url, params){
    var deferred = $q.defer();
    $http.jsonp(url, params).
      success(function(data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject(data);
      });
    return deferred.promise;
  }

});



