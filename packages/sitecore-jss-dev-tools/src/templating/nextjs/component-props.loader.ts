import * as recast from 'recast';

type VariableDeclaration = recast.types.namedTypes.VariableDeclaration;

/**
 * Webpack loader to strip functions from the source code
 * Strips the `getServerSideProps` and `getStaticProps` functions from the source code
 * @param {string} source file source code
 * @returns {string} output file source code with stripped functions
 */
export default function componentPropsLoader(source: string) {
  // Parse the source code into an AST (Abstract Syntax Tree)
  const ast = recast.parse(source, {
    parser: require('recast/parsers/babel-ts'),
  });

  // List of functions to strip from the AST
  const functionsToStrip = ['getServerSideProps', 'getStaticProps'];

  // Remove the function from the list of functions to strip
  const updateList = (functionName: string) => {
    // Remove the function from the list of functions to strip
    functionsToStrip.splice(functionsToStrip.indexOf(functionName), 1);
  };

  // Traverse the AST and strip the functions
  recast.visit(ast, {
    // Visit the named export function expression
    visitExportNamedDeclaration: function(path): boolean | void {
      // Get the variable declaration from the AST
      (path.node.declaration as VariableDeclaration)?.declarations?.forEach((declaration) => {
        // Check if the function is in the list of functions to strip
        if (
          'id' in declaration &&
          'name' in declaration.id &&
          typeof declaration.id.name === 'string' &&
          functionsToStrip.includes(declaration.id.name)
        ) {
          updateList(declaration.id.name);

          // Strip the function from the AST
          path.prune();
        }
      });

      if (functionsToStrip.length === 0) {
        // We have pruned all the functions we need to, so we can stop traversing the AST
        return false;
      }

      // Continue traversing the AST
      this.traverse(path);
    },
    // Visit the named export function declaration
    visitFunctionDeclaration: function(path): boolean | void {
      // Check if the function is in the list of functions to strip
      if (
        path.node.id &&
        'name' in path.node.id &&
        typeof path.node.id.name === 'string' &&
        functionsToStrip.includes(path.node.id.name)
      ) {
        updateList(path.node.id.name);

        // Strip the function from the AST
        path.prune();
      }

      if (functionsToStrip.length === 0) {
        // We have pruned all the functions we need to, so we can stop traversing the AST
        return false;
      }

      // Continue traversing the AST
      this.traverse(path);
    },
  });

  // Generate the output code
  return recast.print(ast).code;
}
