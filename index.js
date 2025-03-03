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
}

// helper to visualize tree
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
