import React from "react";

import { useTable, usePagination } from "react-table";

function Table({ columns, data, handleUploadClick, handleAddCommentClick }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <br />
      <br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  //  console.log(cell.row.original.id);
                  console.log(cell.row.values.file_url);
                  return (
                    <>
                      {cell.column.Header == "Upload file" ? (
                        <td>
                          {cell.row.values.file_url ? (
                            <a
                              href={cell.row.values.file_url}
                              className="btn "
                              target="_blank"
                              style={{ border: "1px solid black" }}
                            >
                              {" "}
                              View File
                            </a>
                          ) : (
                            <>
                              <label
                                htmlFor="contained-button-file"
                                className="btn"
                                style={{ border: "1px solid black" }}
                              >
                                Upload File
                              </label>
                              <input
                                style={{ width: "100px", display: "none" }}
                                accept="application/pdf"
                                className=""
                                id="contained-button-file"
                                type="file"
                                onChange={(event) =>
                                  handleUploadClick(event, cell.row.original.id)
                                }
                              />
                            </>
                          )}
                        </td>
                      ) : cell.column.Header == "View file" ? (
                        <td {...cell.getCellProps()} on>
                          {cell.row.values.file_url ? (
                            <a
                              href={cell.row.values.file_url}
                              className="btn "
                              target="_blank"
                              style={{ border: "1px solid black" }}
                            >
                              {" "}
                              View File
                            </a>
                          ) : (
                            "No files available"
                          )}
                        </td>
                      ) : cell.column.Header == "Comment" ? (
                        <td {...cell.getCellProps()} on>
                          <button
                            className="btn "
                            onClick={() =>
                              handleAddCommentClick(cell.row.original.id)
                            }
                            style={{ border: "1px solid black" }}
                          >
                            {" "}
                            Add Comment
                          </button>
                        </td>
                      ) : cell.column.Header == "Booking Date" ? (
                        <td {...cell.getCellProps()} on>
                          {cell.row.original.fullDate +
                            " " +
                            cell.row.original.detailText}
                        </td>
                      ) : (
                        <td {...cell.getCellProps()} on>
                          {cell.render("Cell")}
                        </td>
                      )}
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Table;
