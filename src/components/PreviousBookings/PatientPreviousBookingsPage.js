import React, { useState, useEffect } from "react";
import Table from "../Table/Table";

import styled from "styled-components";
import makeData from "./makeData";
import { bookingDetails } from "../../services/slots.service";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../Loader/Loader";
function PatientPreviousBookingsPage() {
  const dispatch = useDispatch();
  const { currentUser: patient } = useSelector((state) =>
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
  const columns = React.useMemo(
    () => [
      {
        Header: "Doctor Name",
        accessor: "doctorName",
      },
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
        Header: "Prescription",
        accessor: "prescribtion",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],

    []
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    dispatch(bookingDetails({ patientId: patient.id }))
      .then((res) => {
        let newData =
          res.length > 0
            ? res.map((data) => {
                // console.log(data);
                return {
                  doctorName: data.doctorName,
                  specialty: data.specialty,
                  bookingDate: data.fullDate + " " + data.detailText,
                  consultancyFee: data.consultancyFee + " ₹",
                  prescribtion: data.prescribtion,
                  status: "active",
                };
              })
            : [];
        setData(newData);
        setLoading(false);
      })
      .then((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Styles>
      <div className="table_container">
        {loading ? (
          <LoadingPage />
        ) : data && data.length > 0 ? (
          <Table columns={columns} data={data} />
        ) : (
          <div className="norecords">
            <div className="col">
              <br />

              <h2> Sessions Not Available</h2>
            </div>
          </div>
        )}
      </div>
    </Styles>
  );
}
export default PatientPreviousBookingsPage;
