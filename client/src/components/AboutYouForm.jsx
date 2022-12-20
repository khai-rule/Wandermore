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
    user: {},
  });
  const [msg, setMsg] = useState("");

  //! Check Login, Get ID
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/session/${id}`);
  //     try {
  //       if (!response.ok) {
  //         throw new Error("Network error");
  //       }
  //       const data = await response.json();
  //       console.log("baik juga", data);
  //       if (data !== null) {
  //         console.log("baik", data);
  //       }
  //     } catch (error) {
  //       console.log("baik juga", data);
  //       throw new Error("Network response was not OK");
  //     }
  //   };
  //   fetchData();
  // }, []);

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
          try {
            //adding aboutyou id to user database
            const response = await fetch(`/api/aboutyou/getid/${loginID}`);
            const fetchID = await response.json();

            const res = await fetch(`/api/user/setaboutyou/${loginID}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fetchID),
            });
            if (res.ok) {
              setMsg("Your details have been Added!");
            }
          } catch (error) {
            throw new Error("Network response was not OK");
          }
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
          const dOB = new Date(data.dateOfBirth);
          const localDOB = dOB.toLocaleDateString("sv-SE");
          data.dateOfBirth = localDOB;
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
