import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomTextArea from "../components/CustomTextArea";
import { tripRequestSchema } from "../components/validation/schema";
import HiddenInput from "../components/HiddenInput";
import { Button, MenuItem } from "@mui/material";


const NewTripForm = ({ loginID, setRender, render }) => {

  const [inDatabase, setInDatabase] = useState([]);
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
            setRender(render + 1)
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
    <>
      <h1>New Trip</h1>
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
            <fieldset>
              <legend>New Trip Request</legend>
              <CustomInput
                label="Departure Date"
                name="departureDate"
                type="date"
                placeholder="Enter your departure date"
              />
              <br />
              <CustomInput
                label="Return Date"
                name="returnDate"
                type="date"
                placeholder="Enter your return date"
              />
              <br />
              <CustomInput
                label="Country"
                name="country"
                type="text"
                placeholder="Enter a country"
              />
              <br />
              <CustomSelect
                label="Activity Preference"
                name="activityPreference"
                placeholder="Please select an activity"
              >
                <MenuItem value="">Please select an activity type</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Relaxation">Relaxation</MenuItem>
                <MenuItem value="Cultural">Cultural</MenuItem>
              </CustomSelect>
              <br />
              <CustomSelect
                label="Accomodation Preference"
                name="accomodationPreference"
                placeholder="Please select accomodation type"
              >
                <MenuItem value="">Please select accomodation type</MenuItem>
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Hostel">Hostel</MenuItem>
                <MenuItem value="Bed & breakfast">Bed & Breakfast</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </CustomSelect>
              <br />
              <CustomInput
                label="No. of Pax"
                name="pax"
                type="number"
                min="1"
                placeholder="1"
              />
              <br />
              <CustomTextArea
                label="Additional Pax Info"
                name="paxInfo"
                type="textarea"
                placeholder="Optional"
                multiline="true"
              />
              <br />
              <CustomTextArea
                label="Anything Else - Special Occasions or Must Do's/Don'ts"
                name="otherInfo"
                type="textarea"
                placeholder="Optional"
                multiline="true"
              />
              <br />
              <HiddenInput name="user" type="hidden" value="" />
              <Button
                type="submit"
                onClick={() => {
                  setFieldValue("user", `${loginID}`);
                }}
                disabled={isSubmitting}
                variant="outlined"
              >
                Submit
              </Button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
    </>
  );
};

export default NewTripForm;
