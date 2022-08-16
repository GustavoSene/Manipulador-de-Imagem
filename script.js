
const sharp = require('sharp');
const compress_images = require('compress-images');
const fs = require('fs');

let path = process.argv[2];
let width = Number(process.argv[3]);
let angle = Number(process.argv[4]);
let randomN = Math.floor(Math.random() * 10);

function resize (inputPath, outputPath, width, angle) {

    sharp(inputPath).resize({width: width}).rotate(angle).toFile((outputPath), function (error) {
        if (error) {
            console.log(error);
        } else
            console.log("Arquivo criado");
            compress(outputPath, "./compressed/");
        })

}

function compress(pathInput, outputPath) {

    compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");
        fs.unlink(pathInput, function(err) {

            if (err) {
                console.log(err);
            }else 
                console.log(pathInput +" apagado");

        });
    
    
    }) }



resize(path, `./temp/output_resize${randomN}.jpg`, width, angle);

