import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import HiddenInput from "./HiddenInput";
import { aboutYouSchema } from "../components/validation/schema";

const AboutYouForm = ({ loginID }) => {
  const [inDatabase, setInDatabase] = useState({
    dateOfBirth: "",
    hobbies: "",
    countryOfResidence: "",
    dietaryRestrictions: "",
    accessibility: "",
    user: "",
  });
  const [msg, setMsg] = useState("");
  // const [update, setUpdate] = useState({
  //   dateOfBirth: "",
  //   hobbies: [""],
  //   countryOfResidence: "",
  //   dietaryRestrictions: [""],
  //   accessibility: [""],
  // });

  // const handleChange = (e) => {
  //   setUpdate({ ...update, [e.target.name]: e.target.value });
  // };

  // const handleUpdate = async () => {
  // try {
  //     const response = await fetch("/api/aboutyou", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(inDatabase),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not OK");
  //     }
  //     const data = await response.json();
  //     console.log("update", update)
  //     console.log("updated",inDatabase)
  //   } catch (error) {
  //     setMsg("something went wrong");
  //   }
  //   const response = await fetch("/api/aboutyou", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(update),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  //? Formik submit handler (line 50 - 69)
  const handleAboutYouSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      if (inDatabase.dateOfBirth === "") {
        const response = await fetch("/api/aboutyou", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          // actions.resetForm();
          setMsg("Your details have been Added!");
        }
      } else {
        const response = await fetch(`/api/aboutyou/${loginID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          // actions.resetForm();
          setMsg("Your details have been updated!");
        }
      }
    } catch (error) {
      throw new Error("Network response was not OK");
    }
  };

  //! Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/aboutyou/${loginID}`);
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
  }, [loginID]);

  return (
    <div>
      {/* <fieldset>
        <legend>About You</legend>
        <label>
          Date of Birth:
          <input
            type="text"
            name="dateOfBirth"
            defaultValue={inDatabase?.dateOfBirth}
            placeholder="DDMMYYYY"
            onChange={handleChange}
          />
        </label>
        <label>
          Hobbies:
          <input
            type="text"
            name="hobbies"
            defaultValue={inDatabase?.hobbies}
            placeholder="Any Hobbies?"
            onChange={handleChange}
          />
        </label>
        <label>
          Country Of Residence:
          <input
            type="text"
            name="countryOfResidence"
            defaultValue={inDatabase?.countryOfResidence}
            placeholder="Country"
            onChange={handleChange}
          />
        </label>
        <label>
          Dietary Restrictions:
          <input
            type="text"
            name="dietaryRestrictions"
            defaultValue={inDatabase?.dietaryRestrictions}
            placeholder="Any Dietary Restrictions?"
            onChange={handleChange}
          />
        </label>
        <label>
          Accessibility:
          <input
            type="text"
            name="accessibility"
            defaultValue={inDatabase?.accessibility}
            placeholder="Accessibility"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleUpdate}>Update Info</button>
      </fieldset> */}
      {/* Formik form start */}
      <Formik
        enableReinitialize={true}
        initialValues={inDatabase}
        validationSchema={aboutYouSchema}
        onSubmit={handleAboutYouSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form autoComplete="off">
            <fieldset>
              <legend>About You</legend>
              <CustomInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                placeholder="Enter your date of birth"
              />
              <br />
              <CustomInput
                label="Hobbies and Interests"
                name="hobbies"
                type="text"
                placeholder="Optional"
              />
              <br />
              <CustomInput
                label="Country of Residence"
                name="countryOfResidence"
                type="text"
                placeholder="Enter your home country"
              />
              <br />
              <CustomInput
                label="Dietary Restrictions"
                name="dietaryRestrictions"
                type="text"
                placeholder="Optional"
              />
              <br />
              <CustomInput
                label="Accessibility Assistance"
                name="accessibility"
                type="text"
                placeholder="Optional"
              />
              <br />
              <HiddenInput name="user" type="hidden" value="" />
              <button
                type="submit"
                onClick={() => {
                  setFieldValue("user", `${loginID}`);
                }}
                disabled={isSubmitting}
              >
                Update Info
              </button>{" "}
              <span>{msg}</span>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AboutYouForm;
