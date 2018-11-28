export default (args: any) => {
  // do something spectacular
  const proc1result = true;
  return Promise.resolve({
    ...args,
    proc1result,
  });
};
