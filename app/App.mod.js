angular.module('app', ['ui.router'])
	.config(['$stateProvider',
			function ($stateProvider){
				$stateProvider
					.state('/', {
						url: "",
						templateUrl: "app/partials/app.tpl.html"
					})															
			}]);
