class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor(root) {
    this.root = root;
  }

  insert(value, root) {
    if (root === null) {
      return;
    }
    //console.log(`root ${root.value}`)
    //console.log(`value ${value}`)
    if (value === root.value) {
      console.log("already in list");
      return;
    }
    if (value < root.value && root.left === null) {
      console.log(`inserting ${value}`);
      return (root.left = new Node(value));
    } else if (value > root.value && root.right === null) {
      console.log(`inserting ${value}`);
      return (root.right = new Node(value));
    } else {
      value < root.value
        ? this.insert(value, root.left)
        : this.insert(value, root.right);
      return root.value;
    }
  }

  delete(value, root) {

    try {
        if (value === root.left.value) {
            console.log(`removing ${value}`);
            console.log(root);
            if (root.left.left === null && root.left.right === null) {
              return root.left = null;
            }
            else if (root.left.left === null) {
                console.log('left null');
                root.left = root.left.right;
            }
            else if (root.left.right === null) {
                console.log('right null');
                root.left = root.left.left;
            }
            else {
                console.log(root);
                this.inorder(root.right);
                
                let tempLeft = root.left.left;
                let tempRight = root.left.right;
                root.left = tempLeft;
                root.left.right = tempRight;
            }
          }
    }
    catch {}

    try {
        if (value === root.right.value) {
            console.log(`removing ${value}`);
            console.log(root);
            if (root.right.left === null && root.right.right === null) {
                return root.right = null;
            }
            else if (root.right.left === null) {
                root.right = root.right.right;
            }
            else if (root.right.right === null) {
                root.right = root.right.left;
            }
            else {
                console.log(root);
                this.inorder(root.right);
                tempLeft = root.right.left;
                tempRight = root.right.right;
            }
            
        }
    }
    catch{}

    if (root === null) {

      return root;
    }
    else {
      value < root.value
        ? this.delete(value, root.left)
        : this.delete(value, root.right);
    }
    if (value !== root.value) {
      return console.log(`Value ${value} not found`);
    }
    if (value === root.value) {
        let inOrder = this.inorder(root.right);
        let tempLeft = root.left;
        let tempRight = root.right;
        this.delete(inOrder, tree.root);
        root.value = inOrder;
        root.left = tempLeft;
        root.right = tempRight;
        
    }
  }

  inorder(root) {
    let left = root.left;
    while (left.left) {
        return this.inorder(left);
    }
    
    return left.value;
  }
}

function buildTree(array) {
  //sort numerically (requires a function as 'sort' works with strings)
  const arrNum = array.sort(function (a, b) {
    return a - b;
  });
  //remove duplicates (to more easily build balanced tree)
  const arrReady = arrNum.filter((num, index) => array.indexOf(num) === index);
  console.log(arrReady);
  let root = treeRecursive(arrReady);
  console.log(root);
  return (this.root = root);
}

function treeRecursive(array) {
  if (array.length <= 3) {
    if (array.length === 1) {
      //console.log(`base ${array[0]}`);
      return new Node(array[0]);
    } else if (array.length === 2) {
      //console.log(`base ${array[1]},${array[0]}`);
      return new Node(array[1], array[0]);
    } else if (array.length === 3) {
      //console.log(`base ${array[1]}, ${array[0]}, ${array[2]}`);
      return new Node(array[1], new Node(array[0]), new Node(array[2]));
    }
  } else {
    let middle = Math.floor(array.length / 2);
    let root = array.splice(middle);
    let temp1 = root.splice(1);
    let temp2 = array;
    //console.log(`Temp 1 ${temp1} ${temp1.length}`);
    //console.log(`Temp 2 ${temp2} ${temp2.length}`);
    return new Node(root[0], treeRecursive(temp2), treeRecursive(temp1));
  }
}

// prettyPrint function from TOP (only works with perfectly balanced trees)
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//buildTree([1, 7, 4, 23, 8, 9, 4, 3, 64, 5, 7, 9, 67, 6345, 324, 10345])
//buildTree([3,4,5])

let tree = new BST(
  buildTree([
    1, 7, 4, 23, 8, 9, 11111, 12, 4, 3, 64, 5, 7, 9, 67, 6345, 324, 10345,
  ])
);
//let tree2 = new BST(buildTree([1, 7, 4, 23, 5, 7, 14, 9, 67, 6345, 324]));

//console.log(tree2.root.right.right.right)
//prettyPrint(tree.root);
//tree.insert(12, tree.root);
//tree.insert(4, tree.root);
tree.insert(48, tree.root);
tree.insert(47, tree.root);
//console.log(tree);
//prettyPrint(tree.root);
tree.delete(480, tree.root);
tree.delete(47, tree.root);
prettyPrint(tree.root);
tree.insert(47, tree.root);
prettyPrint(tree.root);
tree.delete(48, tree.root);
tree.delete(23, tree.root);
tree.delete(12, tree.root);
tree.delete(324, tree.root);
prettyPrint(tree.root);