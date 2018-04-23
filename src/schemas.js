//@flow
type Error = {
  status: number,
  description: string
};

export const error = (error: Error) => { //eslint-disable-line
  switch (error.status) {
  case 404: {
    return { message: error.description, expected: true };
  }
  default: {
    return { message: error.description };
  }
  }
};
