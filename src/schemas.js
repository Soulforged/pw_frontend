//@flow
type Error = {
  status: number,
  description: string
};

export const error = (error: Error, status) => { //eslint-disable-line
  switch (status) {
  case 404: {
    return { message: error.description, expected: true };
  }
  default: {
    return { message: error.description };
  }
  }
};
