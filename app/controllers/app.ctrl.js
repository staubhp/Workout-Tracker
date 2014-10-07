angular.module('app').controller('AppController',
		['$scope', '$rootScope', '$state', 
		function appController($scope, $rootScope, $state ) {
			$scope.events = [			
			];

			$scope.stats = {
				longestStreak:0,
				currentStreak:0,
				longestStreakDates:"",
				currentStreakDates:""
			}

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
				getStats();
			}

			$scope.uiConfig = {
				calendar:{
					editable: true,
					dayClick: $scope.dateClick
				}
			};

			function getStats(){
				var streaks = getStreaks();
				$scope.stats.longestStreak = streaks.longestStreak;
				$scope.stats.longestStreakDates = streaks.longestStreakDates;
				$scope.stats.currentStreak = streaks.currentStreak;
			        $scope.stats.currentStreakDates = streaks.currentStreakDates;	

			}

			function getStreaks(){
				var sortedEvents = _.sortBy($scope.events, function(event){return event.time;});
				var longestStreak = (sortedEvents.length > 0 ? 1 : 0);
				var currentStreak = longestStreak;
				var longestStreakStart=new Date(),
				    longestStreakEnd=new Date();
				var currentStreakStart = new Date();
				var currentStreakEnd = new Date();



				for (i = 0; i < sortedEvents.length; i++){	
					if (i == sortedEvents.length-1){break;}
					
					var thisEvent = sortedEvents[i];
					var nextEvent = sortedEvents[i+1];
					
					if (nextEvent.time == (thisEvent.time+ 86400000)){
						currentStreak +=1;
						if (i == 0){currentStreakStart = thisEvent.start; }
						currentStreakEnd = nextEvent.start;
						if (currentStreak > longestStreak){
							longestStreak = currentStreak;
							longestStreakStart = currentStreakStart;
							longestStreakEnd = currentStreakEnd;
						}
					}
					else{
						currentStreak = 1;
						currentStreakStart = nextEvent.start;
						currentStreakEnd = nextEvent.start;
					}
				}

				return{
					longestStreak: longestStreak,
					longestStreakDates: (longestStreakStart.getMonth() + 1) + "/" + longestStreakStart.getDate() 
						+ "-" +  (longestStreakEnd.getMonth() + 1)+ "/" + longestStreakEnd.getDate(),
					currentStreak: currentStreak,
					currentStreakDates: (currentStreakStart.getMonth() + 1) + "/" + currentStreakStart.getDate()
					       	+ "-" +  (currentStreakEnd.getMonth() + 1)+ "/" + currentStreakEnd.getDate()

				}

			}

			function init(){
				getStats();

			}

			init();
		}]);
