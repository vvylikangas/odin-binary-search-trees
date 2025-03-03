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
console.log('--------');
myTree.insert(2);
prettyPrint(myTree.root);
console.log('--------');
myTree.deleteItem(2);
prettyPrint(myTree.root);
console.log('--------');
myTree.deleteItem(4);
prettyPrint(myTree.root);
console.log('--------');
