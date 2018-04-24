//@flow
import { schema } from "normalizr";

export const role = new schema.Entity("roles");

export const list = single => new schema.Entity(
  "results",
  { results: [single] },
  { idAttribute: () => "roles" }
);

export * from "src/schemas";
