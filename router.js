var Profile = require("./profile.js");
var renderer = require("./renderer.js");
const querystring = require("querystring");

const commonHeaders = "text/html";

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url === "/" && GET
  // show search
  if (request.url === "/") {
    if (request.method === "GET") {
      response.statusCode = 200;
      response.setHeader("Content-Type", commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      //if url == "/" && POST

      //get post data from body
      request.on("data", postBody => {
        //extract username from body
        const whatever = querystring.parse(postBody.toString()).username;

        //redirect to /:username
        response.statusCode = 303;
        response.setHeader("Location", whatever);
        response.end();
      });
    }
  }
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/..."
  const username = request.url.replace("/", "");
  if (username.length > 0) {
    response.statusCode = 200;
    response.setHeader("Content-Type", commonHeaders);
    renderer.view("header", {}, response);

    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON) {
      //show profile
      const values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });

    //on "error"
    //show error
    studentProfile.on("error", function(error) {
      renderer.view("error", { errorMessage: error.message }, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
