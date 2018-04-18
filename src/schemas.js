//@flow

export const error = error => { //eslint-disable-line
  switch (error.status) {
  case 404: {
    return { message: error.description, expected: true };
  }
  default: {
    return { message: error.description };
  }
  }
};
