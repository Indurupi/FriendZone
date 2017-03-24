
angular.module('friendzoneApp').factory('homeservice',['$http', '$q',function($http,$q)
    {
	var REST_SERVICE_URL='http://localhost:8080/FriendZone/user';
	console.log('inside homeservice js');
	var factory = 
	{
			fetchAllUsers: fetchAllUsers,
			createUser: createUser,
			
	};
	return factory;

    function fetchAllUsers()
    {
    	console.log("inside fetch all users in home service");
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URL)
            .then(
            function (response) 
            {
            	deferred.resolve(response.data); 
            	//console.log("list of users"+response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
//    function loginUser(usercred) 
//    {
//    	console.log(usercred);
//        var deferred = $q.defer();
//        $http.post(REST_SERVICE_URI1, usercred)
//            .then(
//            function (response) 
//            {
//                deferred.resolve(response);
//            },
//            function(errResponse)
//            {
//                console.error('Error while creating User');
//                deferred.reject(errResponse);
//            }
//        );
//        return deferred.promise;
//    }
    function createUser(user1) 
    {
    	console.log('inside create user method')
		console.log('in service Username: '+user1.username);
		console.log('in service Email : '+user1.Emailid);
		console.log('in service Password : '+user1.password);
		console.log('in service Phone : '+user1.phno);
		console.log('in service status: '+user1.status);
		
		console.log('in service json array'+JSON.stringify(user1, null, 2));
    	
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URL, user1)
            .then(
            function (response) 
            {
            	console.log("this is user object from view"+user1);
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
//    function updateUser(user, id) {
//        var deferred = $q.defer();
//        $http.put(REST_SERVICE_URI+id, user)
//            .then(
//            function (response) {
//                deferred.resolve(response.data);
//            },
//            function(errResponse){
//                console.error('Error while updating User');
//                deferred.reject(errResponse);
//            }
//        );
//        return deferred.promise;
//    }
 }]);