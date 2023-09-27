
// node class to for linking balanced search tree of nodes
class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}


// balanced search tree class with alteration/search/ordering
class BST {
  constructor(root) {
    this.root = root;
  }

  // check for presence of value, add if necessary
  insert(value, root) {
    if (root === null) {
      return;
    }
    //console.log(`root ${root.value}`)
    //console.log(`value ${value}`)
    if (value === root.value) {
      console.log(`Node ${value} already in list`);
      return;
    }
    if (value < root.value && root.left === null) {
      console.log(`Inserting Node ${value}`);
      return (root.left = new Node(value));
    } else if (value > root.value && root.right === null) {
      console.log(`Inserting Node ${value}`);
      return (root.right = new Node(value));
    } else {
      value < root.value
        ? this.insert(value, root.left)
        : this.insert(value, root.right);
      return root.value;
    }
  }

  delete(value, root) {
    if (root === null) {
      return root;
    }
    // delete using 'inorder' number as swap case
    if (value === root.value && root.right !== null && root.left !== null) {
      let inOrder = this.inorder(root.right, value);
      let tempLeft = root.left;
      let tempRight = root.right;
      console.log(`Replacing Node ${value} with ${inOrder}`);
      this.deleteNode(root.right, inOrder);
      root.value = inOrder;
      root.left = tempLeft;
      root.right = tempRight;
    }
    // delete lower leaves with replacement of value
    else if (value === root.value && root.left !== null) {
      root.value = root.left.value;
      root.left = null;
    } else if (value === root.value && root.right !== null) {
      root.value = root.right.value;
      root.right = null;
    } else if (value === root.value) {
      this.deleteNode(this.root, value);
      return null;
    } else {
      value < root.value
        ? this.delete(value, root.left)
        : this.delete(value, root.right);
    }
    /*     if (value !== root.value) {
      return console.log(`Value ${value} not found`);
    } */
  }

  // this method created to find a "swap" for values at lower levels of tree
  inorder(root, value) {
    if (root.left) {
      if (root.left.value === value) {
        return root;
      }
      let left = root.left;
      while (left.left) {
        return this.inorder(left, value);
      }
      return left.value;
    }
  }

  // needed to crete this method to remove leaf nodes (left/right=null)
  deleteNode(root, value) {
    if (root === null) {
      return;
    }
    if (root.left !== null) {
      if (root.left.value === value) {
        console.log(`Deleting Node ${value}`);
        root.left = null;
      } else {
        this.deleteNode(root.left, value);
      }
    }
    if (root.right !== null) {
      if (root.right.value === value) {
        console.log(`Deleting Node ${value}`);
        root.right = null;
      } else {
        this.deleteNode(root.right, value);
      }
    }
  }

  find(value, root, node) {
    if (root === null) {
      return;
    }
    if (root.value === value) {
      console.log(`Found ${value}`);
      node = root;
      return node;
    } else {
      //console.log(`node ${node}`);
      value < root.value
        ? (node = this.find(value, root.left, node))
        : (node = this.find(value, root.right, node));
      return node;
    }
  }

  // function using array as queue to process nodes in level order
  levelOrder(root, queue = [root], levelOrderList = []) {
    if (queue.length === 0) {
      return levelOrderList;
    }
    if (queue[0] === null) {
      queue.shift(1);
      this.levelOrder(queue[0], queue, levelOrderList);
    } else {
      //console.log(queue);
      levelOrderList.push(queue[0].value);
      queue.push(queue[0].left, queue[0].right);
      queue.shift(1);
      this.levelOrder(queue[0], queue, levelOrderList);
      return levelOrderList;
    }
  }

  preOrder(root, array = []) {
    if (root === null) {
      return array;
    } else {
      //console.log(root.value);
      array.push(root.value);
      this.preOrder(root.left, array);
      this.preOrder(root.right, array);
      return array;
    }
  }

  inOrder(root, array = []) {
    if (root === null) {
      return array;
    } else {
      this.inOrder(root.left, array);
      //console.log(root.value);
      array.push(root.value);
      this.inOrder(root.right, array);
      return array;
    }
  }

  postOrder(root, array = []) {
    if (root === null || root === undefined) {
      return array;
    } else {
      this.postOrder(root.left, array);
      this.postOrder(root.right, array);
      //console.log(root.value);
      array.push(root.value);
      return array;
    }
  }

  height(value, root) {
    let foundNode = this.find(value, root);
    if (foundNode.left === null && foundNode.right === null) {
      return console.log(`Value ${value} height is 0`);
    } else {
      const heights = checkHeight(foundNode);
      console.log(heights);
      let max = Math.max(...heights);
      return console.log(`Value ${value} height is ${max}`);
    }
    // Removed the below to run the 'height' check as a seperate recursive
    /*     while (foundNode.left) {
      hLeft++;
      foundNode = foundNode.left;
    }
    while (foundNode.right) {
      hRight++;
      foundNode = foundNode.right 
    }
    console.log(hLeft)
    console.log(hRight); */
  }

  depth(value, root, depth = -1) {
    depth++;
    if (root === null) {
      return;
    }
    if (root.value === value) {
      console.log(`Found ${value} at depth ${depth}`);
      return console.log(root);
    }

    value < root.value
      ? this.depth(value, root.left, depth)
      : this.depth(value, root.right, depth);
  }

  // check balance through comparison of traversal height from root
  isBalanced(root) {
    const heights = checkHeight(root);
    console.log(heights);
    let minHeight = Math.min(...heights);
    let maxHeight = Math.max(...heights);
    maxHeight - minHeight > 1
      ? console.log("Tree is unbalanced")
      : console.log("Tree is balanced");
  }

  // fetch inorder and return new tree 
  reBalance(root) {
    let values = this.inOrder(root);
    console.log(values);
    return (this.root = buildTree(values));
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
  console.log(` Root ${root.value}`);
  return (this.root = root);
}

// Recursively return new Nodes down tree.
function treeRecursive(array) {
  if (array.length <= 2) {
    if (array.length === 1) {
      //console.log(`base ${array[0]}`);
      return new Node(array[0]);
    } else if (array.length === 2) {
      //console.log(`base ${array[1]},${array[0]}`);
      return new Node(array[1], new Node(array[0]));
    } /* else if (array.length === 3) {
      console.log(`base ${array[1]}, ${array[0]}, ${array[2]}`);
      return new Node(array[1], new Node(array[0]), new Node(array[2]));
    } */
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

// function to create array of all possible 'heights' from starting node
function checkHeight(node, height = -1, arr = []) {
  if (node === null) {
    arr.push(height);
    return arr;
  } else {
    height++;
    if (node) {
      checkHeight(node.left, height, arr);
    }
    if (node) {
      checkHeight(node.right, height, arr);
    }

    height = 0;
    return arr;
  }
}

// prettyPrint function from TOP (only works with perfectly balanced trees)
// needed to add 'undefined' whilst debugging the recursive build function
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
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

// *** Driver script as per TOP assignment ***
// - random number of integers <100
// - check for balanced tree
// - add multiple integers > 100
// - check for unbalanced tree
// - rebalance tree
// - check for balanced tree

function treeScript(numValues) {
  const arr = randomArray(numValues);
  let tree = new BST(buildTree(arr));
  prettyPrint(tree.root);
  tree.isBalanced(tree.root);
  console.log(`Tree level order ${tree.levelOrder(tree.root)}`);
  console.log(`Tree preorder ${tree.preOrder(tree.root)}`);
  console.log(`Tree postorder ${tree.postOrder(tree.root)}`);
  console.log(`Tree inorder ${tree.inOrder(tree.root)}`);
  tree.insert(148, tree.root);
  tree.insert(432, tree.root);
  tree.insert(1039, tree.root);
  tree.insert(15678, tree.root);
  prettyPrint(tree.root);
  tree.isBalanced(tree.root);
  let newTree = tree.reBalance(tree.root);
  tree.isBalanced(newTree.root);
  prettyPrint(tree.root);
  console.log(`Tree level order ${tree.levelOrder(tree.root)}`);
  console.log(`Tree preorder ${tree.preOrder(tree.root)}`);
  console.log(`Tree postorder ${tree.postOrder(tree.root)}`);
  console.log(`Tree inorder ${tree.inOrder(tree.root)}`);
}

// function to produce an array of random numbers 0-99
function randomArray(numValues, arr = []) {
  for (let x = 0; x < numValues; x++) {
    arr.push(Math.floor(Math.random() * 100));
    //console.log(arr);
  }
  return arr;
}

// function to run treescript with randomly sized array
treeScript(Math.floor(Math.random() * 30) + 1);

//let tree = new BST(buildTree([48, 23, 12, 87, 56, 1, 6, 99, 5, 14, 78, 43, 3, 66, 41]));

// *** Testing of Functions throughout build ***

//buildTree([1, 7, 4, 23, 8, 9, 4, 3, 64, 5, 7, 9, 67, 6345, 324, 10345])
//buildTree([3,4,5])

/* let tree = new BST(
  buildTree([
    1, 7, 4, 23, 8, 9, 11111, 12, 4, 3, 64, 5, 7, 9, 67, 6345, 324, 10345,
  ])
); */
//let tree2 = new BST(buildTree([1, 7, 4, 23, 5, 7, 14, 9, 67, 6345, 324]));

//console.log(tree2.root.right.right.right)
//prettyPrint(tree.root);
//tree.insert(12, tree.root);
//tree.insert(4, tree.root);
//tree.insert(48, tree.root);
//tree.insert(47, tree.root);
//console.log(tree);
//prettyPrint(tree.root);
//tree.delete(480, tree.root);
//prettyPrint(tree.root);
//tree.insert(47, tree.root);
//prettyPrint(tree.root);
//tree.delete(48, tree.root);
//prettyPrint(tree.root);
//tree.delete(23, tree.root);
//tree.delete(12, tree.root);
//prettyPrint(tree.root);
//tree.insert(52, tree.root);
//prettyPrint(tree.root);
//tree.delete(67, tree.root);
//tree.delete(5, tree.root);
//prettyPrint(tree.root);
//tree.depth(6345, tree.root);
//tree.levelOrder(tree.root);
//let inList = tree.inOrder(tree.root);
//console.log(inList)
//let preList = tree.preOrder(tree.root);
//console.log(preList);
//let postList = tree.postOrder(tree.root);
//console.log(postList);
//tree.height(324, tree.root);
//tree.height(47, tree.root);
//tree.height(6345, tree.root);
//tree.isBalanced(tree.root);

// Had all of the below mess in the 'delete' method until figuring out the mystery
// of 'inorder' and adding the 'deleteNode' method.

/* try {
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
    catch{} */
