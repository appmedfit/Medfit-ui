import React, { useState, useEffect } from "react";
import Table from "../Table/Table";
import styled from "styled-components";
import { bookingDetails } from "../../services/slots.service";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import LoadingPage from "../Loader/Loader";
import back_arrow from "../../assets/back_arrow.png";
import { getDateTimestamp, getTimeDiff } from "../../helpers/helper";
import "./Booking.css";
import { fileupload } from "../../services/fileupload.service";
function DoctorPreviousBookingsPage() {
  const dispatch = useDispatch();
  let { filter } = useParams();
  let history = useHistory();
  const { currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const Styles = styled.div`
    .table_container {
      min-height: 460px;
    }
    table {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 90%;
      margin-left: 40px;
      min-height: 460px;
      margin-top: -40px;
    }

    table td,
    table th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    table tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    table tr:hover {
      background-color: #ddd;
    }

    table th,
    tfoot td {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      background-color: #000;
      color: white;
    }

    .pagination {
      justify-content: center;
      display: flex;
      /* padding-left: 4px; */
      list-style: none;
      border-radius: 0.25rem;
      margin: 5px;
      button,
      span,
      select {
        margin: 4px;
      }
    }
  `;

  const getcolumns = () => {
    let col = [
      {
        Header: "Consultation type",
        accessor: "specialty",
      },
      {
        Header: "Booking Date",
        accessor: "bookingDate",
      },
      {
        Header: "Fee ₹",
        accessor: "consultancyFee",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
    ];
    console.log(currentUser);
    let obj =
      currentUser.role == "doctor"
        ? {
            Header: "Patient Name",
            accessor: "patientName",
          }
        : {
            Header: "Doctor Name",
            accessor: "doctorName",
          };
    col.unshift(obj);

    obj =
      currentUser.role == "user"
        ? {
            Header: "Upload file",
            accessor: "file_link",
          }
        : {
            Header: "view file",
            accessor: "file_link",
          };
    col.push(obj);
    return col;
  };
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterBy, setFilterBy] = useState(filter);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFilterBy(e.target.value);
    console.log(filterBy);
  };
  const handleFilterData = () => {
    console.log("data", data);
    let newData = data.filter((sess) => {
      if (filterBy == "upcoming") {
        return getTimeDiff(getDateTimestamp(sess.bookingDate)) + 20 > 0;
      }

      if (filterBy == "completed") {
        return getTimeDiff(getDateTimestamp(sess.bookingDate)) + 20 < 0;
      }

      if (filterBy == "all") {
        console.log(filterBy, "all");
        return true;
      }
    });

    searchHandle(newData);
  };

  const handleUploadClick = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", event.target.files[0].name);

    dispatch(fileupload(data))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log(data);
  };
  const searchHandle = (newData) => {
    console.log("search", searchTerm);
    let Searchdata = newData.filter((data) => {
      if (searchTerm == "undefined" || searchTerm == null || searchTerm == "") {
        return true;
      } else {
        return JSON.stringify(Object.values(data))
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    });
    setFilterData(Searchdata);
    console.log("Searchdata", Searchdata);
    console.log("searfilterData", filterData);
  };

  useEffect(() => {
    if (data) handleFilterData();
  }, [filterBy, data, searchTerm]);

  useEffect(() => {
    if (currentUser) getData();
  }, []);
  const getData = () => {
    setLoading(true);
    console.log("col", getcolumns());
    setColumns(getcolumns());
    let reqObj =
      currentUser.role == "doctor"
        ? { doctorId: currentUser.id }
        : { patientId: currentUser.id };
    dispatch(bookingDetails(reqObj))
      .then((res) => {
        let newData =
          res.length > 0
            ? res.map((data) => {
                let row = {
                  specialty: data.specialty,
                  bookingDate: data.fullDate + " " + data.detailText,
                  consultancyFee: data.consultancyFee + " ₹",
                  prescribtion: data.prescribtion,
                };
                if (currentUser.role == "doctor") {
                  row.patientName = data.patientName;
                } else {
                  row.doctorName = data.doctorName;
                }
                return row;
              })
            : [];
        setData(newData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="table_container">
      {loading ? (
        <LoadingPage />
      ) : data && data.length > 0 ? (
        <>
          <div className="filterContainer">
            {" "}
            <div
              className="prev_book_go_back"
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={back_arrow} /> Go Back
            </div>
            <div className="InputContainer">
              <select
                name="specialty"
                value={filterBy}
                className="emailInput"
                onChange={(e) => handleChange(e)}
              >
                <option value="all">All</option>
                <option value="completed">Completed Sessions</option>
                <option value="upcoming">Upcoming Sessions</option>
              </select>
            </div>
            <div className="booking_search">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M6.732 12.229c-3.146 0-5.696-2.506-5.696-5.602 0-3.096 2.55-5.607 5.696-5.607s5.696 2.511 5.696 5.607-2.55 5.602-5.696 5.602zm9.116 2.9l-4.13-4.066a6.526 6.526 0 0 0 1.745-4.436C13.463 2.966 10.45 0 6.732 0S0 2.966 0 6.627c0 3.656 3.014 6.622 6.732 6.622 1.606 0 3.08-.555 4.237-1.48l4.147 4.081c.202.2.53.2.732 0a.503.503 0 0 0 0-.72z"
                    opacity=".4"
                  />
                </svg>
              </span>
              <div
                id="care_doctor_search_input"
                className="booking-search-input-container"
              >
                <input
                  placeholder="search by "
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Styles>
            <Table
              columns={columns}
              data={filterData}
              handleUploadClick={handleUploadClick}
            />
          </Styles>
        </>
      ) : (
        <div className="norecords">
          <div className="col">
            <br />

            <h2> Sessions Not Available</h2>
          </div>
        </div>
      )}
    </div>
  );
}
export default DoctorPreviousBookingsPage;
