import * as pug from 'pug';
import * as path from 'path';
import * as fs from 'fs';

const templatePath    = path.join(__dirname, 'templates/index.pug');
const templateContent = fs.readFileSync(templatePath, 'utf8');
const parseJsonInline = pug.compile(templateContent, {
    filename: templatePath
});
const parseJsonPretty = pug.compile(templateContent, {
    filename: templatePath, pretty: true
});

const parse = function({ jsonXML, pretty }) {
	if(pretty) {
		return parseJsonPretty(jsonXML);
	}

	return parseJsonInline(jsonXML);
}

export {
	parse
};
