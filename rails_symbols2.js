var rp = require("request-promise-native");
var fs = require("fs");
var path = require("path");

let url = "http://api.rubyonrails.org/js/search_index.js"
rp(url)
    .then(function (js) {
        var theVar = JSON.parse(js.replace("var search_data = ", ""));
        let index = theVar["index"]
        let longSearchIndex = index["longSearchIndex"]
        var uni = longSearchIndex.filter((value, index, self) => self.indexOf(value) === index && value !=="")
        var content = "// This file generated through rails_symbols2.js,Do NOT modify it!\nexport const RAILS = new Set(" + JSON.stringify(uni) + ");";
        fs.writeFile(path.join(__dirname, "src", "rails.ts"), content, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("The file was saved!");
        });
    })
    .catch(function (err) {
        // Crawling failed...
        console.log(err);
    });