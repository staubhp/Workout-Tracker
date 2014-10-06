angular.module('app', ['ui.router', 'ui.calendar'])
	.config(['$stateProvider',
			function ($stateProvider){
				$stateProvider
					.state('/', {
						url: "",
						templateUrl: "app/partials/app.tpl.html",
					controller: "AppController"
						
					})															
			}]);
