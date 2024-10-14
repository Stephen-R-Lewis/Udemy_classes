const fs = require("fs");
const http = require("http")
const url = require("url")

/********************************
this is the read/write file stuff
*********************************/

// //blocking synchronous way
// let pathRead = "./txt/input.txt"
// //the output path destination does not exist but when
// //writing the file it will create said distenation
// let pathWrite = "./txt/output.txt"
// let textInFile = fs.readFileSync(pathRead, "utf-8");

// console.log(textInFile)
// const textOut = `This is what we know about the avocado:${textInFile}.\nCreated on ${Date.now()}`;
// fs.writeFileSync(pathWrite, textOut)
// console.log("File Saved")

//Non blocking, asynch way
// callbacks instead of then() with promises

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     //err handler for the first one only. dont think itt prpigates lol
//     if(err) return console.log("ERROR!")
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log(data3)

//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//                 console.log("Your file has been written!")
//             })
//         })
//     })
// })

/*************************
This is the Server
**************************/

//knowing what runs once and what runs multiple times is key to knowingwhen to 
//split things and use async and sync properly. Hence this dataObj is only read
// once so it gets its nifty little varible
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    console.log(req.url)

    const pathName = req.url

    switch (pathName) {
        case "/":
        case "/overView":
            res.end("This is the OVERVIEW")
            break;
        case "/product":
            res.end("This is the PRODUCT")
            break;
        case "/api":
                res.writeHead(200, { "Content-type": "application/json" })
            res.end(data)
            break;
        default:
            res.writeHead(404, {
                "Content-type": "text/html",
                "my-own-header": "Hello-again"
            })
            res.end(`<h1>"This page could not be found?"</h1>`)
    }//end of switch
})
    
//     if (pathName === "/" || pathName === "/overView") {
//         res.end("This is the OVERVIEW")
//     } else if (pathName === "/product") {
//         res.end("this is the PRODUCT")
//     } else if (pathName === "/api") {
//         res.end("this is the PRODUCT")
//     } else {
//         res.writeHead(404, {
//             "Content-type": "text/html",
//             "my-own-header": "Hello-again"        })
//         res.end(`<h1>"This page could not be found?"</h1>`)
//     }
// });

//these are actual default values
server.listen(8000, "127.0.0.1", () => {
    console.log("listening at port 8000")
})
