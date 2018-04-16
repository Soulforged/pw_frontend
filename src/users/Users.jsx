//@flow
import React from "react";
import UsersList from "./containers/UsersListContainer";

export default () => (
  <div id="user-div">
    <div id="search-pnl" className="text-left">
      <div id="filter-row" className="row">
        <div className="col-md-2 col-sm-2">
          <label htmlFor="rows">
            Rows per page
            <select id="rows" className="form-control" name="rows" defaultValue="15">
              <option value="10">10 Rows</option>
              <option value="15">15 Rows</option>
              <option value="25">25 Rows</option>
              <option value="50">50 Rows</option>
              <option value="75">75 Rows</option>
            </select>
          </label>
        </div>
        <div className="col-md-3 col-sm-3">
          <label htmlFor="criteria">
            Search criteria
            <select id="criteria" className="form-control" name="criteria" defaultValue="userName">
              <option value="userName">User Name</option>
              <option value="businessunit">Business Unit</option>
            </select>
          </label>
        </div>
        <div className="col-md-3 col-sm-3 txt-div">
          <label htmlFor="filter" className="lbl">
            Search text
            <input id="filter" className="form-control" placeholder="Text to search" />
          </label>
        </div>
        <div className="col-md-3 col-sm-3 slct-div hidden">
          <label htmlFor="srch-bunit" className="lbl">
            Business unit
            <select className="form-control" name="srch-bunit" style={{ maxWidth: 250 }} />
          </label>
        </div>
        <div className="col-md-1 col-sm-1 text-right">
          <button id="filter-btn" className="btn">GO</button>
        </div>

      </div>
    </div>

    <div id="main-pnl" className="pnls" data-attribute="administration">
      <div id="trans-wrap">
        <h2 className="form-header trebuchet bold">Back Office User(s) List
          <span className="add-new-btn pointer pull-right bold">
            <i className="fa fa-plus theme" />
            New User
          </span>
        </h2>

        <div className="tbl-wrapper">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>UserName</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Business Unit</th>
                <th>Role</th>
                <th>Status</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <UsersList />
            </tbody>
          </table>
        </div>
      </div>

      <div id="trans-new" style={{ display: "none" }}>
        <h2 className="form-header trebuchet text-center bold">
          New Back Office User
          <span className="add-new pointer pull-right bold">
            <i className="fa fa-close theme" />
          </span>
        </h2>
        <div className="add-pnl-cnt">
          <form id="user_frm">
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="usertype">
                  User Type
                  <select id="usertype" className="form-control" name="usertype" required defaultValue="1">
                    <option value="">Choose a User Type</option>
                    <option value="1">Business User</option>
                  </select>
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="fname">
                  First Name:
                  <input id="fname" className="form-control" name="fname" required placeholder="First Name" />
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="mname">
                  Middle Name:
                  <input id="mname" className="form-control" name="mname" placeholder="Middle Name (Optional)" />
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="lname">
                  Last Name:
                  <input id="lname" className="form-control" name="lname" required placeholder="Last Name" />
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="uname">
                  UserName:
                  <input id="uname" className="form-control" name="uname" required placeholder="UserName" />
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="phone">
                  Phone Number:
                  <input id="phone" className="form-control" name="phone" required placeholder="Phone Number" />
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="email">
                  Email:
                  <input id="email" className="form-control" name="email" placeholder="Email (Optional)" />
                </label>
              </div>
            </article>
            <article className="row modal-p hidden">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="status">
                  Status
                  <select id="status" className="form-control" name="status" defaultValue="1">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="bunit">
                  Business Unit
                  <select id="bunit" className="form-control" name="bunit">
                    <option value="">Choose a Business Unit</option>
                  </select>
                </label>
              </div>
            </article>
            <article className="row modal-p">
              <div className="col-md-6 col-sm-6">
                <label htmlFor="role">
                  Role
                  <select id="role" className="form-control" name="role">
                    <option value="">Choose a Role</option>
                  </select>
                </label>
              </div>
            </article>
            <hr />
            <article className="row modal-p text-center">
              <input type="submit" className="btn btn-default" value="SAVE" />
            </article>
          </form>
        </div>
      </div>
    </div>
  </div>
);
