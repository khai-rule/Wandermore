import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomTextArea from "../components/CustomTextArea";
import { activitySchema } from "../components/validation/schema";
import HiddenInput from "../components/HiddenInput";

const CreateItineraryForm = ({ notLoggedIn }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [inDatabase, setInDatabase] = useState();

//   useEffect(() => {
//     if (notLoggedIn) {
//       navigate("/login");
//     }
//   }, [navigate, notLoggedIn]);

//! On submit, uplaod to database
  const handleActivitySubmit = async (values, actions) => {
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

    //! Fetch Activities
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`/api/activities`);
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

//! Form 
  const form = (name, date, time, duration, location, photo1, photo2, description, index) => {
    return (
        <div>
        <Formik
        initialValues={{
            name: name,
            date: date,
            time: time,
            duration: duration,
            location: location,
            photo1: photo1,
            photo2: photo2,
            description: description
          }}
        validationSchema={activitySchema}
        onSubmit={handleActivitySubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <fieldset>
              <legend>Activity {index}</legend>
              
            <CustomTextArea
                label="Name"
                name="name"
                type="textarea"
                placeholder="Name of Activity"
            />
            <br />

            <CustomTextArea
                label="Date"
                name="date"
                type="textarea"
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
                label="First Photo"
                name="photo1"
                type="textarea"
                placeholder="Photos of Activity"
            />
            <br />

            <CustomTextArea
                label="Second Photo"
                name="photo2"
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
                Add/Update Activity
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
        </div>
    )
  }

    const addActivity = () => {


    }

    const mapInDatabase = inDatabase?.map(item => {
        const name = item.name
        const date = item.date
        const time = item.time
        const duration = item.duration
        const location = item.location
        const photo1 = item.photo1
        const photo2 = item.photo2
        const description = item.description
        const index = inDatabase?.indexOf(item) + 1
        return form(name, date, time, duration, location, photo1, photo2, description, index)
    })

  return (
    <div>
    <button onClick={() => navigate(-1)}>Back</button>
    <h1>Activities</h1>
        {mapInDatabase}
    <buttonn onClick={handleActivitySubmit}>Add Another Activity</buttonn>
    </div>
  );
};

export default CreateItineraryForm;
