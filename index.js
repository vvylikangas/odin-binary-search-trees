class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // remove dublicates and sort in ascending order
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    // build the tree using recursion
    function constructBST(arr, start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);

      node.left = constructBST(arr, start, mid - 1);
      node.right = constructBST(arr, mid + 1, end);

      return node;
    }

    return constructBST(sortedArray, 0, sortedArray.length - 1);
  }

  insert(value) {
    function recursiveInsert(root, value) {
      if (root === null) return new Node(value);

      if (value < root.data) {
        root.left = recursiveInsert(root.left, value);
      } else if (value > root.data) {
        root.right = recursiveInsert(root.right, value);
      }

      return root;
    }

    this.root = recursiveInsert(this.root, value);
  }

  deleteItem(value) {
    function getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    }

    function recursiveDelete(root, value) {
      if (root === null) return root;

      if (value < root.data) {
        root.left = recursiveDelete(root.left, value);
      } else if (value > root.data) {
        root.right = recursiveDelete(root.right, value);
      } else {
        // Case: Found the node to delete

        // Case 1 & 2: No child or only one child
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

        // Case 3: Node with two children
        let succ = getSuccessor(root);
        root.data = succ.data; // copy successor's value
        root.right = recursiveDelete(root.right, succ.data); // delete successor node
      }

      return root;
    }

    this.root = recursiveDelete(this.root, value); // ensure tree remains updated
  }

  find(value) {
    function recursiveSearch(root, value) {
      if (root === null || root.data === value) return root;

      if (value > root.data) {
        return recursiveSearch(root.right, value);
      }

      return recursiveSearch(root.left, value);
    }
    return recursiveSearch(this.root, value);
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    // Iterative
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  levelOrderRecursive(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    let treeHeight = this._height(this.root);
    for (let level = 1; level <= treeHeight; level++) {
      this._processLevel(this.root, level, callback);
    }
  }

  // private helper to get treeHeight
  _height(node) {
    if (node === null) return 0;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  // private helper for recursion
  _processLevel(node, level, callback) {
    if (node === null) return;
    if (level === 1) callback(node);
    else {
      this._processLevel(node.left, level - 1, callback);
      this._processLevel(node.right, level - 1, callback);
    }
  }

  // callback function for levelOrder
  printNode = (node) => {
    console.log(node.data);
  };
}

// helper function to visualize the tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Example usage
const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// Testing
// console.log(myTree.find(8));
// myTree.insert(90);
prettyPrint(myTree.root);
// console.log('--------');
// myTree.insert(2);
// prettyPrint(myTree.root);
// console.log('--------');
// myTree.deleteItem(2);
// prettyPrint(myTree.root);
// console.log('--------');
// myTree.deleteItem(4);
// prettyPrint(myTree.root);
// console.log('--------');
myTree.levelOrder(myTree.printNode);
