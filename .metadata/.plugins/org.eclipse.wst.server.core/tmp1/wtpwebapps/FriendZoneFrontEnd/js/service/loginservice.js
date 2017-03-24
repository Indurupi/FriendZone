/*console.log("inside blog services js");*/
app.factory(
				'loginservice',
				['$http','$q',
						function($http, $q) {
							var REST_SERVICE_URL = 'http://localhost:8080/FriendZone/user';

							var factory = {
								loginuser : loginuser,
								logout : logout
							};
							return factory;
							function loginuser(emailid,password) {
								console
										.log('inside login user method in login service');
								console.log('the  email' + emailid);
								console.log('password ' + password);
								var deferred = $q.defer();
								$http
										.get(
												REST_SERVICE_URL + '/{'
														+ emailid + '}/'
														+ password)
										.then(
												function(response) {
													deferred
															.resolve(response.data);
													console
															.log("single user"
																	+ JSON.stringify(response.data));
													
												},
												function(errResponse) {
													console
															.error('Error while fetching user may be invalid credentials');
													deferred
															.reject(errResponse);
												});
								return deferred.promise;
							}

							function logout(user1) {
								console.log('logout....')
								var deferred = $q.defer();
								$http
										.post(REST_SERVICE_URL + '/logout',
												user1)
										.then(
												function(response) {
													return response;
												},
												function(errResponse) {
													console
															.error('Error while logging out');
													deferred
															.reject(errResponse);
												});
								return deferred.promise;
							}
						} ]);