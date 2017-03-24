/*console.log("inside blog controller js");*/
app.controller('logincontrol',
				['$scope','$rootScope',
						'loginservice',
						'$location',
						'$window','$http',
						'bid','$cookieStore',
						function($scope,$rootScope,loginservice, $location,$http, $window,bid,$cookieStore) {
					var self = this;
					self.user1 = {
						username : '',
						emailid : '',
						password : '',
						phno : null,
						status : 'OFFLINE',
						role : ''
					};
					
					self.login=login;
					self.logout=logout;
					self.reset = reset;
					
					function login()
					{
						loginservice.loginuser(self.user1.emailid,self.user1.password)
						.then(function(response)
								{
									self.user1=response;
									console.log('the role is '+self.user1.role);
									$rootScope.currentUser = self.user1									
									$rootScope.currentUserSignedIn = true;
									$cookieStore.put('currentUser',	$rootScope.currentUser);
									if(self.user1.role=="user")
										$location.path("/viewallblogs")
									else
										$location.path("/createforum")
								},
								function(errResponse) {
									console.error('invalid credentials');
									reset();
									alert('invalid data');
								});
								
					}
					
					function reset()
					{
						self.user1 = {
								username : '',
								emailid : '',
								password : '',
								phno : null,
								status : 'OFFLINE',
								role : ''
							};
					}
					
					function logout() {
						console.log("logout method in login controller")
						loginservice.logout($rootScope.currentUser);
						$rootScope.currentUser = {};
						$cookieStore.remove('currentUser');
						$location.path('/');

					}
} ]);