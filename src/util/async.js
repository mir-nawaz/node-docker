/**
 * async await
 * @param {function(*, *): Promise<void>} fn async function
 * @returns {function(...[*]): Promise<unknown>} async
 */
const async = (fn) => (...args) => {
  const fnReturn = fn(...args);
  const next = args[args.length - 1];
  return Promise.resolve(fnReturn).catch(next);
};

export default async;
