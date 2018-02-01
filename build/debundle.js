const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const baseDir = path.resolve(__dirname, "./bundle");
const bundleJS = path.resolve(baseDir, "bundle.js");
const debundleDir = path.resolve(baseDir, "debundle");
const debundleConf = path.resolve(baseDir, 'debundle.json');

fs.readFile(path.resolve(baseDir, "vendor.48ad013b1513299182f0.js"), "utf8", (err, vendorContent) => {
    if (err) throw err;
    vendors = eval(vendorContent.slice(19, -2));
    fs.readFile(path.resolve(baseDir, "app.320d755e8786932b625e.js"), "utf8", (err, appContent) => {
        if (err) throw err;
        apps = eval(appContent.slice(19, -2));
        var result = [];
        for (var i = 0; i < apps.length; i++) {
            if (apps[i]) {
                result[i] = apps[i];
            }
        }
        for (var j = 0; j < vendors.length; j++) {
            if (vendors[j]) {
                if (apps[j]) {
                    throw new Error("Conflict vendor and app index");
                }
                result[j] = vendors[j];
            }
        }
        fs.writeFile(bundleJS, "webpackJsonp([" + result.toString() + "]);", err => {
            if (err) throw err;
            console.log('Merge done!');
            debundle();
        });
    })
});

function debundle() {
    exec(`rm -rf ${debundleDir} && debundle -i ${bundleJS} -o ${debundleDir} -c ${debundleConf} > /dev/null 2>&1`, (err, stdout, stderr) => {
        if (err) throw err;
    });
}
