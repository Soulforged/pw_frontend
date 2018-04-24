//@flow

export const fail = (msg, e) => { //eslint-disable-line
  console.log(e || msg);
  expect(1).toBe(0);
};
