angular.module('app', ['ui.router', 'ui.calendar'])
	.config(['$stateProvider',
			function ($stateProvider){
				$stateProvider
					.state('/', {
						url: "",
						templateUrl: "../static/app/partials/app.tpl.html",
					controller: "AppController"
						
					})															
			}]);
