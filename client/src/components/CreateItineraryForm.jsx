import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import HiddenInput from "../components/HiddenInput";
import { activitySchema } from "../components/validation/schema";


const CreateItineraryForm = ({ notLoggedIn }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [inDatabase, setInDatabase] = useState([])

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

    const addActivity = () => {


    }

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
    <h1>Activities</h1>
    { inDatabase === null ? <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: "",
          date: "",
          time: "",
          duration: "",
          location: "",
          photo: "",
          description: "",
          // user: {}
        }}
        validationSchema={activitySchema}
        onSubmit={handleActivitySubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <fieldset>
              <legend>Activity </legend>
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
            <CustomTextArea
                label="Time"
                name="time"
                type="date"
                placeholder="Time of Activity"
            />
            <br />
            <CustomInput
                label="Duration"
                name="duration"
                type="text"
                placeholder="Duration of Activity (hrs)"
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
              disabled={isSubmitting}>
                Add/Update Activity
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
      </div> : 
    <>
    {inDatabase.map((activity, index) => {
      const nDate = new Date(activity.date)
      const localNDate = nDate.toLocaleDateString('sv-SE');
    return (<div key={activity._id}>
    <Formik
        enableReinitialize={true}
        initialValues={{
          name: activity.name,
          date: localNDate,
          time: activity.time,
          duration: activity.duration,
          location: activity.location,
          photo: activity.photo,
          description: activity.description,
          // user: {}
        }}
        validationSchema={activitySchema}
        onSubmit={handleActivitySubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <fieldset>
              <legend>Activity {index}</legend>
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
            <CustomTextArea
                label="Time"
                name="time"
                type="date"
                placeholder="Time of Activity"
            />
            <br />
            <CustomInput
                label="Duration"
                name="duration"
                type="text"
                placeholder="Duration of Activity (hrs)"
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
              disabled={isSubmitting}>
                Add/Update Activity
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
      </div>)}
      )}
      </>}
    </div>
  );
};

export default CreateItineraryForm;
