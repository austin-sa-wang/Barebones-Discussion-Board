declare module 'treeverse' {
  function depth<T>(thing: {
    tree: T;
    getChildren: (node: T) => T[];
    visit: (node: T) => void;
  }): void;
}
