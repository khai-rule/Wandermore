import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import HiddenInput from "../components/HiddenInput";
import { activitySchema } from "../components/validation/schema";

const CreateItineraryForm = ({ notLoggedIn }) => {
  const [msg, setMsg] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const navigate = useNavigate();
  const [inDatabase, setInDatabase] = useState([]);

  //   useEffect(() => {
  //     if (notLoggedIn) {
  //       navigate("/login");
  //     }
  //   }, [navigate, notLoggedIn]);

  //! Submit handlers
  const handleNewActivity = async (values, actions) => {
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
        setMsg("Activity Successfully Created");
        fetchData();
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  const handleUpdateActivity = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch(`/api/activities/${values.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setUpdateMsg("Activity Successfully Updated");
        fetchData();
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  //! Fetch Activities
  const fetchData = async () => {
    const response = await fetch("/api/activities");
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
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(inDatabase)

  //! Form
  // const form = (name, date, time, duration, location, photo1, photo2, description, index) => {
  //   return (
  //       <div>
  //       <Formik
  //       initialValues={{
  //           name: "",
  //           date: "",
  //           time: "",
  //           duration: "",
  //           location: "",
  //           photo1: "",
  //           photo2: "",
  //           description: "",
  //           user: ""
  //         }}
  //       validationSchema={activitySchema}
  //       onSubmit={handleActivitySubmit}
  //     >
  //       {({ isSubmitting, setFieldValue }) => (
  //         <Form autoComplete="off">
  //           <fieldset>
  //             <legend>Activity {index}</legend>
  //           <CustomInput
  //               label="Name"
  //               name="name"
  //               type="text"
  //               placeholder="Name of Activity"
  //           />
  //           <br />
  //           <CustomInput
  //               label="Date"
  //               name="date"
  //               type="date"
  //               placeholder="Date of Activity"
  //           />
  //           <br />
  //           <CustomTextArea
  //               label="Time"
  //               name="time"
  //               type="date"
  //               placeholder="Time of Activity"
  //           />
  //           <br />

  //           <CustomInput
  //               label="Duration"
  //               name="duration"
  //               type="text"
  //               placeholder="Duration of Activity (hrs)"
  //           />
  //           <br />

  //           <CustomInput
  //               label="Location"
  //               name="location"
  //               type="text"
  //               placeholder="Location of Activity"
  //           />
  //           <br />

  //           <CustomInput
  //               label="First Photo"
  //               name="photo1"
  //               type="text"
  //               placeholder="Photos of Activity"
  //           />
  //           <br />

  //           <CustomInput
  //               label="Second Photo"
  //               name="photo2"
  //               type="text"
  //               placeholder="Photos of Activity"
  //           />
  //           <br />

  //           <CustomTextArea
  //               label="Description"
  //               name="description"
  //               type="textarea"
  //               placeholder="Description of Activity"
  //           />
  //           <br />
  //             <HiddenInput name="user" type="hidden" value="" />
  //             <button
  //             type="submit"
  //             // onClick={() => {
  //             //   setFieldValue("user", `${loginID}`);
  //             // }}
  //             disabled={isSubmitting}>
  //               Add/Update Activity
  //             </button>
  //           </fieldset>
  //         </Form>
  //       )}
  //     </Formik>
  //     <p>{msg}</p>
  //       </div>
  //   )
  // }

  const addActivity = () => {};

  // const mapInDatabase = inDatabase?.map((item) => {
  //     const name = item.name
  //     const date = item.date
  //     const time = item.time
  //     const duration = item.duration
  //     const location = item.location
  //     const photo1 = item.photo1
  //     const photo2 = item.photo2
  //     const description = item.description
  //     const index = inDatabase?.indexOf(item) + 1
  //     const key = item._id
  //     return form(name, date, time, duration, location, photo1, photo2, description, index, key)
  // })

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Itinerary</h1>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            photo: "",
            description: "",
            // user: {}
          }}
          validationSchema={activitySchema}
          onSubmit={handleNewActivity}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <fieldset>
                <legend>Create a New Activity</legend>
                <CustomInput
                  label="Name"
                  name="name"
                  type="text"
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
                <CustomInput
                  label="Start Time"
                  name="startTime"
                  type="time"
                  placeholder="Start Time of Activity"
                />
                <br />
                <CustomInput
                  label="End Time"
                  name="endTime"
                  type="time"
                  placeholder="End Time of Activity"
                />
                <br />
                <CustomInput
                  label="Location"
                  name="location"
                  type="text"
                  placeholder="Location of Activity"
                />
                <br />
                <CustomInput
                  label="Photo"
                  name="photo"
                  type="text"
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
                {/* <HiddenInput name="user" type="hidden" value="" /> */}
                <button
                  type="submit"
                  // onClick={() => {
                  //   setFieldValue("user", `${loginID}`);
                  // }}
                  disabled={isSubmitting}
                >
                  Add Activity
                </button>
              </fieldset>
            </Form>
          )}
        </Formik>
        <p>{msg}</p>
      </div>
      <>
        <h1>Activities</h1>
        {inDatabase.map((activity, index) => {
          const nDate = new Date(activity.date);
          const localNDate = nDate.toLocaleDateString("sv-SE");
          return (
            <div key={activity._id}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: activity.name,
                  date: localNDate,
                  startTime: activity.startTime,
                  endTime: activity.endTime,
                  location: activity.location,
                  photo: activity.photo,
                  description: activity.description,
                  id: activity._id,
                  // user: {}
                }}
                validationSchema={activitySchema}
                onSubmit={handleUpdateActivity}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form autoComplete="off">
                    <fieldset>
                      <legend>Activity {index + 1}</legend>
                      <CustomInput
                        label="Name"
                        name="name"
                        type="text"
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
                      <CustomInput
                        label="Start Time"
                        name="startTime"
                        type="time"
                        placeholder="Start Time of Activity"
                      />
                      <br />
                      <CustomInput
                        label="End Time"
                        name="endTime"
                        type="time"
                        placeholder="End Time of Activity"
                      />
                      <br />
                      <CustomInput
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Location of Activity"
                      />
                      <br />
                      <CustomInput
                        label="Photo"
                        name="photo"
                        type="text"
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
                      {/* <HiddenInput name="user" type="hidden" value="" /> */}
                      <button
                        type="submit"
                        onClick={() => {
                          setFieldValue("id", activity._id);
                        }}
                        disabled={isSubmitting}
                      >
                        Update Activity
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Formik>
              <p>{updateMsg}</p>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default CreateItineraryForm;
