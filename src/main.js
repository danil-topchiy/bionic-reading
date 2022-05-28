function main() {
    walkElements(document.body);
}

function walkElements(currentNode) {
    for (let childNode of currentNode.childNodes) {
        switch (childNode.nodeType) {
            case Node.TEXT_NODE:
                if (childNode.textContent) {
                    currentNode.replaceChild(makeTextNodeBionic(childNode), childNode);
                }
                break;
            case Node.ELEMENT_NODE:
                walkElements(childNode);
                break;
        }
    }
}

function makeTextNodeBionic(textNode) {
    const wrapperNode = document.createElement("span");
    for (const word of textNode.textContent.split(" ")) {
        const middle = Math.ceil(word.length / 2);

        const strongPart = document.createElement("strong");
        strongPart.appendChild(document.createTextNode(word.slice(0, middle)));

        const normalPart = document.createTextNode(word.slice(middle, word.length)  + " ");
        
        wrapperNode.appendChild(strongPart);
        wrapperNode.appendChild(normalPart);
    }
    return wrapperNode;
}

main();
