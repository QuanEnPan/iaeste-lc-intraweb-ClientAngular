(function(){
    var app = angular.module("companiesJS", ["companyTab","companyForm"]);

    app.controller("CompaniesController", ["$http",
        function($http) {
            this.COMPANIES_API = "http://localhost:8080/api/companies";
            this.SEARCH_API = "http://localhost:8080/api/companies/results/json";
            this.loading = false;
            this.deleteloading = false;
            this.newCompany = {};
            var companyCtrl = this;
            this.title = "";

            this.isLoading = function(){
                return this.loading;
            };

            this.noCompany = function(){
                return this.companies === undefined;
            }

            this.listCompanies = function(){
                this.loading = true;
                companyCtrl.result = {};
                $http.get(this.COMPANIES_API)
                    .success(function (data) {
                        if(data!=""){
                            companyCtrl.companies = data;
                        }
                    });
            };
            
            this.searchCompany = function(){
                companyCtrl.companies = {};
                $http.get(this.SEARCH_API+"?name="+this.title)
                    .success(function (data) {
                        companyCtrl.result = data;
                    });

            };

            this.addCompany = function(){
                    $http.post(this.COMPANIES_API, this.newCompany)
                    .then(function(){
                        companyCtrl.listCompanies();
                        companyCtrl.newCompany={};
                    });               

            };
  
            this.deleteCompany = function(id){
                this.deleteloading = true;
                this.loading = true;
                $http.delete(this.COMPANIES_API+"/"+id)
                    .then(function () {
                        this.deleteloading = false;
                    });
                window.location.reload(false);

            };

        }]);

}());