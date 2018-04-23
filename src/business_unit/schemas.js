//@flow
import { schema } from "normalizr";

export const business_unit = new schema.Entity("business_units");

export const list = single => new schema.Entity(
  "results",
  { results: [single] },
  { idAttribute: () => "business_units" }
);

export * from "src/schemas";