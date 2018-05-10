/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('CardListController', [
  '$rootScope', '$scope', '$state', '$stateParams', 'CardNetwork',
  function ($rootScope, $scope, $state, $stateParams, CardNetwork) {
    $scope.goDetail = function (id) {
      $state.go('card_detail', { card_id: id || '' });
    }
    $scope.goSetting = function (id) {
      $state.go('card_setting', {});
    }
    $scope.card_list = [];
    $scope.cardList = function () {
      CardNetwork.cardList($scope, {}).then(function (data) {
        console.log(data);
        if (!data.err) {
          $scope.card_list = data;
        }
      }, function (err) {
        console.log(err);
      });
    };
    $scope.cardList();
  }]);
