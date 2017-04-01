var dir = angular.module("CustomDirective",[]);

dir.filter('startFrom', function () {
    return function (input, start) {
        if(!input) return;
        start = +start;
        return input.slice(start);
    };
});

dir.directive("globalSearchDir",function($timeout){
  function linkFun(scope, ele, attr){
    scope.globalSearch = '';
    scope.pointer = -1;
    scope.temp = '';
    // scope.options = scope.obj;
    scope.optselected = {
      'item': '',
      'sort': '',
      'dir': ''
    };

    scope.selected = false;
    scope.filter_view = false;
    scope.filterObj = {
      'by':'',
      'dir':''
    };
    scope.clear_filter = function(){
      scope.filterObj = {
        'by':'',
        'dir':''
      };
      scope.filterFun();
    };
    scope.startsWith = function (actual, expected) {
      var lowerStr = (actual + "").toLowerCase();
      return lowerStr.indexOf(expected.toLowerCase()) === 0;
    };

    scope.filterFun = function(){
      scope.optselected.sort = scope.filterObj.by;
      scope.optselected.dir = parseInt(scope.filterObj.dir);
    };
    scope.focus_lost = function(){
      $timeout(function(){
        scope.selected = true;
        scope.selectOption(scope.globalSearch);
      },1000);

    };
    scope.update_temp = function (event){
      scope.selected = false;
      if(event.which == 13)
        scope.selectOption(scope.globalSearch);
      else if(event.which == 38){
        scope.pointer == 0?scope.pointer = Math.min(4,scope.filtered.length): scope.pointer = scope.pointer - 1;
        scope.globalSearch = scope.filtered[scope.pointer].title;
      }
      else if(event.which == 40){
        scope.pointer == Math.min(4,scope.filtered.length)?scope.pointer = 0: scope.pointer = scope.pointer + 1;
        scope.globalSearch = scope.filtered[scope.pointer].title;
        console.log(scope.filtered.length);
      }
      else {
        scope.temp= scope.globalSearch;
        scope.pointer = -1;
      }
    }
    scope.selectOption = function(opt){
      scope.globalSearch = opt;
      scope.selected  = true;
      scope.optselected.item = opt;
      scope.temp = opt;
      scope.pointer = -1;
    };
  }
  return{
    templateUrl:"directive/index.html",
    scope:{
      options:"=obj",
      optselected : "=",
      orderby_arr : "=orderby"
    },
    link: linkFun,
    restrict: "E"
  };
});

dir.directive("moviesList",function($window){
  return{
    templateUrl: "directive/movieList.html",
    scope: {
      List: "=list",
      selected: "=selected"
    },
    link: function(scope,ele,attr){
        scope.start = 0;
        scope.show_next = true;
        scope.results_per_page = 10;
        scope.$watch('selected',function(newVal,oldVal){
          scope.start = 0;
          //  console.log(newVal);
        });
        scope.startsWith = function (actual, expected) {
          var lowerStr = (actual + "").toLowerCase();
          return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        scope.next = function(){
          scope.start = scope.start + scope.results_per_page;
          if(scope.start>scope.filtered.length)
            scope.start = scope.start - scope.results_per_page;
          else
            scrollTo(0,0);
        };
        scope.pre = function(){

          scope.start = scope.start - scope.results_per_page;
          if(scope.start<0)
            scope.start = scope.start + scope.results_per_page;
          else
          scrollTo(0,0);
        };
        scope.open_page = function (page_url){
          // console.log("https://www.kickstarter.com"+page_url);
          $window.open("https://www.kickstarter.com"+page_url)
        }
    },
    restrict:"E"
  };
});
