var express = require("express");
const path = require("path");
var connection = require("./config/connection.js");
const multer = require("multer");
const upload = multer({ dest: '/uploads/' })
const fs = require("fs");
const mysql = require("mysql");


var PORT = process.env.PORT || 8080;

var app = express();

queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

const inputfile = "C:\\Users\\annag\\OneDrive\\Pictures\\hooden1.jpg";
const outputfile = ("New file output:", inputfile)
console.log(inputfile)
// Read buffer of an image file:
const data = (inputfile); // `data`'s type is Buffer

// insert: function (query, callback) {
//     var queryString = "INSERT INTO ?? SET ?";
//     connection.query(queryString, [query.table, query.data], function (error, result) {
//         callback(error, result);
//     });
// },


connection.query("INSERT INTO `bindata`(data) VALUES(?)", [data], function (err, res) {
    console.log(data)
    if (err) throw err;
    // console.log("BLOB data inserted!");
    // Check to read it from DB:
    connection.query("select * from `bindata`", function (err, res) {
        if (err) throw err;
        console.log(res)
        const row = res[0];
        // Got BLOB data:
        const data = row.data;
        // console.log("BLOB data read!");
        // Converted to Buffer:
        const buf = new Buffer.from(data, "binary");
        // Write new file out:
        fs.writeFileSync(outputfile, buf);
        console.log(outputfile);
    });
});

// function readImageFile(inputfile) {
//     // read binary data from a file:
//     const uploadedfile = fs.readFileSync(inputfile);
//     console.log(uploadedfile)
//     const data = (uploadedfile);
//     return data;
// };

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));

// // Parse application body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.get("/", express.static(path.join(__dirname, "./public")));

// const handleError = (err, res) => {
//     res
//         .status(500)
//         .contentType("text/plain")
//         .end("Oops! Something went wrong!");
// };

// const upload = multer({
//     dest: "/image/"
//     // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });

// app.post(
//     "/upload",
//     upload.single("file" /* name attribute of <file> element in your form */),
//     (req, res) => {
//         const tempPath = req.file.path;
//         const targetPath = path.join(__dirname, "/image/image.jpg");

//         if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
//             fs.rename(tempPath, targetPath, err => {
//                 if (err) return handleError(err, res);

//                 res
//                     .status(200)
//                     .contentType("text/plain")
//                     .end("File uploaded!");
//             });
//         } else {
//             fs.unlink(tempPath, err => {
//                 if (err) return handleError(err, res);

//                 res
//                     .status(403)
//                     .contentType("text/plain")
//                     .end("Only .jpg files are allowed!");
//             });
//         }
//     }
// );

// app.get("/image.png", (req, res) => {
//     res.sendFile(path.join(__dirname, "./image/"));
// });

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});