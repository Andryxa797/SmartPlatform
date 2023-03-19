const glob = require('glob');
const path = require('path');

const Comb = require('csscomb');
const comb = new Comb('yandex');

const scssFolderPath = path.resolve(__dirname, '..', '..', 'src');
const scssPattern = '**/*.scss';

glob(scssPattern, { cwd: scssFolderPath }, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach(function (file) {
        const filePath = `${scssFolderPath}/${file}`;
        try {
            comb.processPath(filePath);
        } catch (e) {
            console.log(e);
        }
    });
});
