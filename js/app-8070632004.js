"use strict";var walletsApp=angular.module("walletsApp",["ui.router","userList","userDetail","templates"]);walletsApp.config(["$stateProvider","$locationProvider","$routeProvider",function(e,t,r){r.when("/users",{template:"<user-list></user-list>"}).when("/users/:userId",{template:"<user-detail></user-detail>"}).otherwise("/users")}]),angular.module("userList",["core.user"]),angular.module("userList").component("userList",{templateUrl:"user-list/user-list.template.html",controller:["User","$location",function(e,t){var r=this,n={limit:2,offset:0};r.isLoading=!0,e(n,function(e){r.users=e.data.data,r.isLoading=!1},function(){r.isLoading=!1}),r.openUser=function(e){t.path("/users/"+e)}}]}),angular.module("userDetail",["ngRoute","core.user"]),angular.module("userDetail").component("userDetail",{templateUrl:"user-detail/user-detail.template.html",controller:["UserOperations","$routeParams",function(e,t){var r=this;r.userId=t.userId;var n={datetime_from:"2015-01-01T00:00:00 UTC",datetime_to:"2017-03-03T00:00:00 UTC"};r.isLoading=!0,e(this.userId,n,function(e){r.isLoading=!1,r.transactions=e.data},function(){r.isLoading=!1})}]}),angular.module("core.user",["core-api"]),angular.module("core.user").factory("User",["api","$http",function(e,t){return function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e(t).getList("/users",r,n,u)}}]).factory("UserOperations",["api","$http",function(e,t){return function(r,n){var u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e(t).getList("/users/"+r+"/transactions",n,u,i)}}]),angular.module("core-api",[]),angular.module("core-api").factory("api",[function(){var e="https://livedemo.xsolla.com/fe/test-task/baev";return function(t){function r(e,t,r){return t&&r?e.then(function(e){t(e)},function(e){e(e)}):r?e.then(function(e){e(e)}):t?e.then(function(e){t(e)}):e}function n(n){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o="";if(u){o="?";for(var s in u)u.hasOwnProperty(s)&&(o+=s+"="+u[s]+"&");o=o.slice(0,-1)}var l=t.get(e+n+o);return r(l,i,a)}function u(n,u,i,a){u||(u={});var o=t.put(e+n,u);return r(o,i,a)}function i(n,u,i,a){var o=t.post(e+n,u);return r(o,i,a)}return{update:u,create:i,getList:n}}}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyJdLCJuYW1lcyI6WyJ3YWxsZXRzQXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsInRlbXBsYXRlIiwiJHN0YXRlUHJvdmlkZXIiLCJvdGhlcndpc2UiLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJjb250cm9sbGVyIiwic2VsZiIsImxpbWl0IiwiVXNlciIsInBhcmFtcyIsInJlc3AiLCJjb21wb25lbnQiLCJpc0xvYWRpbmciLCJ0ZW1wbGF0ZVVybCIsIiRsb2NhdGlvbiIsInRoaXMiLCJvZmZzZXQiLCJ1c2VySWQiLCIkcm91dGVQYXJhbXMiLCJ1c2VycyIsImRhdGEiLCJkYXRldGltZV9mcm9tIiwiZGF0ZXRpbWVfdG8iLCJVc2VyT3BlcmF0aW9ucyIsInN1Y2Nlc3NDYiIsImVycm9yQ2IiLCIkaHR0cCIsImZhY3RvcnkiLCJpZCIsInJlc3BvbnNlIiwiYmFzZVVybCIsInRyYW5zYWN0aW9ucyIsImVycm9yIiwiYXBpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic3VjY2VzcyIsImdldExpc3QiLCJxIiwiYWRkQ2FsbGJhY2tzIiwidGhlbiIsInJlc3VsdCIsInVwZGF0ZSIsInVybCIsInBhcmFtc1N0cmluZyIsImtleSIsImhhc093blByb3BlcnR5Iiwic2xpY2UiLCJnZXQiLCJwdXQiLCJjcmVhdGUiLCJwb3N0Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFBLElBQUFBLFlBQUFDLFFBQUFDLE9BQUEsY0FDRSxZQURGLFdBR0UsYUFJRkYsYUFBQUEsWUFDR0csUUFBQUEsaUJBQUFBLG9CQUFBQSxpQkFVT0MsU0FBVUMsRUFFWkMsRUFUTUMsR0FhZE4sRUFWUU8sS0FBSyxVQWFYTixTQUFPLDRCQUdMTyxLQUFBQSxrQkFJVUMsU0FBTyxnQ0FFWEMsVUFBTyxhQVpqQlYsUUFnQlFXLE9BQ0VDLFlBQ1VDLGNBaEJwQmIsUUFDRUMsT0FrQlcsWUFqQlhhLFVBa0JlQyxZQWpCYkMsWUFBYSxvQ0FtQlRQLFlBQ0VR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LEVBQVdDLEdBWXBDLFFBQVNrQixHQUFPQyxFQUFLeEIsRUFBTUksRUFBV0MsR0FDL0JMLElBQ0hBLEtBRUYsSUFBTW1CLEdBQUliLEVBQU13QixJQUFJcEIsRUFBVWMsRUFBS3hCLEVBQ25DLE9BQU9vQixHQUFhRCxFQUFHZixFQUFXQyxHQVlwQyxRQUFTMEIsR0FBT1AsRUFBS3hCLEVBQU1JLEVBQVdDLEdBQ3BDLEdBQU1jLEdBQUliLEVBQU0wQixLQUFLdEIsRUFBVWMsRUFBS3hCLEVBQ3BDLE9BQU9vQixHQUFhRCxFQUFHZixFQUFXQyxHQUdwQyxPQUNFa0IsT0FBUUEsRUFDUlEsT0FBUUEsRUFDUmIsUUFBU0EiLCJmaWxlIjoianMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2FsbGV0c0FwcCA9IGFuZ3VsYXIubW9kdWxlKCd3YWxsZXRzQXBwJywgW1xyXG4gICd1aS5yb3V0ZXInLFxyXG4gICd1c2VyTGlzdCcsXHJcbiAgJ3VzZXJEZXRhaWwnLFxyXG4gICd0ZW1wbGF0ZXMnXHJcbl0pO1xyXG5cclxud2FsbGV0c0FwcFxyXG4gIC5jb25maWcoXHJcbiAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsXHJcbiAgICAgICAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIsXHJcbiAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICRyb3V0ZVByb3ZpZGVyLlxyXG4gICAgICAgIHdoZW4oJy91c2VycycsIHtcclxuICAgICAgICAgIHRlbXBsYXRlOiAnPHVzZXItbGlzdD48L3VzZXItbGlzdD4nXHJcbiAgICAgICAgfSkuXHJcbiAgICAgICAgd2hlbignL3VzZXJzLzp1c2VySWQnLCB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZTogJzx1c2VyLWRldGFpbD48L3VzZXItZGV0YWlsPidcclxuICAgICAgICB9KS5cclxuICAgICAgICBvdGhlcndpc2UoJy91c2VycycpO1xyXG4gICAgfVxyXG4gICk7XHJcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXJMaXN0JywgWydjb3JlLnVzZXInXSk7XHJcblxyXG5hbmd1bGFyLlxyXG4gIG1vZHVsZSgndXNlckxpc3QnKS5cclxuICBjb21wb25lbnQoJ3VzZXJMaXN0Jywge1xyXG4gICAgdGVtcGxhdGVVcmw6ICd1c2VyLWxpc3QvdXNlci1saXN0LnRlbXBsYXRlLmh0bWwnLFxyXG4gICAgY29udHJvbGxlcjogW1xyXG4gICAgICAnVXNlcicsXHJcbiAgICAgICckbG9jYXRpb24nLFxyXG4gICAgICBmdW5jdGlvbiAoVXNlciwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgICAgbGltaXQ6IDIsXHJcbiAgICAgICAgICBvZmZzZXQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBVc2VyKFxyXG4gICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgICAgc2VsZi51c2VycyA9IHJlc3AuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5vcGVuVXNlciA9IGZ1bmN0aW9uICh1c2VySWQpIHtcclxuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvJyArIHVzZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSk7XHJcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXJEZXRhaWwnLCBbXHJcbiAgJ25nUm91dGUnLCAnY29yZS51c2VyJ1xyXG5dKTtcclxuXHJcblxyXG5hbmd1bGFyXHJcbiAgLm1vZHVsZSgndXNlckRldGFpbCcpXHJcbiAgLmNvbXBvbmVudCgndXNlckRldGFpbCcsIHtcclxuICAgIHRlbXBsYXRlVXJsOiAndXNlci1kZXRhaWwvdXNlci1kZXRhaWwudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBjb250cm9sbGVyOiBbJ1VzZXJPcGVyYXRpb25zJywgJyRyb3V0ZVBhcmFtcycsXHJcbiAgICAgIGZ1bmN0aW9uIChVc2VyT3BlcmF0aW9ucywgJHJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi51c2VySWQgPSAkcm91dGVQYXJhbXMudXNlcklkO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9ICB7XHJcbiAgICAgICAgICBkYXRldGltZV9mcm9tOiAnMjAxNS0wMS0wMVQwMDowMDowMCBVVEMnLFxyXG4gICAgICAgICAgZGF0ZXRpbWVfdG86ICcyMDE3LTAzLTAzVDAwOjAwOjAwIFVUQydcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBVc2VyT3BlcmF0aW9ucyhcclxuICAgICAgICAgIHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNhY3Rpb25zID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0pO1xyXG5cbmFuZ3VsYXIubW9kdWxlKFxyXG4gICdjb3JlLnVzZXInLFxyXG4gIFsnY29yZS1hcGknXVxyXG4pO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb3JlLnVzZXInKVxyXG4gIC5mYWN0b3J5KCdVc2VyJywgW1xyXG4gICAgJ2FwaScsXHJcbiAgICAnJGh0dHAnLFxyXG4gICAgZnVuY3Rpb24gKGFwaSwgJGh0dHApIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwYXJhbXMsIHN1Y2Nlc3NDYiA9IG51bGwsIGVycm9yQ2IgPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGFwaSgkaHR0cCkuZ2V0TGlzdChcclxuICAgICAgICAgICcvdXNlcnMnLFxyXG4gICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgc3VjY2Vzc0NiLFxyXG4gICAgICAgICAgZXJyb3JDYlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdKVxyXG4gIC5mYWN0b3J5KCdVc2VyT3BlcmF0aW9ucycsIFtcclxuICAgICdhcGknLFxyXG4gICAgJyRodHRwJyxcclxuICAgIGZ1bmN0aW9uIChhcGksICRodHRwKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoaWQsIHBhcmFtcywgc3VjY2Vzc0NiID0gbnVsbCwgZXJyb3JDYiA9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gYXBpKCRodHRwKS5nZXRMaXN0KFxyXG4gICAgICAgICAgJy91c2Vycy8nICsgaWQgKyAnL3RyYW5zYWN0aW9ucycsXHJcbiAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICBzdWNjZXNzQ2IsXHJcbiAgICAgICAgICBlcnJvckNiXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICBdKTtcbmFuZ3VsYXJcclxuICAubW9kdWxlKFxyXG4gICAgJ2NvcmUtYXBpJywgW11cclxuICApO1xyXG5cclxuYW5ndWxhclxyXG4gIC5tb2R1bGUoJ2NvcmUtYXBpJykuZmFjdG9yeSgnYXBpJywgW1xyXG4gIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9saXZlZGVtby54c29sbGEuY29tL2ZlL3Rlc3QtdGFzay9iYWV2JztcclxuICAgIHJldHVybiBmdW5jdGlvbiBhcGkoJGh0dHApIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEFkZCBjYWxsYmFja3NcclxuICAgICAgICpcclxuICAgICAgICogQHBhcmFtIHtQcm9taXNlfSBxXHJcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3IgY2FsbGJhY2tcclxuICAgICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiBhZGRDYWxsYmFja3MocSwgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICBpZiAoc3VjY2VzcyAmJiBlcnJvcikge1xyXG4gICAgICAgICAgcmV0dXJuIHEudGhlbihcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICBzdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBlcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIHJldHVybiBxLnRoZW4oXHJcbiAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBlcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgcmV0dXJuIHEudGhlbihcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICBzdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFF1ZXJ5IGZvciBnZXQgbGlzdFxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcclxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gc3VjY2Vzc0NiXHJcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVycm9yQ2JcclxuICAgICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiBnZXRMaXN0KHVybCwgcGFyYW1zID0gbnVsbCwgc3VjY2Vzc0NiID0gbnVsbCwgZXJyb3JDYiA9IG51bGwpIHtcclxuICAgICAgICBsZXQgcGFyYW1zU3RyaW5nID0gJyc7XHJcbiAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgcGFyYW1zU3RyaW5nID0gJz8nO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgIHBhcmFtc1N0cmluZyArPSBrZXkgKyAnPScgKyBwYXJhbXNba2V5XSArICcmJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcGFyYW1zU3RyaW5nID0gcGFyYW1zU3RyaW5nLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcSA9ICRodHRwLmdldChiYXNlVXJsICsgdXJsICsgcGFyYW1zU3RyaW5nKTtcclxuICAgICAgICByZXR1cm4gYWRkQ2FsbGJhY2tzKHEsIHN1Y2Nlc3NDYiwgZXJyb3JDYik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBVcGRhdGUgcmVxdWVzdFxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzQ2JdXHJcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlcnJvckNiXVxyXG4gICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZSh1cmwsIGRhdGEsIHN1Y2Nlc3NDYiwgZXJyb3JDYikge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgZGF0YSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBxID0gJGh0dHAucHV0KGJhc2VVcmwgKyB1cmwsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBhZGRDYWxsYmFja3MocSwgc3VjY2Vzc0NiLCBlcnJvckNiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIENyZWF0ZSBxdWVyeVxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXHJcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzQ2JdXHJcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlcnJvckNiXVxyXG4gICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmwsIGRhdGEsIHN1Y2Nlc3NDYiwgZXJyb3JDYikge1xyXG4gICAgICAgIGNvbnN0IHEgPSAkaHR0cC5wb3N0KGJhc2VVcmwgKyB1cmwsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBhZGRDYWxsYmFja3MocSwgc3VjY2Vzc0NiLCBlcnJvckNiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuICAgICAgICBjcmVhdGU6IGNyZWF0ZSxcclxuICAgICAgICBnZXRMaXN0OiBnZXRMaXN0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbl0pO1xyXG4iXX0=
