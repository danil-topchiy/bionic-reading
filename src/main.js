function main() {
    const textNodes = getAllTextNodes(document.body);
    for (const node of textNodes) {
        node.replaceWith(...makeTextNodeBionic(node));
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

        const middle = Math.ceil(word.length / 2);

        const strongPart = document.createElement("strong");
        strongPart.appendChild(document.createTextNode(word.slice(0, middle)));

        const normalPart = document.createTextNode(word.slice(middle, word.length));
        
        bionicNodes.push(strongPart);
        bionicNodes.push(normalPart);
        bionicNodes.push(document.createTextNode(" "));
    }
    return bionicNodes;
}

main();
