// skip to the next event loop cycle
export const waitForResponse = async (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve));
