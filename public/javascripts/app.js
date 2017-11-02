var app = window.angular.module('app', [])

app.factory('chatFetcher', chatFetcher)
app.controller('mainCtrl', mainCtrl)

function chatFetcher ($http) {
  var o = {chats: []}
  var API_ROOT = 'chats'
  return {
    get: function() {
      return $http.get(API_ROOT)
      .then(function (resp) {
        return resp.data
      })
    },

    destroy: function(chat) {
      return $http.delete('/chats/' + chat.text + '/' + chat.author, {headers:
         {Authorization: 'Bearer'}
       }).success(function(data) {
         console.log(data);
       })
    }
  }
}

function mainCtrl ($scope, chatFetcher, $http) {
  $scope.chats = []

  chatFetcher.get()
  .then(function (data) {
    $scope.chats = data
  })

$scope.addChat = function() {
  var formData = {author:$scope.author,text:$scope.text};
  console.log(formData);
  var chatURL = 'chats';
  $http({
    url: chatURL,
    method: "POST",
    data: formData
  }).success(function(data, status, headers, config) {
    console.log("Post worked");
    $scope.chats.push(formData);
  }).error(function(data, status, headers, config) {
    console.log("Post failed");
  });
  $scope.text = "";
}

$scope.deleteChat = function(chat) {
  console.log(chat.text);
  chatFetcher.destroy(chat)
}

}












