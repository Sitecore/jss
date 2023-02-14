const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Spy on console.warn to check for specific warning message
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (
      message ===
        '[Vue warn]: Invalid prop: type check failed for prop "componentFactory". Expected Object, got Function' ||
      '[Vue warn]: Invalid prop: type check failed for prop "field". Expected Object, got Null'
    ) {
      return;
    }
    originalConsoleWarn(message);
  });
});

afterAll(() => {
  // Restore original console.warn implementation
  jest.spyOn(console, 'warn').mockRestore();
});
