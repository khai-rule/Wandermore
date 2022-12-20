import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
  { field: 'country', headerName: 'Country', width: 150, },
  { field: 'departureDate', headerName: 'Departure', width: 250, },
  { field: 'returnDate', headerName: 'Return', width: 250, },
  { field: 'status', headerName: 'Status', width: 150, },
];


export default function DataTable() {
    const [inDatabase, setInDatabase] = useState();
    const [message, setMessage] = useState("");
    const [id, setId] = useState();

    const navigate = useNavigate();

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
        }, [inDatabase]);

    const rows = () => {
        const mapInDatabase = inDatabase?.map(item => {
            const firstName = item?.user?.firstName
            const lastName = item?.user?.lastName
            const email = item?.user?.email
            const country = item?.country
            //TODO format date
            // const localNDate = nDate.toLocaleDateString('sv-SE');
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
                returnDate: returnDate,
                //TODO to check if there is an activity
                status: "Pending"
            }
            return obj
        })
        return mapInDatabase
    }
    

    //! Delete Trip
    const handleDelete = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          const response = await fetch(`/api/trips/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            setMessage(
              "User Trip Request Deleted"
            );
          }
        } catch (error) {
          throw new Error("Network response was not OK");
        }
    }

    //! Go to add activities page
    const handleItinerary = () => {
        navigate(`/createitinerary/${id}`);
    }

    const data = rows();
    const handleRowClick = (params) => {
        setId(params.row.id)
        setMessage(`User ${params.row.firstName} "${params.row.id}" clicked`);
      };
    
      //! Only show buttons when item is clicked
      const actions = () => {
        if (message === "") {
            return
        } else {
            return (
                <div>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleItinerary}>Create/Update Itinerary</button>
                </div>
            )
        }
      }

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
        {actions()}
    </>
  );
}