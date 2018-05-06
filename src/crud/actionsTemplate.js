//@flow
import { push } from "react-router-redux";
import { CALL_API } from "src/constants";
import actions from "src/actions";
import mocks from "src/mocks";
import { list, error } from "src/schemas";

const { fetchEntitiesTypes, saveTypes } = actions;
const restPath = body => (body.id ? `/${body.id}` : "");

const fetchAll = (basePath, key, schema, { mock, baseQuery = () => "" }) => () => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(key),
    endpoint: `${basePath}${baseQuery()}`,
    schema: list(schema),
    errorSchema: error,
    key,
    invalidatesCache: true,
    mock: mock && mocks[key]
  }
});

export default (entityName, basePath, schema, {
  mock, queryCreator, baseQuery, filterSchema
}) => {
  const key = `${entityName}s`;
  return {
    save: (body: User) => ({
      [CALL_API]: {
        types: saveTypes(entityName),
        endpoint: `${basePath}${restPath(body)}`,
        body,
        update: body.id != null,
        key,
        errorSchema: error,
        after: dispatch => dispatch(push(`/${key.underscore()}`)),
        invalidatesCache: true,
        mock: mock && mocks[entityName]
      }
    }),
    fetchOne: (id: number) => ({
      [CALL_API]: {
        types: fetchEntitiesTypes(entityName),
        endpoint: `${basePath}/${id}`,
        schema,
        errorSchema: error,
        key,
        mock: mock && mocks[entityName]
      }
    }),
    fetchAll: fetchAll(basePath, key, schema, { mock, baseQuery }),
    filter: (params: Object) => {
      if (!params) {
        return fetchAll();
      }
      return {
        [CALL_API]: {
          types: fetchEntitiesTypes(`${key}_FILTER`),
          endpoint: `${basePath}${queryCreator(params)}`,
          schema: filterSchema || list(schema),
          errorSchema: error,
          key,
          invalidatesCache: true,
          mock: mock && mocks[entityName]
        }
      };
    }
  };
};
