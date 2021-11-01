import React from "react";
import Table from '../../components/Table/Table';

import styled from 'styled-components'
import makeData from './makeData'
function PatientPreviousBookingsPage() {
  
const Styles = styled.div`
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin-left:40px
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
   margin:5px;
   button,span,select{
     margin:4px;
   }
}

`
  const columns = React.useMemo(
    () => 
       [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          }
        ],
    
    []
  )

  const data = React.useMemo(() => makeData(100), [])
console.log(data)
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}
export default PatientPreviousBookingsPage;


