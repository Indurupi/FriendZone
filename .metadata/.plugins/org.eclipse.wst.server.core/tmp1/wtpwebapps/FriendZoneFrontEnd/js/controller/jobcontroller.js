app.controller('jobcontroller',['jobservice','$location','$window','fid',
						function(jobservice, $location, $window, fid) {
							console.log("inside job controller js");
							var self = this;
							self.job = {
									qualification: "",
								    status: "vacant",
								    jobid: null,
								    jobtitle: "",
								    datetime: null,
								    companyname: "",
								    salarypackage: "",
								    jobdescription: ""
							};

							self.onejob = {
									qualification: "",
								    status: "",
								    jobid: null,
								    jobtitle: "",
								    datetime: null,
								    companyname: "",
								    salarypackage: "",
								    jobdescription: ""
							};
							
							
								self.jobapplication = {

									    qualification: "B.sc",
									    status: "vacant",
									    jobid: 1,
									    jobtitle: "System Engineer",
									    companyname: "Niit",
									    salarypackage: "5000000",
									    datetime: null,
									    jobdescription: "System Engineer"
								  };

							self.jobs = [];
							self.jobapplications = [];
							self.submit = submit;
							self.reset = reset;
							/*self.displayonejob = displayonejob;*/
							self.submitjobapplication = submitjobapplication;

							fetchAllJobs();

							function fetchOneForum() {
								var jobId = jobid.jobid;
								console.log("jobs length"
										+ self.jobs.length);
								for (var i = 0; i < self.jobid.length; i++) {
									// $window.alert('inside for loop forum id
									// is '+ forumid);
									if (self.jobid[i].jobid == jobId) {

										self.onejob = angular
												.copy(self.jobid[i]);
										break;
									}
								}
							}

							function fetchAllJobs() {
								jobservice
										.fetchAllJobs()
										.then(
												function(d) {
													console.log("inside fetch all jobs in job controller");
													// console.log('in
													// controller json
													// array'+JSON.stringify(jobs));
													self.jobs = d;
													//fetchOneJob();
													// console.log("in
													// controller json array
													// "+JSON.stringify(self.jobs))
												},
												function(errResponse) {
													console.error('Error while fetching forums');
												});
							}

							function createJob(job) {
									console.log('in controller json array'
										+ JSON.stringify(job, null, 2));

								jobservice
										.createJob(job)
										.then(
												function(response) {
													$window.alert("job created successfully");
												},
												function(errResponse) {
													$window.alert("Error in creating job");
												});
							}
							
							function applyjob(jobapplication)
							{
								jobservice.applyJob(jobapplication).then
								( function(response){
									$window.alert("Job applied successfully");
								},function(errResponse)
								{
									$window.alert("Error in applying job")
								}
										);
							}
								/*function displayonejob(jobid) {
								console.log('display one job method');
								jobid.jobid= jobid;
								var url = "http://localhost:8080/FriendZoneFrontEnd/#/viewonejob";
								$window.location.href = url;
							}*/

							function submit() {
								createJob(self.job);
							}

							function submitjobapplication(jobid)
							{
								var idofjob = jobid;
								self.jobapplication.jobid = idofjob;
								applyjob(self.jobapplication);
							}
							function reset() {
								self.job = {
										qualification: "",
									    status: "",
									    jobid: null,
									    jobtitle: "",
									    datetime: null,
									    companyname: "",
									    salarypackage: "",
									    jobdescription: ""
								};
							}
						} ]);
