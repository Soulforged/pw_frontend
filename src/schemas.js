//@flow
import { schema } from "normalizr";

type Error = {
  status: number,
  description: string
};

export const error = (error: Error, status: number) => { //eslint-disable-line
  switch (status) {
  case 404: {
    return { message: error.description, expected: true };
  }
  default: {
    return { message: error.description };
  }
  }
};

export const list = (single: schema.Entity) => new schema.Entity(
  "results",
  { results: [single] },
  { idAttribute: () => single.key }
);
