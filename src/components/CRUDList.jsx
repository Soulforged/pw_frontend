//@flow
import React from "react";
import ReactTable from "react-table";
import { compose, branch, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const data = entities => (
  !entities.error && entities.lastResultIds ?
    entities.lastResultIds.map(id => entities.byId[id])
    : []
);

type Props = {
  entities: Object,
  showDetails: (id: number) => void,
  columns: Object
};

const Component = ({ entities, showDetails, columns }: Props) => (
  <ReactTable
    data={data(entities)}
    columns={columns}
    className="-striped -highlight table table-striped"
    noDataText={(entities.error && entities.error.expected && entities.error.message) || "No data to show"}
    defaultPageSize={10}
    getTrProps={(state, rowInfo) => (
      {
        onClick: () => showDetails(rowInfo.original.id)
      }
    )}
  />
);

const SpecLoading = () => <Loading loading />;

export default compose(
  boundLifecycle({
    didMount: ({ loader }) => loader()
  }),
  branch(({ entities }) => entities.fetching, renderComponent(SpecLoading))
)(Component);
