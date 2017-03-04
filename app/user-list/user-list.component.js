'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: function UserListController() {
      this.users = [
        {
          "user_id": 0,
          "user_name": "John",
          "user_custom": "Smith",
          "email": "email@example.com",
          "register_date": "2014-12-08T21:44:32-08:00",
          "balance": 100,
          "wallet_amount": 1.5,
          "wallet_currency": "USD",
          "enabled": true
        }, {
          "user_id": 1,
          "user_name": "Nick",
          "user_custom": "Smith",
          "email": "email1@example.com",
          "register_date": "2014-05-08T21:44:32-08:00",
          "balance": 100,
          "wallet_amount": 1.5,
          "wallet_currency": "USD",
          "enabled": true
        }, {
          "user_id": 2,
          "user_name": "Mary",
          "user_custom": "Smith",
          "email": "email2@example.com",
          "register_date": "2014-01-30T21:44:32-08:00",
          "balance": 100,
          "wallet_amount": 1.5,
          "wallet_currency": "USD",
          "enabled": true
        }
      ];
    }
  });
