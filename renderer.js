const fs = require("fs");

function mergeValues(values, content) {
  //cycle over the keys
  for (let key in values) {
    //replace all {{key}} with the value from the values object
    content = content.replace("{{" + key + "}}", values[key]);
  }

  return content;
}

function view(templateName, values, response) {
  //Read from the template file
  let fileContents = fs.readFileSync("./views/" + templateName + ".html", {
    encoding: "utf8"
  });

  //Insert values into the content
  //  if (Object.keys(values).length > 0){
  fileContents = mergeValues(values, fileContents);
  //  }

  //Write out to the response
  response.write(fileContents);
}

module.exports.view = view;
