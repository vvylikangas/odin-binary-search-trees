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
    return this._buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  // build the tree using recursion
  _buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this._buildTree(arr, start, mid - 1);
    node.right = this._buildTree(arr, mid + 1, end);

    return node;
  }

  // add node to tree
  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else if (value > node.data) {
      node.right = this._insert(node.right, value);
    }

    return node;
  }

  // delete given node
  deleteItem(value) {
    this.root = this._deleteItem(this.root, value); // ensure tree remains updated
  }

  _deleteItem(node, value) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this._deleteItem(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteItem(node.right, value);
    } else {
      // Case: Found the node to delete

      // Case 1 & 2: No child or only one child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Case 3: Node with two children
      let succ = this._getSuccessor(node);
      node.data = succ.data; // copy successor's value
      node.right = this._deleteItem(node.right, succ.data); // delete successor node
    }

    return node;
  }

  // helper for _deleteItem
  _getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // search any value
  find(value) {
    return this._find(this.root, value);
  }

  _find(node, value) {
    if (node === null || node.data === value) return node;

    if (value > node.data) {
      return this._find(node.right, value);
    }

    return this._find(node.left, value);
  }

  // LEVEL ORDER
  // iterative approach
  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.shift();
      callback(node);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }

  // recursive
  levelOrderRecursive(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    let treeHeight = this._height(this.root);
    for (let level = 0; level <= treeHeight; level++) {
      this._processLevel(this.root, level, callback);
    }
  }

  // helper for recursion level order
  _processLevel(node, level, callback) {
    if (node === null) return;
    if (level === 0) callback(node);
    else {
      this._processLevel(node.left, level - 1, callback);
      this._processLevel(node.right, level - 1, callback);
    }
  }

  // IN ORDER
  inOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    this._inOrder(this.root, callback);
  }

  _inOrder(node, callback) {
    if (node === null) return;

    this._inOrder(node.left, callback);
    callback(node);
    this._inOrder(node.right, callback);
  }

  // PRE ORDER
  preOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    this._preOrder(this.root, callback);
  }

  _preOrder(node, callback) {
    if (node === null) return;

    callback(node);
    this._preOrder(node.left, callback);
    this._preOrder(node.right, callback);
  }

  // POST ORDER
  postOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required.');
    }

    this._postOrder(this.root, callback);
  }

  _postOrder(node, callback) {
    if (node === null) return;

    this._postOrder(node.left, callback);
    this._postOrder(node.right, callback);
    callback(node);
  }

  // function for order callbacks
  printNode = (node) => {
    console.log(node.data);
  };

  // number of edges in the longest path from given node to a leaf node
  height(node) {
    return this._height(node);
  }

  // private helper to calculate tree height
  _height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  // number of edges in the path from given node to tree's root node
  depth(node) {
    return this._depth(this.root, node, 0);
  }

  _depth(nodeNode, targetNode, nodeDepth) {
    if (nodeNode === null) return -1;
    if (nodeNode === targetNode) return nodeDepth;

    let leftDepth = this._depth(nodeNode.left, targetNode, nodeDepth + 1);
    if (leftDepth !== -1) return leftDepth; // if found in left subtree, return the depth

    return this._depth(nodeNode.right, targetNode, nodeDepth + 1); // check right subtree
  }

  // check if tree is balanced
  isBalanced() {
    return this._isBalanced(this.root);
  }

  _isBalanced(node) {
    if (node === null) return true;

    let leftHeight = this._height(node.left);
    let rightHeight = this._height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }

  // rebalance tree after insertions/deletions
  rebalance() {
    const array = [];
    this._collectInOrder(this.root, array);
    this.root = this.buildTree(array);
  }

  // helper for rebalancing
  _collectInOrder(node, array) {
    if (node === null) return;

    this._collectInOrder(node.left, array);
    array.push(node.data);
    this._collectInOrder(node.right, array);
  }
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

// Driver

// create 1-20 numbers between 1 and 99
const randArray = () => {
  let count = Math.floor(Math.random() * 20 + 1);
  let array = [];
  for (let i = 0; i < count; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

const tree = new Tree(randArray());
prettyPrint(tree.root);
console.log(`Is tree balanced: ${tree.isBalanced()}`);
console.log('--------');
console.log('Level order:');
tree.levelOrderRecursive(tree.printNode);
console.log('--------');
console.log('In order:');
tree.inOrder(tree.printNode);
console.log('--------');
console.log('Pre order:');
tree.preOrder(tree.printNode);
console.log('--------');
console.log('Post order:');
tree.postOrder(tree.printNode);
console.log('--------');
tree.insert(90);
tree.insert(23);
tree.insert(43);
tree.insert(4);
tree.insert(51);
console.log('Inserted numbers: 4,23,43,51,90');
console.log('--------');
prettyPrint(tree.root);
console.log('--------');
console.log(`Is tree balanced: ${tree.isBalanced()}`);
console.log('--------');
console.log('Rebalancing...');
tree.rebalance();
console.log('--------');
prettyPrint(tree.root);
console.log('--------');
console.log(`Is tree balanced: ${tree.isBalanced()}`);
console.log('--------');
console.log('Level order:');
tree.levelOrderRecursive(tree.printNode);
console.log('--------');
console.log('In order:');
tree.inOrder(tree.printNode);
console.log('--------');
console.log('Pre order:');
tree.preOrder(tree.printNode);
console.log('--------');
console.log('Post order:');
tree.postOrder(tree.printNode);
console.log('--------');
console.log(`Root node height: ${tree.height(tree.root)}`);
