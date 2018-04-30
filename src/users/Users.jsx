//@flow
import React from "react";
import { CRUD, CRUDFilter } from "src/components";
import UsersList from "./containers/UsersListContainer";

type Props = {
  openForm: () => void,
  fetchUserByCriteria: (Object) => void
}

const Filter = ({ fetchUserByCriteria }: { fetchUserByCriteria: (Object) => void }) => (
  <CRUDFilter filter={fetchUserByCriteria}>
    <div className="col-md-3 col-sm-3">
      <label htmlFor="criteria">
        Search criteria
        <select id="criteria" className="form-control" name="criteria" defaultValue="userName">
          <option value="userName">User Name</option>
          <option value="businessunit">Business Unit</option>
        </select>
      </label>
    </div>
    <div className="col-md-4 col-sm-4 txt-div">
      <label htmlFor="filter" className="lbl">
        Search text
        <input name="filter" className="form-control" placeholder="Text to search" />
      </label>
    </div>
    <div className="col-md-4 col-sm-4 slct-div hidden">
      <label htmlFor="srch-bunit" className="lbl">
        Business unit
        <select className="form-control" name="srch-bunit" />
      </label>
    </div>
  </CRUDFilter>
);

export default (props: Props) => (
  <CRUD
    title="Back office users"
    createButtonTitle="New user"
    openForm={props.openForm}
    filter={<Filter {...props} />}
  >
    <UsersList />
  </CRUD>
);
