const fs = require("fs");

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

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    //err handler for the first one only. dont think itt prpigates lol
    if(err) return console.log("ERROR!")
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
            console.log(data3)

            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
                console.log("Your file has been written!")
            })
        })
    })
})
