import cheerio from 'cheerio';

class TocEntry {
  constructor(tagName, text, anchor) {
    this.tagName = tagName;
    this.text = text;
    this.anchor = anchor;
    this.children = [];
  }

  childrenToString() {
    return this.children.length
      ? `<ul>\n${this.children.join('')}</ul>\n`
      : '';
  }

  toString() {
    var result = "<li>";
    if (this.text) {
      result += "<a href=\"#" + this.anchor + "\">" + this.text + "</a>";
    }
    result += this.childrenToString();
    result += "</li>\n";
    return result;
  };
}

function getHeaders(html) {
  const $ = cheerio.load(html);
  return $('h2, h3').toArray()
    .map(el => new TocEntry(el.name, $(el).text(), $(el).attr('id')));
}

function sortHeaders(headers, level) {
  const tagName = "H" + level;
  const result = [];
  let currentTocEntry = undefined;

  function push(tocEntry) {
    if (tocEntry !== undefined) {
      if (tocEntry.children.length) {
        tocEntry.children = sortHeaders(tocEntry.children, level + 1);
      }
      result.push(tocEntry);
    }
  }

  for (let i = 0; i < headers.length; i++) {
    var tocEntry = headers[i];
    if (tocEntry.tagName.toUpperCase() !== tagName) {
      if (currentTocEntry === undefined) {
        currentTocEntry = new TocEntry();
      }
      currentTocEntry.children.push(tocEntry);
    } else {
      push(currentTocEntry);
      currentTocEntry = tocEntry;
    }
  }

  push(currentTocEntry);
  return result;
}

const generateToc = html => {
  if (!html || !html.length) {
    throw('Cannot generate table of contents of file with no markup');
  }

  const headers = getHeaders(html);
  if (!headers.length) {
    return '';
  }

  return `<div class="toc">\n<ul>\n${sortHeaders(headers, 2).join('')}</ul>\n</div>\n`;
};

export default generateToc;