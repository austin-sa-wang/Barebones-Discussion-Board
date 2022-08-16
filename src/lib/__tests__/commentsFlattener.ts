import { commentsFlattener } from '../commentsFlattener';

describe(`commentsFlattener`, () => {
  it(`says hi`, () => {
    expect(commentsFlattener()).toEqual(`hi`);
  });
});
