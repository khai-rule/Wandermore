import { useState, useContext } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import { activitySchema } from "../components/validation/schema";
import { useParams } from "react-router-dom";
import { UserContext } from "../pages/admin-pages/CreateItineray";

const CreateItineraryForm = ({ refresh, setRefresh }) => {
  const [msg, setMsg] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");

  const userData = useContext(UserContext);

  const activities = userData?.activities;

  const { id } = useParams();

  //! Add new activity
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
        actions.resetForm();
        const fetchAdded = await response.json();
        try {
          //! add new activity id to ARRAY in trip
          const res = await fetch(`/api/trips/setnewactivity/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fetchAdded),
          });
          if (res.ok) {
            setMsg("Activity successfully added");
            setRefresh(refresh + 1);
          }
        } catch (error) {
          throw new Error("Network response was not OK");
        }
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  //! Update
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
        setRefresh(refresh + 1);
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  //! Delete
  const handleDelete = (id) => async () => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network error");
      }
      setRefresh(refresh + 1);
      setUpdateMsg("Activity Successfully Deleted");
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  //TODO to extract this as a component
  const addedActivities = () => {
    if (activities < 1) {
      return <h2>No activities added yet</h2>;
    } else {
      const allActivities = activities?.map((activity, index) => {
        const nDate = new Date(activity.date);
        const localNDate = nDate.toLocaleDateString("sv-SE");
        return (
          <>
            <div key={activity._id}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: activity.name,
                  date: localNDate,
                  startTime: activity.startTime,
                  endTime: activity.endTime,
                  location: activity.location,
                  photo1: activity.photo1,
                  photo2: activity.photo2,
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
                        label="Photo 1"
                        name="photo1"
                        type="text"
                        placeholder="Photo 1 of Activity"
                      />
                      <br />
                      <CustomInput
                        label="Photo 2"
                        name="photo2"
                        type="text"
                        placeholder="Photo 2 of Activity"
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

                      <button onClick={handleDelete(activity._id)}>
                        Delete
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Formik>
              <p>{updateMsg}</p>
            </div>
          </>
        );
      });

      return allActivities;
    }
  };

  return (
    <div>
      <h2>Add Activity</h2>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: "",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            photo1: "",
            photo2: "",
            description: "",
            trip: id,
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
                  label="Photo 1"
                  name="photo1"
                  type="text"
                  placeholder="Photo 1 of Activity"
                />
                <br />
                <CustomInput
                  label="Photo 2"
                  name="photo2"
                  type="text"
                  placeholder="Photo 2 of Activity"
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
        <h2>Activities Added</h2>
        {addedActivities()}
      </>
    </div>
  );
};

export default CreateItineraryForm;
