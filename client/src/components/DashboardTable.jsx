import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';

const columns = [
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
  { field: 'country', headerName: 'Country', width: 150, },
  { field: 'departureDate', headerName: 'Departure', width: 250, },
  { field: 'returnDate', headerName: 'Return', width: 250, },
];


export default function DataTable() {
const [inDatabase, setInDatabase] = useState();
const [message, setMessage] = useState('');

useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`/api/trips`);
        try {
        if (!response.ok) {
            throw new Error("Network error");
        }
        const data = await response.json();
        if (data !== null) {
            setInDatabase(data);
        }
        } catch (error) {
        throw new Error("Network response was not OK");
        }
    };
    fetchData();
    }, []);

    console.log(inDatabase)

    const rows = () => {
        const mapInDatabase = inDatabase?.map(item => {
            const firstName = item?.user?.firstName
            const lastName = item?.user?.lastName
            const email = item?.user?.email
            const country = item?.country
            const departureDate = item?.departureDate
            const returnDate = item?.returnDate
            const id = item?._id
            const obj = {
                id: id,
                firstName: firstName,
                lastName: lastName, 
                email: email,
                country: country, 
                departureDate: departureDate,
                returnDate: returnDate
            }
            return obj
        })
        return mapInDatabase
    }
    
    const data = rows();
    const handleRowClick = (params) => {
        setMessage(`User ${params.row.firstName} "${params.row.id}" clicked`);
      };



  return (
    <>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            onRowClick={handleRowClick} {...data}
            rows={rows() ?? rows}
            rowCount={2}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
        </div>
        <p>{message}</p>
    </>
  );
}