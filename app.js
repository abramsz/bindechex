var app = angular.module('myApp', []);


app.controller('personCtrl', function($scope,$interval) {
    $scope.left = "ready go",
    $scope.right = "";
    $scope.message = " ";
    
    $scope.optleft = "";
    $scope.optright = "";
    $scope.optmodel = ["bin","dec","hex"];

    $scope.score_pass = 0;
    $scope.score_fail = 0;

    var leftArray  = [];
    var rightArray = [];
    
    $scope.start = function() {
        if($scope.optleft == "" || $scope.optright == ""){
            $scope.message = "left and right must be seleted!"
            return;
        }

        if($scope.optleft == $scope.optright){
            $scope.message = "left and right are the same,select again!"
            return;
        }

        if($scope.optleft == "bin"){
            leftArray = binArray.slice(0);
        }else if($scope.optleft == "dec"){
            leftArray = octArray.slice(0);
        }else if($scope.optleft == "hex"){
            leftArray = hexArray.slice(0);
        }

        if($scope.optright == "bin"){
            rightArray = binArray.slice(0);
        }else if($scope.optright == "dec"){
            rightArray = octArray.slice(0);
        }else if($scope.optright == "hex"){
            rightArray = hexArray.slice(0);
        }

        new_offset();
        $scope.left = leftArray[offset];
        $scope.message = "";
    };

    $scope.reset = function() {
        init();
    };

    $scope.myKeyup = function(e){
        var keycode = window.event ? e.keyCode : e.which;
        if(keycode == 13) {
            commit_command();
        }
    };

    var binArray = ["0000","0001","0010","0011","0100","0101","0110","0111",    "1000","1001","1010","1011","1100","1101","1110","1111"];
    var octArray = ["0","1","2","3","4","5","6","7",                            "8","9","10","11","12","13","14","15"];
    var hexArray = ["0","1","2","3","4","5","6","7",                            "8","9","A" ,"B" ,"C" ,"D" ,"E" ,"F"];

    var offset = 0;

    var init = function() {
        offset = 0;
        $scope.left = "";
        $scope.right = "";
        $scope.score_pass = 0;
        $scope.score_fail = 0;
        $scope.optleft = "";
        $scope.optright = "";
           
    }

    var new_offset = function(){
        offset = Math.ceil(Math.random()* (binArray.length -1));
    };


    var index_of = function(array,item){
        for (var i = array.length - 1; i >= 0; i--) {
            if(array[i] == item){
                return i;
            }
        }
        return -1;
    };

    var commit_command = function(){
        var right_index = index_of(rightArray,$scope.right.toUpperCase());

        if(right_index == -1){
            $scope.message = "unavaliable " + $scope.right.toUpperCase();
            $scope.score_fail = $scope.score_fail + 1;
            $scope.right = "";
            return;
        }

        var left_index = index_of(leftArray,$scope.left);

        if (left_index == right_index) {
            $scope.message = "good " + $scope.right.toUpperCase();
            new_offset();
            $scope.left = leftArray[offset];
            $scope.right = "";
            $scope.score_pass = $scope.score_pass + 1;
        }else{
            $scope.score_fail = $scope.score_fail + 1;
            $scope.right = "";
            $scope.message = "wrong " + $scope.right.toUpperCase();
        }
        
    };

});
