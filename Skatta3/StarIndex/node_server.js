// var https = require("https");
var url = require('url');
var https = require('https');
var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
app.use(cors());
var responseObject = {};
var starIndex = 0;
var repoObject = [];
var starIndexRepos = [];

//code to compute starindex - algorithm
function computeStarIndex(stars) {
    var n = stars.length, tot = 0;
    var arr = Array(n + 1).fill(0);
    for (var i = 0; i < n; i++) {
        if (stars[i] >= n) arr[n]++;
        else arr[stars[i]]++;
    }
    for (var i = n; i >= 0; i--) {
        tot += arr[i];
        if (tot >= i) return i;
    }
    return 0;
}

//saving star index contributed repos to an object, later we push this into client response
function saveStarIndexRepos() {
    repoObject.forEach(element => {
        if (element.repo_stars >= starIndex) {
            starIndexRepos.push({
                repo_name: element.repo_name,
                repo_stars: element.repo_stars,
            });
        }
    });
}

//display html file if a StarIndex path is requested
app.get('/StarIndex', function (req, res) {
    res.sendFile(path.join(__dirname, 'Find_my_StarIndex.html'));
});

//API responds to requested username when path is HOST/MyGitStarAPI?id={username}, same url can beused as an API too.
app.get('/MyGitStarAPI/', function (req, res) {

    var url_parts = url.parse(req.url, true);
    console.log("wokring");
    // populate data for git hub api
    var GitServerOptions = {
        hostname: 'api.github.com',
        path: '/users/' + req.query.id + '/repos',
        method: 'GET',
        headers: {
            'user-agent': 'shyamkatta'
        }
    };

    var gitResponse = '';
    //fetch data from github api
    var git_req = https.request(GitServerOptions, function (git_res) {
        git_res.setEncoding('utf-8');
        responseObject = {};
        repoObject = [];
        starIndexRepos = [];
        output = {};
        git_res.on("data", function (a) {
            gitResponse += a;
        });
        console.log(git_res.statusCode);
        try {
            if (git_res.statusCode == 404) {
                res.sendStatus(404);
                throw new Error("LOL");
                // git_res.end();
            }


            git_res.on("end", function () {
                responseObject = JSON.parse(gitResponse);
                var stars = [];

                responseObject.forEach(element => {
                    repoObject.push({
                        repo_name: element.name,
                        repo_stars: element.watchers,
                    });
                    //console.log(element.name);
                    stars.push(parseInt(element.watchers));
                });
                //console.log(stars[0] + repoObject[0]);
                //console.log(stars.length);
                starIndex = computeStarIndex(stars);    // computes star index of obtained repositories
                saveStarIndexRepos();                   // saves repositories which contributed for star Index

                res.writeHead(200, { "Content-Type": "application/json" });
                var output = JSON.stringify({
                    starIndex: starIndex,
                    starIndexRepos: starIndexRepos
                });
                res.end(output);
                //res.json(starIndexRepos);
                console.log("sent StarIndex to ", req.query.id);

            });
        }
        catch (e) {
            console.log(e);
            //res.writeHead(404, { "Content-Type": "text/plain" });
            res.end();
        }
        git_res.on('error', function (e) {
            res.sendStatus(420);
        });
    }).on('error', function (e) {
        console.log(e);
        res.sendStatus(404);
    }).end();
});

// below code is modified for deployement, 0.0.0.0 is added to make this accept public requests, Port number doesnt matter, no need to include in URL
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
    console.log('listening on', port);
});
