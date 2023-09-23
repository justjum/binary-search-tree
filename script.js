
class Node {

    constructor(value = null, leftChild = null, rightChild = null) {
        this.value = value;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }

}

class BST {

    constructor(root) {
        this.root = root;
    }


}

function buildTree(array) {
    //sort numerically (requires a function as 'sort' works with strings)
    const arrNum = array.sort(function(a,b) {return a-b});
    //remove duplicates (to more easily build balanced tree)
    const arrReady = arrNum.filter((num, index) => (array.indexOf(num)===index));
    console.log (arrReady);
    let root = treeRecursive(arrReady);
    console.log(root)
    return root;
}

function treeRecursive(array) {
    if (array.length <= 3) {
        if (array.length === 1) {
            return new Node(array[0]);
        }
        else if (array.length === 2) {
            return new Node(array[1], array[0])
        }
        else if (array.length === 3) {
            return new Node(array[1], new Node(array[0]), new Node(array[2]));
        }
    }
    else {
        let root = array.splice(array.length/2)
        let temp1 = root.splice(1);
        let temp2 = array;
        console.log(`Temp 1 ${temp1} ${temp1.length}`);
        console.log(`Temp 2 ${temp2} ${temp2.length}`);
        return new Node(root, treeRecursive(temp2), treeRecursive(temp1));
    }
}


buildTree([1, 7, 4, 23, 8, 9, 4, 3, 64, 5, 7, 9, 67, 6345, 324, 10345])
buildTree([3,4,5])

let tree = new BST(buildTree([1, 7, 4, 23, 8, 9, 4, 3, 64, 5, 7, 9, 67, 6345, 324, 10345]))

console.log(tree);