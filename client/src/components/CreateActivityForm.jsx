// import { Formik, Form } from "formik";
// import { useState, useEffect } from "react";
// import CustomInput from "./CustomInput";
// import CustomTextArea from "./CustomTextArea";
// import HiddenInput from "./HiddenInput";
// import { activitySchema } from "./validation/schema";

// const CreateActivityForm = ({ activity, index }) => {
//     const [data, setData] = useState({
//         name: "",
//         date: "",
//         time: "",
//         duration: "",
//         location: "",
//         photo1: "",
//         photo2: "",
//         description: "",
//         user: ""
//     })
//     console.log(activity);
//     useEffect(() => {
//         setData(activity);
//     }, []);
      
//     return (
//     <div>
//     <Formik
//         enableReinitialize={true}
//         initialValues={data}
//         validationSchema={activitySchema}
//         // onSubmit={handleActivitySubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form autoComplete="off">
//             <fieldset>
//               <legend>Activity {(index + 1)}</legend>
//             <CustomInput
//                 label="Name"
//                 name="name"
//                 type="text"
//                 placeholder="Name of Activity"
//             />
//             <br />
//             <CustomInput
//                 label="Date"
//                 name="date"
//                 type="date"
//                 placeholder="Date of Activity"
//             />
//             <br />
//             <CustomTextArea
//                 label="Time"
//                 name="time"
//                 type="date"
//                 placeholder="Time of Activity"
//             />
//             <br />
//             <CustomInput
//                 label="Duration"
//                 name="duration"
//                 type="text"
//                 placeholder="Duration of Activity (hrs)"
//             />
//             <br />
//             <CustomInput
//                 label="Location"
//                 name="location"
//                 type="text"
//                 placeholder="Location of Activity"
//             />
//             <br />
//             <CustomInput
//                 label="First Photo"
//                 name="photo1"
//                 type="text"
//                 placeholder="Photos of Activity"
//             />
//             <br />
//             <CustomInput
//                 label="Second Photo"
//                 name="photo2"
//                 type="text"
//                 placeholder="Photos of Activity"
//             />
//             <br />
//            <CustomTextArea
//                 label="Description"
//                 name="description"
//                 type="textarea"
//                 placeholder="Description of Activity"
//             />
//             <br />
//               <HiddenInput name="user" type="hidden" value="" />
//               <button 
//               type="submit"
//               // onClick={() => {
//               //   setFieldValue("user", `${loginID}`);
//               // }}
//               disabled={isSubmitting}>
//                 Add/Update Activity
//               </button>
//             </fieldset>
//           </Form>
//         )}
//       </Formik>
//       </div>)
// };

// export default CreateActivityForm;