/**
 * Created by http://rhizomik.net/~roberto/
 */

(function(){
    var app = angular.module("companyTab", [ ]);

    app.directive('companyTab', function(){
        return {
            restrict: 'E',
            templateUrl: 'company-tab/company-tab.html',
        };
    });

})();
