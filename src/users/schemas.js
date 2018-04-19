//@flow
import { schema } from "normalizr";

export const user = new schema.Entity("users");

export const list = single => new schema.Entity(
  "results",
  { results: [single] },
  { idAttribute: () => "users" }
);

export * from "src/schemas";
