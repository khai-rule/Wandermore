import { Box, Button, Grid, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import formatDate from "../utilities/formatDate";

const PendingTrips = ({ loginID, render }) => {
  const [inDatabase, setInDatabase] = useState([]);
  const [renderDelete, setRenderDelete] = useState(0);

  //TODO sort - if trips has an activity - cant delete
  //TODO edit their request
  //TODO direct them to another page after submit - unlikely for user to create 2 trips in succession

  //! Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${loginID}`);
        if (!response.ok) {
          throw new Error("Network error");
        }
        const data = await response.json();
        if (data !== null) {
          setInDatabase(data.trips);
        }
      } catch (error) {
        throw new Error("Network response was not OK");
      }
    };

    fetchData();
  }, [render, renderDelete]);

  //! Delete
  const handleDelete = (id) => async () => {
    try {
      const response = await fetch(`/api/trips/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network error");
      }
      setRenderDelete(renderDelete + 1);
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  //! Map
  const pending = () => {
    const trips = inDatabase?.map((trip) => {
      const departureD = formatDate(trip.departureDate);
      const returnD = formatDate(trip.returnDate);
      // const dDate = new Date(trip.departureDate);
      // const localDDate = dDate.toLocaleDateString("en-GB");
      // const rDate = new Date(trip.returnDate);
      // const localRDate = rDate.toLocaleDateString("en-GB");
      return (
        <>
          {trip.activities.length === 0 ? (
            <fieldset
              style={{
                display: "flex",
                flexDirection: "column",
                border: "0",
              }}
            >
              <div key={trip._id}>
                <h3>
                  {trip.country}: {departureD} - {returnD}
                </h3>
                <div style={{ display: "flex" }}>
                  <ul
                    style={{
                      width: "50%",
                      padding: "0",
                      margin: "0",
                      listStyleType: "none",
                      fontWeight: "bold",
                    }}
                  >
                    <li>Activity Preference</li>
                    <li>Accomodation Preference</li>
                    <li>No. of Wanderers</li>
                    <li>Additional Wanderer Info</li>
                    <li>Anything Else</li>
                  </ul>
                  <ul
                    style={{
                      width: "50%",
                      padding: "0",
                      margin: "0",
                      listStyleType: "none",
                    }}
                  >
                    <li>{trip.activityPreference}</li>
                    <li>{trip.accomodationPreference}</li>
                    <li>{trip.pax}</li>
                    <li>{trip.paxInfo === "" ? "N/A" : trip.paxInfo}</li>
                    <li>{trip.otherInfo === "" ? "N/A" : trip.otherInfo}</li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={handleDelete(trip._id)}
                variant="outlined"
                style={{
                  width: "25%",
                  alignSelf: "flex-end",
                }}
              >
                Cancel
              </Button>
            </fieldset>
          ) : (
            <></>
          )}
        </>
      );
    });
    return trips;
  };

  return (
    <>
      {inDatabase.length === 0 ? (
        <></>
      ) : (
        <Divider style={{ width: "70%" }} variant="fullWidth" />
      )}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        width="70%"
      >
        {inDatabase.length === 0 ? (
          <></>
        ) : (
          <Box sx={{ width: "50%" }}>
            <h1>Pending Trips</h1>
            <p style={{ width: "50%" }}>
              Here is a list of trips you have submitted and are pending our
              review. When trips are being processed, they will not appear here.
            </p>
          </Box>
        )}
        <Box sx={{ width: "50%" }}>{pending()}</Box>
      </Grid>
    </>
  );
};

export default PendingTrips;
