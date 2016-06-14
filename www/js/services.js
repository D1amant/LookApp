angular.module('starter.services', [])

.factory('User', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var User = [{
    id: 0,
    name: 'Ben Sparrow',
    email:'teste@teste',
    phone:'55 - 3333 - 3333'
  }, {
    id: 1,
    name: 'Max Lynx',
    email:'teste@teste',
    phone:'55 - 3333 - 3333'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    email:'teste@teste',
    phone:'55 - 3333 - 3333'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    email:'teste@teste',
    phone:'55 - 3333 - 3333'
  }, {
    id: 4,
    name: 'Perry Governor',
    email:'teste@teste',
    phone:'55 - 3333 - 3333'
  }];

  return {
    all: function() {
      return User;
    },
    remove: function(user) {
      User.splice(User.indexOf(user), 1);
    },
    get: function(id) {
      for (var i = 0; i < User.length; i++) {
        if (User[i].id === parseInt(id)) {
          return User[i];
        }
      }
      return null;
    }
  };
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('FBToken', function(DSCacheFactory, $q, $http) {

  self.FBTokenCache = DSCacheFactory.get('FBTokenCache');


  function getToken() {
      var deferred = $q.defer(),
          cacheKey = "token",
          FBToken = self.FBTokenCache.get(cacheKey);

      if (FBToken) {
          console.log("Found data inside cache", FBToken);
          deferred.resolve(FBToken);
      } else {

          //https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=11111111111111111&client_secret=111111111111111111111
          $http.get("https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=1111111111111111111&client_secret=1111111111111111111111")
              .success(function(data) {
                  console.log("Received data via HTTP");
                  self.FBTokenCache.put(cacheKey, data);
                  deferred.resolve(data);
              })
              .error(function() {
                  console.log("Error while making HTTP call.");
                  deferred.reject();
              });


          $http.get("http://elite-schedule.net/api/leaguedata")
              .success(function(data) {
                  console.log("Received data via HTTP");
                  self.leaguesCache.put(cacheKey, data);
                  deferred.resolve(data);
              })
              .error(function() {
                  console.log("Error while making HTTP call.");
                  deferred.reject();
              });

      }
      return deferred.promise;
  }


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },
    getToken: getToken


  }
});