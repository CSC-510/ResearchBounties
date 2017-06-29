var retrieve_star_index = function(){
      var githubHandle = $('#github-handle').val();
      var url = "https://i4ynh6vkb5.execute-api.us-east-2.amazonaws.com/prod/";

      $.ajax({
            type: "GET",
            url: url + githubHandle,
            success: function(response){
                  if(response.statusCode === 404){
                        $("#output").html("No such user found.");
                  }
                  else{
                        var starIndexObject = JSON.parse(response.body);
                        if(starIndexObject.star_index == "-Infinity"){
                              $("#output").html("The user has no public repository.");
                        }
                        else{
                              $("#output").html("Star Index : " + starIndexObject.star_index);
                        }
                  }

            }
      });
}
