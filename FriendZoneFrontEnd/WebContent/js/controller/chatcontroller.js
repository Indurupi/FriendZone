app.controller("chatcontroller", function($scope, chatservice) {
  $scope.messages = [];
  $scope.message = "";
  $scope.max = 140;

  $scope.addMessage = function() {
    ChatService.send($scope.message);
    $scope.message = "";
  };

  chatservice.receive().then(null, null, function(message) {
    $scope.messages.push(message);
  });
});