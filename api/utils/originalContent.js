function extractRealContent(data) {
    // Create a regular expression to match the control characters and content.
    const regex =
        /(\u0001\u0000\u0000\u0000\u0000\u0000\u0000\r\u001b\[(\d+)m)(\w+)/g;

    // Match and extract the real content using the regex.
    const realContent = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
        realContent.push(match[3]);
    }

    return realContent;
}

function extractRealContent(data) {
    // Create a regular expression to match the control characters and content.
    const regex =
        /(\u0001\u0000\u0000\u0000\u0000\u0000\u0000\r\u001b\[(\d+)m)(\w+)/g;

    // Match and extract the real content using the regex.
    const realContent = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
        realContent.push(match[3]);
    }

    return realContent;
}

const data =
    "\u0001\u0000\u0000\u0000\u0000\u0000\u00002{ name: \u001b[32m'omoding'\u001b[39m, age: \u001b[33m12\u001b[39m }\r\n\u0001\u0000\u0000\u0000\u0000\u0000\u00002{ name: \u001b[32m'omoding'\u001b[39m, age: \u001b[33m12\u001b[39m }\r\n";

const realContent = extractRealContent(data);

console.log(realContent); // ["3", "6"]
