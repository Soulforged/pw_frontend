//@flow

import { schema } from "normalizr";

export const usersSchema = new schema.Entity("users", {}, { //eslint-disable-line
  idAttribute: ({ username }) => username
});
