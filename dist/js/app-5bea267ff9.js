"use strict";var walletsApp=angular.module("walletsApp",["ui.router","userList","userDetail","templates"]);walletsApp.config(["$stateProvider","$locationProvider","$routeProvider","$injector",function(e,t,r,n){var a=n.get("$templateCache");e.state("users.list",{url:"/users",template:a.get("user-detail/user-detail.template.html"),controller:"userList",controllerAs:"$ctrl"})}]),angular.module("userList",["core.user"]);var $injector=angular.injector(["ng"]),$templateCache=$injector.get("$templateCache");console.log($templateCache.get("user-detail/user-detail.template.html")),angular.module("userList").component("userList",{template:$templateCache.get("user-detail/user-detail.template.html"),controller:["User","$location","$templateCache",function(e,t,r){console.log(r.get("user-detail/user-detail.template.html"));var n=this,a={limit:4,offset:0};n.isLoading=!0,e(a,function(e){n.users=e.data.data,n.isLoading=!1},function(){n.isLoading=!1}),n.openUser=function(e){t.path("/users/"+e)}}]}),angular.module("userDetail",["ngRoute","core.user"]),angular.module("userDetail").component("userDetail",{templateUrl:"user-detail.template.html",controller:["UserOperations","$routeParams",function(e,t){var r=this;r.userId=t.userId;var n={datetime_from:"2015-01-01T00:00:00 UTC",datetime_to:"2017-03-03T00:00:00 UTC"};r.isLoading=!0,e(this.userId,n,function(e){r.isLoading=!1,r.transactions=e.data},function(){r.isLoading=!1})}]}),angular.module("core.user",["core-api"]),angular.module("core.user").factory("User",["api","$http",function(e,t){return function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e(t).getList("/users",r,n,a)}}]).factory("UserOperations",["api","$http",function(e,t){return function(r,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e(t).getList("/users/"+r+"/transactions",n,a,l)}}]),angular.module("core-api",[]),angular.module("core-api").factory("api",[function(){var e="https://livedemo.xsolla.com/fe/test-task/baev";return function(t){function r(e,t,r){return t&&r?e.then(function(e){t(e)},function(e){e(e)}):r?e.then(function(e){e(e)}):t?e.then(function(e){t(e)}):e}function n(n){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,u="";if(a){u="?";for(var i in a)a.hasOwnProperty(i)&&(u+=i+"="+a[i]+"&");u=u.slice(0,-1)}var s=t.get(e+n+u);return r(s,l,o)}function a(n,a,l,o){a||(a={});var u=t.put(e+n,a);return r(u,l,o)}function l(n,a,l,o){var u=t.post(e+n,a);return r(u,l,o)}return{update:a,create:l,getList:n}}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyJdLCJuYW1lcyI6WyJ3YWxsZXRzQXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsIiRzdGF0ZVByb3ZpZGVyIiwidXJsIiwiJHRlbXBsYXRlQ2FjaGUiLCJjb250cm9sbGVyIiwiY29udHJvbGxlckFzIiwiJGluamVjdG9yIiwiZ2V0Iiwic3RhdGUiLCJ0ZW1wbGF0ZSIsInNlbGYiLCJwYXJhbXMiLCJpbmplY3RvciIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiLCJpc0xvYWRpbmciLCIkbG9jYXRpb24iLCJVc2VyIiwidGhpcyIsIm9mZnNldCIsInRlbXBsYXRlVXJsIiwidXNlcklkIiwiJHJvdXRlUGFyYW1zIiwidXNlcnMiLCJyZXNwIiwiZGF0YSIsImRhdGV0aW1lX2Zyb20iLCJkYXRldGltZV90byIsIlVzZXJPcGVyYXRpb25zIiwic3VjY2Vzc0NiIiwiZXJyb3JDYiIsIiRodHRwIiwiZmFjdG9yeSIsImlkIiwicmVzcG9uc2UiLCJiYXNlVXJsIiwidHJhbnNhY3Rpb25zIiwiZXJyb3IiLCJhcGkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJzdWNjZXNzIiwiZ2V0TGlzdCIsInEiLCJhZGRDYWxsYmFja3MiLCJ0aGVuIiwicmVzdWx0IiwidXBkYXRlIiwicGFyYW1zU3RyaW5nIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJzbGljZSIsInB1dCIsImNyZWF0ZSIsInBvc3QiXSwibWFwcGluZ3MiOiJBQUFBLFlBQUEsSUFBQUEsWUFBQUMsUUFBQUMsT0FBQSxjQUNFLFlBREYsV0FHRSxhQUlGRixhQUFBQSxZQVVNRyxRQUFBQSxpQkFBQUEsb0JBQUFBLGlCQUFBQSxZQUNFQyxTQUFLRCxFQUNLRSxFQUNWQyxFQUNBQyxHQU5GLEdBQUlGLEdBQWlCRyxFQUFVQyxJQUFJLGlCQUVuQ04sR0FBZU8sTUFBTSxjQUNuQk4sSUFBSyxTQUNMTyxTQUFVTixFQUFlSSxJQUFJLHlDQUM3QkgsV0FBWSxXQUNaQyxhQUFjLGFBY3RC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R0FBQUEsVUFBQSxHQUFOLEtBQzNEVSxFQUFlLEVBQ25CLElBQUl2QyxFQUFRLENBQ1Z1QyxFQUFlLEdBQ2YsS0FBSyxHQUFJQyxLQUFPeEMsR0FDVkEsRUFBT3lDLGVBQWVELEtBQ3hCRCxHQUFnQkMsRUFBTSxJQUFNeEMsRUFBT3dDLEdBQU8sSUFHOUNELEdBQWVBLEVBQWFHLE1BQU0sR0FBRyxHQUV2QyxHQUFJUixHQUFJYixFQUFNekIsSUFBSTZCLEVBQVVsQyxFQUFNZ0QsRUFDbEMsT0FBT0osR0FBYUQsRUFBR2YsRUFBV0MsR0FZcEMsUUFBU2tCLEdBQU8vQyxFQUFLd0IsRUFBTUksRUFBV0MsR0FDL0JMLElBQ0hBLEtBRUYsSUFBSW1CLEdBQUliLEVBQU1zQixJQUFJbEIsRUFBVWxDLEVBQUt3QixFQUNqQyxPQUFPb0IsR0FBYUQsRUFBR2YsRUFBV0MsR0FZcEMsUUFBU3dCLEdBQU9yRCxFQUFLd0IsRUFBTUksRUFBV0MsR0FDcEMsR0FBSWMsR0FBSWIsRUFBTXdCLEtBQUtwQixFQUFVbEMsRUFBS3dCLEVBQ2xDLE9BQU9vQixHQUFhRCxFQUFHZixFQUFXQyxHQUdwQyxPQUNFa0IsT0FBUUEsRUFDUk0sT0FBUUEsRUFDUlgsUUFBU0EiLCJmaWxlIjoianMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHdhbGxldHNBcHAgPSBhbmd1bGFyLm1vZHVsZSgnd2FsbGV0c0FwcCcsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICd1c2VyTGlzdCcsXG4gICd1c2VyRGV0YWlsJyxcbiAgJ3RlbXBsYXRlcydcbl0pO1xuXG53YWxsZXRzQXBwXG4gIC5jb25maWcoXG4gICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLFxuICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlcixcbiAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXIsXG4gICAgICAgICAgICAgICRpbmplY3RvclxuICAgICAgICAgICAgICApIHtcblxuICAgICAgdmFyICR0ZW1wbGF0ZUNhY2hlID0gJGluamVjdG9yLmdldCgnJHRlbXBsYXRlQ2FjaGUnKTtcblxuICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3VzZXJzLmxpc3QnLCB7XG4gICAgICAgIHVybDogJy91c2VycycsXG4gICAgICAgIHRlbXBsYXRlOiAkdGVtcGxhdGVDYWNoZS5nZXQoJ3VzZXItZGV0YWlsL3VzZXItZGV0YWlsLnRlbXBsYXRlLmh0bWwnKSxcbiAgICAgICAgY29udHJvbGxlcjogJ3VzZXJMaXN0JyxcbiAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICB9KTtcblxuICAgICAgLy8gJHJvdXRlUHJvdmlkZXIuXG4gICAgICAvLyAgIHdoZW4oJy91c2VycycsIHtcbiAgICAgIC8vICAgICB0ZW1wbGF0ZTogJzx1c2VyLWxpc3Q+PC91c2VyLWxpc3Q+J1xuICAgICAgLy8gICB9KS5cbiAgICAgIC8vICAgd2hlbignL3VzZXJzLzp1c2VySWQnLCB7XG4gICAgICAvLyAgICAgdGVtcGxhdGU6ICc8dXNlci1kZXRhaWw+PC91c2VyLWRldGFpbD4nXG4gICAgICAvLyAgIH0pLlxuICAgICAgLy8gICBvdGhlcndpc2UoJy91c2VycycpO1xuICAgIH1cbiAgKTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXJMaXN0JywgWydjb3JlLnVzZXInXSk7XG52YXIgJGluamVjdG9yID0gYW5ndWxhci5pbmplY3RvcihbJ25nJ10pO1xudmFyICR0ZW1wbGF0ZUNhY2hlID0gJGluamVjdG9yLmdldCgnJHRlbXBsYXRlQ2FjaGUnKTtcblxuY29uc29sZS5sb2coJHRlbXBsYXRlQ2FjaGUuZ2V0KCd1c2VyLWRldGFpbC91c2VyLWRldGFpbC50ZW1wbGF0ZS5odG1sJykpO1xuXG5hbmd1bGFyLlxuICBtb2R1bGUoJ3VzZXJMaXN0JykuXG4gIGNvbXBvbmVudCgndXNlckxpc3QnLCB7XG4gICAgdGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgndXNlci1kZXRhaWwvdXNlci1kZXRhaWwudGVtcGxhdGUuaHRtbCcpLFxuICAgIGNvbnRyb2xsZXI6IFtcbiAgICAgICdVc2VyJyxcbiAgICAgICckbG9jYXRpb24nLFxuICAgICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAgIGZ1bmN0aW9uIChVc2VyLCAkbG9jYXRpb24sICR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCR0ZW1wbGF0ZUNhY2hlLmdldCgndXNlci1kZXRhaWwvdXNlci1kZXRhaWwudGVtcGxhdGUuaHRtbCcpKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgIGxpbWl0OiA0LFxuICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9O1xuICAgICAgICBzZWxmLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIFVzZXIoXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgICAgICBzZWxmLnVzZXJzID0gcmVzcC5kYXRhLmRhdGE7XG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHNlbGYub3BlblVzZXIgPSBmdW5jdGlvbiAodXNlcklkKSB7XG4gICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy91c2Vycy8nICsgdXNlcklkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSk7XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VyRGV0YWlsJywgW1xuICAnbmdSb3V0ZScsICdjb3JlLnVzZXInXG5dKTtcblxuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ3VzZXJEZXRhaWwnKVxuICAuY29tcG9uZW50KCd1c2VyRGV0YWlsJywge1xuICAgIHRlbXBsYXRlVXJsOiAndXNlci1kZXRhaWwudGVtcGxhdGUuaHRtbCcsXG4gICAgY29udHJvbGxlcjogWydVc2VyT3BlcmF0aW9ucycsICckcm91dGVQYXJhbXMnLFxuICAgICAgZnVuY3Rpb24gKFVzZXJPcGVyYXRpb25zLCAkcm91dGVQYXJhbXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnVzZXJJZCA9ICRyb3V0ZVBhcmFtcy51c2VySWQ7XG4gICAgICAgIHZhciBwYXJhbXMgPSAge1xuICAgICAgICAgIGRhdGV0aW1lX2Zyb206ICcyMDE1LTAxLTAxVDAwOjAwOjAwIFVUQycsXG4gICAgICAgICAgZGF0ZXRpbWVfdG86ICcyMDE3LTAzLTAzVDAwOjAwOjAwIFVUQydcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBVc2VyT3BlcmF0aW9ucyhcbiAgICAgICAgICB0aGlzLnVzZXJJZCxcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi50cmFuc2FjdGlvbnMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICBdXG59KTtcblxuYW5ndWxhci5tb2R1bGUoXG4gICdjb3JlLnVzZXInLFxuICBbJ2NvcmUtYXBpJ11cbik7XG5cblxuYW5ndWxhci5tb2R1bGUoJ2NvcmUudXNlcicpXG4gIC5mYWN0b3J5KCdVc2VyJywgW1xuICAgICdhcGknLFxuICAgICckaHR0cCcsXG4gICAgZnVuY3Rpb24gKGFwaSwgJGh0dHApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocGFyYW1zLCBzdWNjZXNzQ2IgPSBudWxsLCBlcnJvckNiID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYXBpKCRodHRwKS5nZXRMaXN0KFxuICAgICAgICAgICcvdXNlcnMnLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBzdWNjZXNzQ2IsXG4gICAgICAgICAgZXJyb3JDYlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgXSlcbiAgLmZhY3RvcnkoJ1VzZXJPcGVyYXRpb25zJywgW1xuICAgICdhcGknLFxuICAgICckaHR0cCcsXG4gICAgZnVuY3Rpb24gKGFwaSwgJGh0dHApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoaWQsIHBhcmFtcywgc3VjY2Vzc0NiID0gbnVsbCwgZXJyb3JDYiA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGFwaSgkaHR0cCkuZ2V0TGlzdChcbiAgICAgICAgICAnL3VzZXJzLycgKyBpZCArICcvdHJhbnNhY3Rpb25zJyxcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgc3VjY2Vzc0NiLFxuICAgICAgICAgIGVycm9yQ2JcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgfVxuICBdKTtcbmFuZ3VsYXJcbiAgLm1vZHVsZShcbiAgICAnY29yZS1hcGknLCBbXVxuICApO1xuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2NvcmUtYXBpJykuZmFjdG9yeSgnYXBpJywgW1xuICBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJhc2VVcmwgPSAnaHR0cHM6Ly9saXZlZGVtby54c29sbGEuY29tL2ZlL3Rlc3QtdGFzay9iYWV2JztcbiAgICByZXR1cm4gZnVuY3Rpb24gYXBpKCRodHRwKSB7XG4gICAgICAvKipcbiAgICAgICAqIEFkZCBjYWxsYmFja3NcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge1Byb21pc2V9IHFcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1Y2Nlc3MgY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIGNhbGxiYWNrXG4gICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gYWRkQ2FsbGJhY2tzKHEsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgIGlmIChzdWNjZXNzICYmIGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHEudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBxLnRoZW4oXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIHEudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFF1ZXJ5IGZvciBnZXQgbGlzdFxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1Y2Nlc3NDYlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZXJyb3JDYlxuICAgICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGdldExpc3QodXJsLCBwYXJhbXMgPSBudWxsLCBzdWNjZXNzQ2IgPSBudWxsLCBlcnJvckNiID0gbnVsbCkge1xuICAgICAgICB2YXIgcGFyYW1zU3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICBwYXJhbXNTdHJpbmcgPSAnPyc7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIHBhcmFtc1N0cmluZyArPSBrZXkgKyAnPScgKyBwYXJhbXNba2V5XSArICcmJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyYW1zU3RyaW5nID0gcGFyYW1zU3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcSA9ICRodHRwLmdldChiYXNlVXJsICsgdXJsICsgcGFyYW1zU3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIGFkZENhbGxiYWNrcyhxLCBzdWNjZXNzQ2IsIGVycm9yQ2IpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFVwZGF0ZSByZXF1ZXN0XG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzQ2JdXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZXJyb3JDYl1cbiAgICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiB1cGRhdGUodXJsLCBkYXRhLCBzdWNjZXNzQ2IsIGVycm9yQ2IpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBxID0gJGh0dHAucHV0KGJhc2VVcmwgKyB1cmwsIGRhdGEpO1xuICAgICAgICByZXR1cm4gYWRkQ2FsbGJhY2tzKHEsIHN1Y2Nlc3NDYiwgZXJyb3JDYik7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIHF1ZXJ5XG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzQ2JdXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZXJyb3JDYl1cbiAgICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBjcmVhdGUodXJsLCBkYXRhLCBzdWNjZXNzQ2IsIGVycm9yQ2IpIHtcbiAgICAgICAgdmFyIHEgPSAkaHR0cC5wb3N0KGJhc2VVcmwgKyB1cmwsIGRhdGEpO1xuICAgICAgICByZXR1cm4gYWRkQ2FsbGJhY2tzKHEsIHN1Y2Nlc3NDYiwgZXJyb3JDYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgICAgICBjcmVhdGU6IGNyZWF0ZSxcbiAgICAgICAgZ2V0TGlzdDogZ2V0TGlzdFxuICAgICAgfVxuICAgIH1cbiAgfVxuXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=