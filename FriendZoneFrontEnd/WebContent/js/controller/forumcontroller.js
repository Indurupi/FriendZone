app.controller('forumcontroller', [
		'$scope','$rootScope',
		'forumservice',
		'$location',
		'$window',
		'fid',
		function($scope,$rootScope, forumservice, $location, $window, fid)
		{
			console.log("inside forum controller js");

			var self = this;
			var currentuser =$rootScope.currentUser.username;
			
			self.forum = {
				forumDescription : '',
				forumId : null,
				forumTitle : '',
				postedBy : currentuser,
				postedDate : null
			};
			
			self.oneforum = {
					forumDescription : '',
					forumId : null,
					forumTitle : '',
					postedBy : '',
					postedDate : null
				};

			self.forums = [];
			self.submit = submit;
			self.reset = reset;
			self.displayoneforum = displayoneforum;

			fetchAllForums();
			
			function fetchOneForum()
			{
				var forumid = fid.fid;
				//console.log("forums length "+self.forums.length);
				for (var i = 0 ; i< self.forums.length; i++)
					{
					//$window.alert('inside for loop forum id is '+ forumid);
					if(self.forums[i].forumId == forumid)
						{
						
						self.oneforum = angular.copy(self.forums[i]);
						break;
						}					
					}
			}

			function fetchAllForums() {
				forumservice.fetchAllForums().then(function(d) {
					console.log("inside fetch all forum in forum controller");
					//console.log('in controller json array'+JSON.stringify(users1));
					self.forums = d;
					fetchOneForum();
					//console.log("in controller json array "+JSON.stringify($scope.users1))
				}, function(errResponse) {
					console.error('Error while fetching forums');
				});
			}

			function createForum(forum) {
				console.log('in controller forum: ' + forum.forumTitle);

				console.log('in controller json array'
						+ JSON.stringify(forum, null, 2));

				forumservice.createForum(forum).then(function(response) {
					$window.alert("forum created successfully");
				}, function(errResponse) {
					$window.alert("error in creating forum");
				});
			}
			
			function displayoneforum(forumid)
			{
				console.log('displayoneforum method');
				fid.fid = forumid;
				var url = "http://localhost:8080/FriendZoneFrontEnd/#/viewoneforum";
				$window.location.href = url;
			}

			function submit() {
				createForum(self.forum);
			}

			function reset() {
				self.forum = {
					forumDescription : '',
					forumId : null,
					forumTitle : '',
					postedBy : currentuser,
					postedDate : null
				};
			}
		}]);
