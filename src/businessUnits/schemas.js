//@flow
import { schema } from "normalizr";

export const businessUnit = new schema.Entity("businessUnits");

export const list = single => new schema.Entity(
  "results",
  { results: [single] },
  { idAttribute: () => "businessUnits" }
);

export * from "src/schemas";
