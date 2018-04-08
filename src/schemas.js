//@flow
import { schema } from "normalizr";

export const User = new schema.Entity("users", {}, { //eslint-disable-line
  idAttribute: user => user.details.userName
});
