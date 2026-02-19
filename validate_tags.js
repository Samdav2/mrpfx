
const fs = require('fs');
const path = require('path');

const filePath = '/home/rehack/mrp_frontend/components/home/ScrapedHomePage.tsx';
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract the Top HTML string
const topMatch = fileContent.match(/__html:\s*`([\s\S]*?)`/);
if (!topMatch) {
    console.error("Could not find Top HTML string");
    process.exit(1);
}
const topHtml = topMatch[1];

// Extract the Bottom HTML string
// The file has two dangerouslySetInnerHTML calls.
// We can find the second one by splitting or using a global regex.
const regex = /__html:\s*`([\s\S]*?)`/g;
let match;
const matches = [];
while ((match = regex.exec(fileContent)) !== null) {
    matches.push(match[1]);
}

if (matches.length < 2) {
    console.error("Could not find Bottom HTML string");
    process.exit(1);
}

const bottomHtml = matches[1];

function countTags(html, name) {
    const openDivs = (html.match(/<div/g) || []).length;
    const closeDivs = (html.match(/<\/div>/g) || []).length;
    const openSections = (html.match(/<section/g) || []).length;
    const closeSections = (html.match(/<\/section>/g) || []).length;

    console.log(`--- ${name} ---`);
    console.log(`Length: ${html.length}`);
    console.log(`Open Divs: ${openDivs}`);
    console.log(`Close Divs: ${closeDivs}`);
    console.log(`Balance Divs: ${openDivs - closeDivs}`);
    console.log(`Open Sections: ${openSections}`);
    console.log(`Close Sections: ${closeSections}`);
    console.log(`Balance Sections: ${openSections - closeSections}`);
}

countTags(topHtml, "Top HTML");
countTags(bottomHtml, "Bottom HTML");
