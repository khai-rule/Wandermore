import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomTextArea from "../components/CustomTextArea";
import { tripRequestSchema } from "../components/validation/schema";
import HiddenInput from "../components/HiddenInput";
import AuthAPI from "../utils/AuthAPI";

const NewTripForm = () => {
  const [inDatabase, setInDatabase] = useState([]);
  const [msg, setMsg] = useState("");
  const [render, setRender] = useState(0);
  const navigate = useNavigate();
  const authApi = React.useContext(AuthAPI);

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
          const res = await fetch(`/api/user/setnewtrip/${authApi.loginID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tripID),
          });
          if (res.ok) {
            // actions.resetForm();
            setMsg(
              "Trip request submitted successfully, please give us some time to come back with your Itinerary!"
            );
            setRender(render + 1);
          }
        } catch (error) {
          throw new Error("Network response was not OK");
        }
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

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
      setRender(render + 1);
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  useEffect(() => {
    if (!authApi.auth) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${authApi.loginID}`);
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
  }, [authApi.loginID, render]);

  console.log(inDatabase)

  return (
    <>
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
                <option value="">Please select an activity type</option>
                <option value="Adventure">Adventure</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Cultural">Cultural</option>
              </CustomSelect>
              <br />
              <CustomSelect
                label="Accomodation Preference"
                name="accomodationPreference"
                placeholder="Please select accomodation type"
              >
                <option value="">Please select accomodation type</option>
                <option value="Hotel">Hotel</option>
                <option value="Hostel">Hostel</option>
                <option value="Bed & breakfast">Bed & Breakfast</option>
                <option value="Others">Others</option>
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
              />
              <br />
              <CustomTextArea
                label="Anything Else - Special Occasions or Must Do's/Don'ts"
                name="otherInfo"
                type="textarea"
                placeholder="Optional"
              />
              <br />
              <HiddenInput name="user" type="hidden" value="" />
              <button
                type="submit"
                onClick={() => {
                  setFieldValue("user", `${authApi.loginID}`);
                }}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </fieldset>
            <Link to="/account">
              <button>Back</button>
            </Link>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
      {inDatabase === null ? <h2>Your Trip requests:</h2> : <></>}
      {inDatabase.map((trip, index) => {
        const dDate = new Date(trip.departureDate);
        const localDDate = dDate.toLocaleDateString("en-GB");
        const rDate = new Date(trip.returnDate);
        const localRDate = rDate.toLocaleDateString("en-GB");
        return (
          <div key={trip._id}>
            <h3>Trip {index + 1}</h3>
            <button onClick={handleDelete(trip._id)}>Del</button>
            <ul>
              <li>Departure Date: {localDDate}</li>
              <li>Return Date: {localRDate}</li>
              <li>Country: {trip.country}</li>
              <li>Activity Preference: {trip.activityPreference}</li>
              <li>Accomodation Preference: {trip.accomodationPreference}</li>
              <li>No. of Pax: {trip.pax}</li>
              <li>Pax Info: {trip.paxInfo === "" ? "N/A" : trip.paxInfo}</li>
              <li>
                Anything Else: {trip.otherInfo === "" ? "N/A" : trip.otherInfo}
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default NewTripForm;
