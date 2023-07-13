import React from "react";
import { ContextAuth } from "../Context/App";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { COLUMNS, GlobalFilter } from "./data";
import { ucfirst } from "../../Helper/helps";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { AnimateZoomIn } from "../SlideAnimation/SlideZoomIn";
import { NavLink } from "react-router-dom";

export const HistorySubsription = () => {
  const authContext = React.useContext(ContextAuth) as any;
  const [data, setData] = React.useState(Array);

  React.useEffect(() => {
    var CONTENT = new Array();
    authContext?.data?.history_subscription.forEach(
      (values: any, idx: number) => {
        CONTENT.push({
          IdRef: (
            <NavLink
              className="text-decoration-none"
              to={`/dasboard/payment/${values?.id_ref}`}
            >
              {values?.id_ref}
            </NavLink>
          ),
          Status:
            values?.status === "active" ? (
              <span className="text-success">{ucfirst(values?.status)}</span>
            ) : (
              <span className="text-danger">{ucfirst(values?.status)}</span>
            ),
          Duration: values?.duration,
          PaymentMethod: ucfirst(values?.payment_method),
          PaymentStatus: (
            <span className="text-success">
              {ucfirst(values?.payment_status)}
            </span>
          ),
          StartDate: values?.start_date,
          EndDate: values?.end_date,
        });
      }
    );
    setData(CONTENT);
  }, []);

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: data as any,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  }: any = tableInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <React.Fragment>
      <AnimateZoomIn>
        <Row className="mt-3">
          <Col sm={12} className="col-12">
            <Card>
              <Card.Header>
                <h4 className="card-title fw-bold">History Subscription</h4>
              </Card.Header>
              <Card.Body className="pt-0 example1-table">
                <div className="table-responsive stickyheader export-table">
                  <span className="datatable">
                    <>
                      <div className="d-flex">
                        <select
                          className=" mb-4 selectpage border me-1"
                          value={pageSize}
                          onChange={(e) => setPageSize(Number(e.target.value))}>
                          {[10, 25, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              Show {pageSize}
                            </option>
                          ))}
                        </select>
                        <GlobalFilter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
                        />
                      </div>
                      <table
                        {...getTableProps()}
                        className="table table-bordered text-nowrap mb-0"
                      >
                        <thead>
                          {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column: any) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                  className={column.className}
                                >
                                  <span className="tabletitle">
                                    {column.render("Header")}
                                  </span>
                                  <span>
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <i className="fa fa-angle-down"></i>
                                      ) : (
                                        <i className="fa fa-angle-up"></i>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {page.map((row: any) => {
                            prepareRow(row);
                            return (
                              <tr
                                className="text-center"
                                {...row.getRowProps()}
                              >
                                {row.cells.map((cell: any) => {
                                  return (
                                    <td {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="d-block d-sm-flex mt-4 ">
                        <span className="">
                          Page{" "}
                          <strong>
                            {pageIndex + 1} of {pageOptions.length}
                          </strong>{" "}
                        </span>
                        <span className="ms-sm-auto ">
                          <Button
                            variant=""
                            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                          >
                            {" Previous "}
                          </Button>
                          <Button
                            variant=""
                            className="btn-default tablebutton me-2 my-1"
                            onClick={() => {
                              previousPage();
                            }}
                            disabled={!canPreviousPage}
                          >
                            {" << "}
                          </Button>
                          <Button
                            variant=""
                            className="btn-default tablebutton me-2 my-1"
                            onClick={() => {
                              previousPage();
                            }}
                            disabled={!canPreviousPage}
                          >
                            {" < "}
                          </Button>
                          <Button
                            variant=""
                            className="btn-default tablebutton me-2 my-1"
                            onClick={() => {
                              nextPage();
                            }}
                            disabled={!canNextPage}
                          >
                            {" > "}
                          </Button>
                          <Button
                            variant=""
                            className="btn-default tablebutton me-2 my-1"
                            onClick={() => {
                              nextPage();
                            }}
                            disabled={!canNextPage}
                          >
                            {" >> "}
                          </Button>
                          <Button
                            variant=""
                            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                          >
                            {" Next "}
                          </Button>
                        </span>
                      </div>
                    </>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </AnimateZoomIn>
    </React.Fragment>
  );
};
