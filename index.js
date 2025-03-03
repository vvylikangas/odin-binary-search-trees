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

  deleteItem(value) {}

  find(value) {}
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

// Print the tree
prettyPrint(myTree.root);

// Testing
myTree.insert(90);
prettyPrint(myTree.root);
myTree.insert(2);
prettyPrint(myTree.root);
