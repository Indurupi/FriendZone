
app.factory('jobservice',['$http','$q',
						function($http, $q) {
							var REST_SERVICE_URL = 'http://localhost:8080/FriendZone/';
							console.log('inside job service js');

							var factory = {
								fetchAllJobs : fetchAllJobs,
								createJob : createJob,
								applyJob : applyJob
							};
							return factory;

							function fetchAllJobs() {
								console
										.log("inside fetch all jobs method of job service");
								var deferred = $q.defer();
								$http.get(REST_SERVICE_URL + '/jobgetall')
										.then(
												function(response) {
													deferred.resolve(response.data);
													//console.log('list of jobs'+JSON.stringify(response.data));
													console.log("Jobs Fetched successfully ");
													// console.log("list of
													// jobs"+response.data);
												},
												function(errResponse) {
													console.error('Error while fetching jobs');
													deferred.reject(errResponse);
												});
								return deferred.promise;
							}

							function createJob(job) {
								console.log('inside create job method')

								console.log('in service json array'
										+ JSON.stringify(job, null, 2));

								var deferred = $q.defer();
								$http.post(REST_SERVICE_URL + '/jobinsert',job)
										.then(function(response) {
													console.log("this is forum object from view"
																	+ job);
													deferred.resolve(response);
												},
												function(errResponse) {
													// console.error("Error while creating User"+errResponse);
													deferred
															.reject(errResponse);
												});
								return deferred.promise;
							}
							
							function applyJob(jobapplication) {
								console.log('inside create job method')

								//console.log('in service json array'+ JSON.stringify(jobapplication, null, 2));

								var deferred = $q.defer();
								$http.post(REST_SERVICE_URL + '/jobapply',jobapplication)
										.then(function(response) {
													console.log("this is job object from view"
																	+ jobapplication);
													deferred.resolve(response);
												},
												function(errResponse) {
													console.log("Error while applying job"+errResponse);
													deferred.reject(errResponse);
												});
								return deferred.promise;
							}

						} ]);