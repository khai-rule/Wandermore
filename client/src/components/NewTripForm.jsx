import { useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomTextArea from "../components/CustomTextArea";
import { tripRequestSchema } from "../components/validation/schema";
import HiddenInput from "../components/HiddenInput";
import { Box, Button, Grid, MenuItem } from "@mui/material";

const NewTripForm = ({ loginID, setRender, render }) => {
  const [msg, setMsg] = useState("");

  const handleTripSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const tripID = await response.json();
        try {
          //! adding new trip id to ARRAY in user database.
          const res = await fetch(`/api/user/setnewtrip/${loginID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tripID),
          });
          if (res.ok) {
            actions.resetForm();
            setRender(render + 1);
            setMsg(
              "Trip request submitted successfully, please give us some time to come back with your Itinerary!"
            );
          }
        } catch (error) {
          throw new Error("Network response was not OK");
        }
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      width="70%"
    >
      <Box sx={{ width: "50%" }}>
        <h1>New Trip</h1>
        <p style={{ width: "50%" }}>
          You're raring to go, Wanderer! Please send us your upcoming trip
          details and we will come back as soon as we can!
        </p>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            departureDate: "",
            returnDate: "",
            country: "",
            activityPreference: "",
            accomodationPreference: "",
            pax: "1",
            paxInfo: "",
            otherInfo: "",
            user: "",
          }}
          validationSchema={tripRequestSchema}
          onSubmit={handleTripSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form autoComplete="off">
              <fieldset
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "0",
                }}
              >
                <CustomInput
                  label="Departure Date"
                  name="departureDate"
                  type="date"
                  placeholder="Enter your departure date"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Return Date"
                  name="returnDate"
                  type="date"
                  placeholder="Enter your return date"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Country"
                  name="country"
                  type="text"
                  placeholder="Enter a country"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomSelect
                  label="Activity Preference"
                  name="activityPreference"
                  placeholder="Please select an activity"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Relaxation">Relaxation</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                </CustomSelect>
                <br />
                <CustomSelect
                  label="Accomodation Preference"
                  name="accomodationPreference"
                  placeholder="Please select accomodation type"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <MenuItem value="Hotel">Hotel</MenuItem>
                  <MenuItem value="Hostel">Hostel</MenuItem>
                  <MenuItem value="Bed & breakfast">Bed & Breakfast</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </CustomSelect>
                <br />
                <CustomInput
                  label="No. of Wanderers"
                  name="pax"
                  type="number"
                  placeholder="1"
                  InputProps={{ inputProps: { min: 1 } }}
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomTextArea
                  label="Additional Wanderer Info"
                  name="paxInfo"
                  type="textarea"
                  placeholder="Optional"
                  multiline="true"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomTextArea
                  label="Anything Else - Special Occasions or Must Do's/Don'ts"
                  name="otherInfo"
                  type="textarea"
                  placeholder="Optional"
                  multiline="true"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <HiddenInput name="user" type="hidden" value="" />
                <br />
                <Button
                  type="submit"
                  onClick={() => {
                    setFieldValue("user", `${loginID}`);
                  }}
                  disabled={isSubmitting}
                  variant="outlined"
                  style={{
                    width: "25%",
                    alignSelf: "flex-end",
                  }}
                >
                  Submit
                </Button>
              </fieldset>
            </Form>
          )}
        </Formik>
        <p>{msg}</p>
      </Box>
    </Grid>
  );
};

export default NewTripForm;
