var https = require("https");

var star_index = function(username){
      var host = "api.github.com";
      var path = "/users/" + username + "/repos";
      var headers = {
            'user-agent': 'rajanalwan'
      }

      var options = {
            host: host,
            path: path,
            method: 'GET',
            headers: headers
      }
      var req = https.request(options, function(res){
            res.setEncoding('utf-8');

            var responseString = "";

            res.on("data", function(data){
                  responseString += data;
            });

            res.on("end", function(){
                  var responseObject = JSON.parse(responseString);
                  var repoDetails = [];
                  var minimumValues = [];
                  var starIndex = 0;

                  responseObject.forEach(function(repo){
                        repoDetails.push({
                              name: repo.name,
                              stars: repo.watchers_count
                        });
                  });

                  repoDetails = repoDetails.sort(function(a, b){
                        var x = a.stars;
                        var y = b.stars;
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                  })

                  repoDetails.forEach(function(repo, index){
                        minimumValues.push({
                              value: repo.stars > index ? index : repo.stars
                        })
                  });

                  starIndex = Math.max.apply(Math, minimumValues.map(function(object){
                        return object.value;
                  }))

                  var resposeStarIndex = {'star_index': starIndex};
                  console.log(resposeStarIndex.star_index + " | " + username);
            });

            res.on("error", function(e){
                  console.error("Error: " + e);
            });
      });
      req.end();
}
