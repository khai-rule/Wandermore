import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomSelect from "./CustomSelect";
import CustomTextArea from "../components/CustomTextArea";
import { activitySchema } from "../components/validation/schema";
import HiddenInput from "../components/HiddenInput";

const CreateItineraryForm = ({ notLoggedIn }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

//   useEffect(() => {
//     if (notLoggedIn) {
//       navigate("/login");
//     }
//   }, [navigate, notLoggedIn]);


  const handleTripSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        actions.resetForm();
        setMsg(
          "Activity Successfully Created"
        );
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  return (
    <>
    <button onClick={() => navigate(-1)}>Back</button>
      <Formik
        initialValues={{
          name: "",
          date: "",
          time: 0,
          duration: 0,
          location: "",
          photos: "",
          description: ""
        }}
        validationSchema={activitySchema}
        onSubmit={handleTripSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <fieldset>
              <legend>Itinerary</legend>
              
            <CustomTextArea
                label="Name"
                name="name"
                type="textarea"
                placeholder="Name of Activity"
            />
            <br />

            <CustomInput
                label="Date"
                name="date"
                type="date"
                placeholder="Date of Activity"
            />
            <br />

            <CustomTextArea
                label="Time"
                name="time"
                type="textarea"
                placeholder="Time of Activity"
            />
            <br />

            <CustomTextArea
                label="Duration"
                name="duration"
                type="textarea"
                placeholder="Duration of Activity"
            />
            <br />

            <CustomTextArea
                label="Location"
                name="location"
                type="textarea"
                placeholder="Location of Activity"
            />
            <br />

            <CustomTextArea
                label="Photos"
                name="photos"
                type="textarea"
                placeholder="Photos of Activity"
            />
            <br />

            <CustomTextArea
                label="Description"
                name="description"
                type="textarea"
                placeholder="Description of Activity"
            />
            <br />

              <HiddenInput name="user" type="hidden" value="" />
              <button disabled={isSubmitting} type="submit">
                Create Activity
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
    </>
  );
};

export default CreateItineraryForm;
