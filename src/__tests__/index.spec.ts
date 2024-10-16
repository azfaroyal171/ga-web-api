import {sample} from '../index';

describe('sample function', () => {
  it('should return 2 when a = 1, b = 1', () => {
    expect(sample(1, 1)).toEqual(2);
  });
});
