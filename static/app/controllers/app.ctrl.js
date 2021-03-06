angular.module('app').controller('AppController',
		['$scope', '$rootScope', '$state', '$http', 
		function appController($scope, $rootScope, $state, $http) {
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
				save();
			}

			$scope.uiConfig = {
				calendar:{
					editable: true,
					dayClick: $scope.dateClick
				}
			};

		

			function save(){
				var eventData =[];

				_.each($scope.events, function(event){
					eventData.push({
						title: event.title,
						start: event.start,
						allDay: event.allDay,
						time: event.time
					});
				});

				$http({
		                    method: "post",
                		    url: "data",
                		    data: eventData
			             });
			}

			function load(){
				$http.get('/data').success(function(data, status, headers, config){					
					_.each(data, function(event){$scope.events.push(event);});
					getStats();					
				});
			}
			
			function getStats(){						
					var streaks = getStreaks();					
					$scope.stats.currentStreak = streaks.currentStreak;
					$scope.stats.currentStreakDates = streaks.currentStreakDates;					
					$scope.stats.longestStreak = streaks.longestStreak;
					$scope.stats.longestStreakDates = streaks.longestStreakDates;					
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
						if (i == 0){currentStreakStart = new Date(thisEvent.start); }
						currentStreakEnd = new Date(nextEvent.start);
						if (currentStreak > longestStreak){
							longestStreak = currentStreak;
							debugger;
							longestStreakStart = new Date(currentStreakStart);
							longestStreakEnd = new Date(currentStreakEnd);
						}
					}
					else{
						currentStreak = 1;
						currentStreakStart = new Date(nextEvent.start);
						currentStreakEnd = new Date(nextEvent.start);
					}
				}
					debugger;
				
				var ret =
				{
					longestStreak: longestStreak,
					longestStreakDates: (longestStreakStart.getMonth() + 1) + "/" + longestStreakStart.getDate() 
						+ "-" +  (longestStreakEnd.getMonth() + 1)+ "/" + longestStreakEnd.getDate(),
					currentStreak: currentStreak,
					currentStreakDates: (currentStreakStart.getMonth() + 1) + "/" + currentStreakStart.getDate()
					       	+ "-" +  (currentStreakEnd.getMonth() + 1)+ "/" + currentStreakEnd.getDate()

				}
				console.log(ret);
				return ret;
			}

			function init(){
				load();
			}

			init();
		}]);
