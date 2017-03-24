/**
 * 
 */

app.controller('friendcontroller', [ '$scope', '$rootScope', 'friendservice',
		'$location', '$window',
		function($scope, $rootScope, friendservice, $location, $window) {
	
		console.log("inside friend controller js method");
		
		var self = this;
		var currentuser = $rootScope.currentUser.username;
		var currentuseremailid = $rootScope.currentUser.emailid;
		
		console.log("current user email id in friend controller"+currentuseremailid);
		
		self.friend =
		{
				
				    id: null,
				    userid: currentuseremailid,
				    username: currentuser,
				    friendid: "",
				    friendname: "",
				    status: "",
				    isOnline: ""		  
		};
		
		self.newrequestfriend =
		{
				
				    id: null,
				    userid: currentuseremailid,
				    username: currentuser,
				    friendid: "",
				    friendname: "",
				    status: "",
				    isOnline: ""		  
		};
		
		self.friends = [];
		self.newrequestfriends = [];
		self.removefriend = removefriend ;
		self.addingfriend = addingfriend ;
		self.acceptfriend = acceptfriend;
		
		
		fetchMyFriends();
		fetchNewFriendRequests();
		
		function addingfriend(friendid,friendname)
		{
			console.log("inside adding friend method in friend controller "+friendid);
			console.log("inside adding friend method in friend controller "+friendname);
			
			self.friend.friendname = friendname;
			self.friend.friendid = friendid;
			self.friend.status = 'n';
			friendservice.addfriend(self.friend).then
			(
					function(d)
					{
						console.log("inside adding friend in friend controller");	
						$window.alert("Friend request sent successfully");
					},
					function(errResponse) {
						console.error('Error while sending friend request');
						$window.alert('Error while sending friend request');
					});
		}
		
		function removefriend(id)
		{
			console.log("the id to be removed  :"+id)
			friendservice.rejectfriend(id).then(
			function(d)
			{
				console.log("inside removefriend method in friend controller");	
				$window.alert("Removed successfully");
			},
			function(errResponse) {
				console.error('Error while removing your friend');
				$window.alert('Error while removing your friend');
			});
		}
		
		function acceptfriend(id)
		{
			console.log("the id to be accepted  :"+id)
			friendservice.acceptfriend(id).then(
			function(d)
			{
				console.log("inside accept friend method in friend controller");	
				$window.alert("Request accepted successfully");
			},
			function(errResponse) {
				console.error('Error while accepting your friend');
				$window.alert('Error while accepting your friend');
			});
		}
		
		function fetchMyFriends() {
			friendservice
					.fetchMyFriends(currentuseremailid)
					.then(
							function(d) {
								console.log("inside fetch my friends in friend controller");	
								self.friends = d;
							},
							function(errResponse) {
								console.error('Error while fetching your friends');
								$window.alert('Error while fetching your friends');
							});
		}
		
		function fetchNewFriendRequests() {
			friendservice
					.fetchMyFriends(currentuseremailid)
					.then(
							function(d) {
								console.log("inside fetch new friend requests in friend controller");	
								self.newrequestfriends = d;
							},
							function(errResponse) {
								console.error('Error while fetching friend requests');
								$window.alert('Error while fetching friend requests');
							});
		}
		
		}]);