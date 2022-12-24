import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import capitaliseFirstLetter from '../utilities/capitaliseFirstLetter';
import formatDate from '../utilities/formatDate';

const columns = [
  { field: 'status', headerName: 'Status', width: 150, },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'country', headerName: 'Country', width: 150, },
  { field: 'departureDate', headerName: 'Departure', width: 250, },
  { field: 'returnDate', headerName: 'Return', width: 250, },
  { field: 'paxInfo', headerName: 'Pax Info', width: 200 , },
  { field: 'otherInfo', headerName: 'Others', width: 200, },
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
        }, [message]);


    const rows = () => {
        const mapInDatabase = inDatabase?.map(item => {
            const firstName = item?.user?.firstName
            const lastName = item?.user?.lastName
            const email = item?.user?.email
            const country = item?.country
            const departureDate = item?.departureDate
            const returnDate = item?.returnDate
            const paxInfo = item?.paxInfo
            const otherInfo = item?.otherInfo
            const id = item?._id
            
            const obj = {
                id: id,
                firstName: capitaliseFirstLetter(firstName),
                lastName: capitaliseFirstLetter(lastName), 
                email: capitaliseFirstLetter(email),
                country: capitaliseFirstLetter(country), 
                departureDate: formatDate(departureDate),
                returnDate: formatDate(returnDate),
                paxInfo: capitaliseFirstLetter(paxInfo), 
                otherInfo: capitaliseFirstLetter(otherInfo), 
                status: "Incomplete"
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

    //! Event target MUI
    const data = rows();
    const handleRowClick = (params) => {
        setId(params.row.id)
        setMessage(`${params.row.firstName} trip ID:"${params.row.id}" Selected`);
      };
    
      //! Show buttons when item is clicked
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
      <p>{message}</p>
      {actions()}

      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
            onRowClick={handleRowClick} {...data}
            rows={rows() ?? rows}
            rowCount={1}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
        />
      </div>
    </>
    
  );
}