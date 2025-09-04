/**
 * Determines whether the current execution context is server-side
 * @returns true if executing server-side
 */
function isServer(): boolean {
  return !(typeof window !== 'undefined' && window.document);
}

export default isServer;
