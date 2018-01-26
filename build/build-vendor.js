const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");

const baseDir = path.resolve(__dirname, "../");
const vendorJS = path.resolve(baseDir, "vendor.js");
const distDir = path.resolve(baseDir, "dist");
const debundleConf = path.resolve(baseDir, 'debundle.json');

fs.readFile(path.resolve(baseDir, "vendor.48ad013b1513299182f0.js"), "utf8", (err, data) => {
    if (err) throw err;
    fs.writeFile(vendorJS, data.slice(0, 13) + data.slice(19), err => {
        if (err) throw err;
        console.log('Success write to vendor.js');
        debundle();
    });
});

function debundle() {
    exec(`rm -rf ${distDir} && debundle -i ${vendorJS} -o ${distDir} -c ${debundleConf}`,(err, stdout, stderr) => {
        if (err) throw err;
        console.log(stdout);
        console.error(stderr);
    });
}
