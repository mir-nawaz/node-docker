import async from 'src/util/async';

describe('util.async', () => {
  it('should catch exceptions of a function passed into it', async () => {
    const error = new Error('catch me!');
    const foo = async(() => {
      throw error;
    });
    _expect(foo).toThrowError(error);
  });

  it('should call next with the error when an async function passed into it throws', async () => {
    const error = new Error('catch me!');
    const nextMock = jest.fn();
    const foo = async(async () => {
      throw error;
    });

    await foo(null, null, nextMock);
    _expect(nextMock).toHaveBeenCalledWith(error);
  });

  it('should call next with the arguments when async function passed it calls next', async () => {
    const nextMock = jest.fn();
    const foo = async(async (req, res, next) => {
      next('test');
    });

    await foo(null, null, nextMock);
    _expect(nextMock).toHaveBeenCalledWith('test');
  });

  it('should provide additional arguments to the async util', async () => {
    const nextMock = jest.fn();
    const idMock = '1';
    const foo = async(async (req, res, next, id) => id);

    const result = await foo(null, null, nextMock, idMock);
    _expect(result).toEqual(idMock);
  });
});
