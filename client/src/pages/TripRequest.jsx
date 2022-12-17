import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomTextArea from "../components/CustomTextArea";
import { tripRequestSchema } from "../components/validation/schema";
import HiddenInput from "../components/HiddenInput";

const TripRequest = ({ notLoggedIn }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (notLoggedIn) {
      navigate("/login");
    }
  }, [navigate, notLoggedIn]);

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
        actions.resetForm();
        setMsg(
          "Trip request submitted successfully, please give us some time to come back with your Itinerary!"
        );
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          departureDate: "",
          returnDate: "",
          country: "",
          activityPreference: "",
          accomodationPreference: "",
          pax: "",
          paxInfo: "",
          otherInfo: "",
        }}
        validationSchema={tripRequestSchema}
        onSubmit={handleTripSubmit}
      >
        {({ isSubmitting }) => (
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
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="cultural">Cultural</option>
              </CustomSelect>
              <br />
              <CustomSelect
                label="Accomodation Preference"
                name="accomodationPreference"
                placeholder="Please select accomodation type"
              >
                <option value="">Please select accomodation type</option>
                <option value="hotel">Hotel</option>
                <option value="hostel">Hostel</option>
                <option value="bed & breakfast">Bed & Breakfast</option>
                <option value="others">Others</option>
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
              <button disabled={isSubmitting} type="submit">
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
    </>
  );
};

export default TripRequest;
