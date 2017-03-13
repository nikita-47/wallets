angular.module('app.core').run(['$templateCache', function($templateCache) {$templateCache.put('src/app/index.html','<!doctype html><html data-ng-app=app ng-strict-di><head><meta charset=utf-8><title>User wallets</title><link rel="shortcut icon" href=favicon.ico type=image/x-icon><link rel=stylesheet href=/bower_components/semantic-ui-calendar/dist/calendar.min.css><link rel=stylesheet href=/bower_components/semantic/dist/semantic.min.css><link rel=stylesheet href=/bower_components/toastr/toastr.min.css><link rel=stylesheet href=styles/main.css><link rel=stylesheet href=css/vendor.min.css><link rel=stylesheet href=css/main.min.css></head><body><div class="main ui"><h1 class="ui dividing centered header">User wallets</h1><div ui-view></div></div><script type=text/javascript src=/bower_components/jquery/dist/jquery.min.js></script><script type=text/javascript src=/bower_components/angular/angular.min.js></script><script type=text/javascript src=/bower_components/angular-ui-router/release/angular-ui-router.min.js></script><script type=text/javascript src=/bower_components/moment/moment.js></script><script type=text/javascript src=/bower_components/semantic-ui-calendar/dist/calendar.min.js></script><script type=text/javascript src=/bower_components/semantic/dist/semantic.min.js></script><script type=text/javascript src=/bower_components/toastr/toastr.min.js></script><script type=text/javascript src=/src/app/app.module.js></script><script type=text/javascript src=/src/app/users/config.route.js></script><script type=text/javascript src=/src/app/users/users.js></script><script type=text/javascript src=/src/app/users/users.module.js></script><script type=text/javascript src=/src/app/transactions/config.route.js></script><script type=text/javascript src=/src/app/transactions/transactions.js></script><script type=text/javascript src=/src/app/transactions/transactions.module.js></script><script type=text/javascript src=/src/app/detail/config.route.js></script><script type=text/javascript src=/src/app/detail/detail.js></script><script type=text/javascript src=/src/app/detail/detail.module.js></script><script type=text/javascript src=/src/app/core/config.js></script><script type=text/javascript src=/src/app/core/constants.js></script><script type=text/javascript src=/src/app/core/core.module.js></script><script type=text/javascript src=/src/app/core/dataservice.js></script><script type=text/javascript src=/src/app/router/router.module.js></script><script type=text/javascript src=/src/app/router/routerhelper.js></script><script type=text/javascript src=js/vendor.min.js></script><script type=text/javascript src=js/app.min.js></script></body></html>');
$templateCache.put('src/app/detail/detail.html','<div class="ui container"><div class="ui stackable two column grid"><div class=row><button class="ui button" ui-sref=user-list>Back to all users</button></div><div class=row><div class="eight wide column"><div class="ui segment"><h3 class="ui header" ng-if=!vm.id>Create new user</h3><h3 class="ui header" ng-if=vm.id>Update user</h3><form class="ui form" ng-submit=vm.submitUser(vm.user) novalidate><div class=field><label>User ID</label> <input ng-disabled=vm.id ng-model=vm.user.user_id type=text name=user-id placeholder="User ID"></div><div class=field><label>User Name</label> <input ng-model=vm.user.user_name type=text name=user-name placeholder="User Name"></div><div class=field><label>Custom parameter for user identification</label> <input type=text name=parameter ng-model=vm.user.user_custom placeholder="Custom parameter for user identification"></div><div class=field><label>Email</label> <input ng-model=vm.user.email type=text name=email placeholder=Email></div><div class=field ng-if=vm.id><div class="ui checkbox"><input type=checkbox name=enabled title=Enabled ng-model=vm.user.enabled> <label>Enabled</label></div></div><button class="ui positive button" type=submit ng-if=vm.id ng-disabled=vm.isLoading>Update</button> <button class="ui positive button" type=submit ng-if=!vm.id ng-disabled=vm.isLoading>Create</button></form><loader loading="{{ vm.isLoading }}"></loader><div ng-repeat="error in vm.errors" class="ui negative message"><div ng-if=error.header class=header>{{ error.header }}</div><p>{{ error.message }}</p></div></div></div><div class="eight wide column" ng-if=vm.id><div class="ui grid"><div class=row><div class="sixteen wide column"><div class="ui segment"><div class="ui horizontal tiny statistics"><div class="ui statistic"><div class=value>{{ vm.user.register_date | date : "dd/MM/yyyy" }}</div><div class=label>Register date</div></div><div class=statistic ng-if=vm.user.wallet_currency><div class=value>{{ vm.user.wallet_currency }}</div><div class=label>Currency</div></div><div class=statistic><div class=value>{{ vm.user.balance }}</div><div class=label>Balance</div></div><div class=statistic><div class=value>{{ vm.user.wallet_amount }}</div><div class=label>Wallet Amount</div></div></div><button class="ui positive button" ui-sref="transactions({ id: vm.user.user_id })">Show transactions</button><loader loading="{{ vm.isLoading }}"></loader></div></div></div><div class=row><div class="sixteen wide column"><div class="ui segment"><form ng-submit=vm.submitRecharge() class="ui form" novalidate><div class=field><label>Amount</label> <input type=number name=amount ng-model=vm.newRecharge.amount placeholder=Amount></div><div class=field><label>Comment</label> <input type=text ng-model=vm.newRecharge.comment name=comment placeholder=Comment></div><button class="ui positive button" type=submit ng-disabled=vm.isLoadingRecharge>New recharge</button><loader loading="{{ vm.isLoadingRecharge }}"></loader></form><div ng-repeat="error in vm.errorsRecharge" class="ui negative message"><div ng-if=error.header class=header>{{ error.header }}</div><p>{{ error.message }}</p></div></div></div></div></div></div></div></div></div>');
$templateCache.put('src/app/transactions/transactions.html','<div class="ui container"><div class="ui grid"><div class=row><button class="ui button" ui-sref="detail({ id: vm.id })">Back to profile</button></div><div class=row><div class="ui segment"><div class="ui middle aligned selection divided list"><h3>Range</h3><form class="ui form" ng-submit=vm.reloadTrans()><div class="three fields"><div class=field><label>Start date</label><div class="ui calendar" id=rangeStart><div class="ui input left icon"><i class="calendar icon"></i> <input type=text value="{{ vm.params.datetimeFrom }}"></div></div></div><div class=field><label>End date</label><div class="ui calendar" id=rangeEnd><div class="ui input left icon"><i class="calendar icon"></i> <input type=text value="{{ vm.params.datetimeTo }}"></div></div></div><div class=field><label>Type</label><select class="ui search selection dropdown" ng-model=vm.params.transType ng-init="vm.params.transType = vm.params.transType || vm.types[0].value" ng-options="type.value as type.name for type in vm.types"></select></div></div><button class="ui button">Reload</button></form><table class="ui single striped line table"><thead><tr><th>Date (UTC)</th><th>Operation ID</th><th>Transaction ID</th><th>Coupon ID</th><th>Coupon Code</th><th>Transaction Type</th><th>Comment</th><th>Amount</th><th>Sum</th><th>Currency</th><th>Status</th></tr></thead><tbody><tr ng-repeat="transaction in vm.transactions"><td>{{ transaction.dateFormated }}</td><td>{{ transaction.operation_id }}</td><td>{{ transaction.transaction_id }}</td><td>{{ transaction.coupon_id }}</td><td>{{ transaction.coupon_code }}</td><td>{{ transaction.transaction_type }}</td><td>{{ transaction.comment }}</td><td>{{ transaction.amount }}</td><td>{{ transaction.sum }}</td><td>{{ transaction.currency }}</td><td>{{ transaction.status }}</td></tr></tbody></table><loader loading="{{ vm.isLoading }}"></loader><div ng-if="vm.transactions == 0" class="ui warning message"><div class=header>No transactions</div></div></div></div></div></div></div>');
$templateCache.put('src/app/users/users.html','<div class="ui main text container"><div class="ui grid"><div class="left aligned eight wide column"><button class="ui button" ui-sref=detail>Create new user</button></div><div class="right aligned eight wide column"><div class="ui compact menu"><div class="ui simple dropdown item">{{ vm.pageParams.limit }} users per page <i class="dropdown icon"></i><div class=menu><div class=item ng-if="choice != vm.pageParams.limit" ng-click=vm.selectPerPage(choice) ng-repeat="choice in vm.perPageChoices">{{ choice }}</div></div></div></div></div></div><div class="ui divided list segment user-list"><div class=item ng-repeat="user in vm.users"><div class="ui grid"><div class="left aligned six wide column"><div class=header>{{ user.user_name }} {{ user.user_custom ? \'(\' + user.user_custom + \')\' : \'\' }}</div><div class=meta><a ng-if=user.email href=mailto:{{this.props.email}}>{{ user.email }}</a><br ng-if=user.email><span class=date>Register date: {{ user.register_date | date : "dd/MM/yyyy" }}</span></div></div><div class="left aligned six wide column"><div class=meta><span>Currency: {{ user.wallet_currency ? user.wallet_currency : \'not set\' }}</span><br><span>Balance: {{ user.balance }}</span><br><span>Wallet Amount: {{ user.wallet_amount }}</span></div></div><div class="right aligned four wide column"><button class="ui button" ng-click=vm.openUser(user.user_id)>View profile</button></div></div></div><loader loading="{{ vm.isLoading }}"></loader></div><div class="ui pagination menu" ng-if="vm.pages.length > 1"><a class=item ng-class="{ active: page == vm.currentPage, disabled: page == \'...\' }" ng-click="vm.setPage(page - 1)" ng-repeat="page in vm.pages track by $index">{{ page }} {{ page.isInteger() }}</a></div></div>');}]);