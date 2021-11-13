import fs from 'fs'
import {resolve} from 'path'
import {marked} from "marked"
import Prism from 'prismjs'


const md = (filename:string) => {
  marked.setOptions({
    highlight: function (code:string, lang:string) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    },
  });

  const pt = resolve(`views/docs/${filename}`);
  const include:string = fs.readFileSync(pt, "utf8");
  const html:string = marked(include);
  return html;
};

export default md;
