angular.module('app').controller('AppController',
		['$scope', '$rootScope', '$state', 
		function appController($scope, $rootScope, $state ) {
			$scope.events = [			
			];

			$scope.eventSources = [$scope.events];

			$scope.dateClick = function(date){
				if (date == null) {return;}
				var myDate = new Date(date);
				var myEvent = {
					title:'Worked Out',
					start: myDate,
					allDay: true,
					time: myDate.getTime()
				}
				var  existingEvent= _.findWhere($scope.events, {time: myDate.getTime()});
				if (existingEvent != undefined){
					 $scope.events.splice($scope.events.indexOf(existingEvent),1);
				}
				else{
					$scope.events.push(myEvent);
				}
			}

			$scope.uiConfig = {
				calendar:{
					editable: true,
					dayClick: $scope.dateClick
				}
			};
		}]);
