var app = angular.module("myApp",['CustomDirective']);

app.controller("autoCompleteCtrl", function($scope,GetData){
 var displayList = '';
 $scope.orderby_arr = [{
   'actual_name': 'title',
   'display_name': 'Title'
 },
 {
   'actual_name': 's_no',
   'display_name': 'Serial No.'
 },
 {
   'actual_name': 'end_time',
   'display_name': 'End Date'
 },
 {
   'actual_name': 'by',
   'display_name': 'By'
 }];
  GetData.getList().then(function(response){

     console.log(response);
     response.map(function (item){
       angular.extend(item,{
         'amt_pledged': item["amt.pledged"],
         'num_backers': item["num.backers"],
         's_no':item["s.no"],
         'end_time':item["end.time"]
       });
     });
    $scope.obj = response;
    $scope.optSelected = "True";
  });
});

app.service("GetData", function ($http){
  this.getList =  function(){
    return $http({
      method:"GET",
      url:"http://starlord.hackerearth.com/kickstarter"
    }).then(function(response){
      console.log(response.data);
      return response.data;
    });
  };
});
