/*console.log("inside blog services js");*/
app.factory('blogservice',['$http', '$q',function($http,$q)
    {
	console.log("inside blog services js method");

	var REST_SERVICE_URL = 'http://localhost:8080/FriendZone';
	console.log('inside blogservice method');
	var factory =
		{
			fetchAllBlogs : fetchAllBlogs,
			createBlog: createBlog,
			createComment: createComment,
			fetchcommentsofblog:fetchcommentsofblog,
			deleteBlog : deleteBlog
		};
	return factory;
	
	
	
	function fetchAllBlogs()
	{
		console.log('inside fetch all blogs in blog service');
		var deferred = $q.defer();
		$http.get(REST_SERVICE_URL+'/bloggetall')
		.then
		(
				function(response)
			{
			deferred.resolve(response.data);
			console.log("list of blogs"+response.data);
			},
			function(errResponse)
			{
				console.error('Error while fetching users');
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	function deleteBlog(blogid)
	{
		console.log('inside delete blog in blog service'+blogid);
		var deferred = $q.defer();
		$http.get(REST_SERVICE_URL+'/deleteblog/'+blogid)
		.then
		(
				function(response)
			{
			deferred.resolve(response.data);
			console.log("single blog"+response.data);
			},
			function(errResponse)
			{
				console.error('Error while deleting blog');
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}

	function fetchOneBlog(blogid)
	{
		console.log('inside fetch all blogs in blog service');
		var deferred = $q.defer();
		$http.get(REST_SERVICE_URL+'/bloggetone/'+blogid)
		.then
		(
				function(response)
			{
			deferred.resolve(response.data);
			console.log("single blog"+response.data);
			},
			function(errResponse)
			{
				console.error('Error while fetching blogs');
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	function fetchcommentsofblog(blogid)
	{
		console.log('inside fetch all blogs in blog service');
		var deferred = $q.defer();
		$http.get(REST_SERVICE_URL+'/commentsofblog/'+blogid)
		.then
		(
				function(response)
			{
			deferred.resolve(response.data);
			console.log("comments of blog"+JSON.stringify(response.data));
			},
			function(errResponse)
			{
				console.error('Error while fetching comments');
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	function createComment(comment)
	{
		console.log('in blogservice createcomment ');
		console.log('in service blogId: '+comment.blogId);
		console.log('in service postedUser : '+comment.postedUser);
		console.log('in service postedDate: '+comment.postedDate);
		console.log('in service commentDescription: '+comment.commentDescription);
		var deferred = $q.defer();
		$http.post(REST_SERVICE_URL+'/commentinsert', comment)
		.then( function(response)
				{
			deferred.resolve(response);
				},
				 function(errResponse)
		            {
		              // console.error("Error while creating User"+errResponse);
		                deferred.reject(errResponse);
		            }
				);
		return deferred.promise;
	}
	function createBlog(blog)
	{
		console.log('inside create user method')
		console.log('in service json array blog to created'+JSON.stringify(blog, null, 2));
		var deferred = $q.defer();
		$http.post(REST_SERVICE_URL+'/bloginsert',blog)
		.then(
				function (response) 
	            {
	                deferred.resolve(response);
	                
	            },
	            function(errResponse)
	            {
	              //console.error("Error while creating User"+errResponse);
	                deferred.reject(errResponse);
	            });
		return deferred.promise;
	}
	
    }]);