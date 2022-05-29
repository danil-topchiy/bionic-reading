const TAGS_TO_SKIP = ["STRONG", "A", "CODE"];

function main() {
    const textNodes = getAllTextNodes(document.body);
    for (const node of textNodes) {
        if (shouldMakeNodeBionic(node, TAGS_TO_SKIP)) {
            node.replaceWith(...makeTextNodeBionic(node));
        }
    }
}

function getAllTextNodes(currentNode) {
    const walker = document.createTreeWalker(currentNode, NodeFilter.SHOW_TEXT, null);
    textNodes = [];
    let n;
    while (n = walker.nextNode()) {
        if (n.textContent.trim()) textNodes.push(n);
    }
    return textNodes;
}

function makeTextNodeBionic(textNode) {
    const bionicNodes = [];
    for (const word of textNode.textContent.split(" ")) {

        let strongText, normalText;
        [strongText, normalText] = makeWordBionic(word);

        const strongPart = document.createElement("strong");
        strongPart.appendChild(document.createTextNode(strongText));
        bionicNodes.push(strongPart);

        if (normalText.length > 0) {
            bionicNodes.push(document.createTextNode(normalText));
        }

        bionicNodes.push(document.createTextNode(" "));
    }
    return bionicNodes;
}

function makeWordBionic (word) {
    let splitIndex;
    if (word.length > 3) {
        splitIndex = Math.ceil(word.length / 2);
    } else if (word.length <= 3) {
        splitIndex = 1;
    }
    return [word.slice(0, splitIndex), 
            word.slice(splitIndex, word.length)];
}

function shouldMakeNodeBionic(node, nodesToSkip, depth = 3) {
    // check if node is child of nodes to skip
    let currentDepth = 0;
    let currentParent = node.parentElement;
    while (currentDepth < depth) {
        if (nodesToSkip.includes(currentParent.tagName)) {
            return false;
        } 
        currentParent = currentParent.parentElement;
        currentDepth += 1;
    }
    return true;
}

main();
