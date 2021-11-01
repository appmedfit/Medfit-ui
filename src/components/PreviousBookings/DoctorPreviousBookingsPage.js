import React, { useState, useEffect } from "react";
import Table from "../Table/Table";
import styled from "styled-components";
import { bookingDetails } from "../../services/slots.service";
import { useDispatch, useSelector } from "react-redux";
function DoctorPreviousBookingsPage() {
  const dispatch = useDispatch();
  const { currentUser: doctor } = useSelector((state) =>
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
        Header: "Patient Name",
        accessor: "patientName",
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
        Header: "Prescribition",
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

  const getData = () => {
    dispatch(bookingDetails({ doctorId: doctor.id })).then((res) => {
      let newData =
        res.length > 0
          ? res.map((data) => {
              //   console.log(data);
              return {
                patientName: data.patientName,
                specialty: data.specialty,
                bookingDate: data.fullDate + " " + data.detailText,
                consultancyFee: data.consultancyFee + " ₹",
                prescribtion: data.prescribtion,
                status: "active",
              };
            })
          : [];
      setData(newData);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Styles>
      <div className="table_container">
        {data && data.length > 0 && <Table columns={columns} data={data} />}
      </div>
    </Styles>
  );
}
export default DoctorPreviousBookingsPage;
