import * as pug from 'pug';
import * as path from 'path';
import * as fs from 'fs';

function parse({ jsonXML, pretty }) {
    let templatePath = path.join(__dirname, 'templates/index.pug');
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    let fn = pug.compile(templateContent, {
        filename: templatePath, pretty
    });

    return fn(jsonXML);
}

export default { parse };
