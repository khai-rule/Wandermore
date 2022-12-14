import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import HiddenInput from "./HiddenInput";
import { aboutYouSchema } from "../components/validation/schema";
import { Box, Button, Grid } from "@mui/material";

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
  const [render, setRender] = useState(0);

  const handleAboutYouSubmit = async (values) => {
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
          const aboutYouID = await response.json();
          try {
            //adding aboutyou id to user database
            const res = await fetch(`/api/user/setaboutyou/${loginID}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(aboutYouID),
            });
            if (res.ok) {
              setMsg("Your details have been Added!");
              setRender(render + 1);
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
  }, [loginID, render]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      width="70%"
    >
      <Box sx={{ width: "50%" }}>
        <h1>About You</h1>
        <p style={{ width: "50%" }}>
          Hello there, Wanderer! Please set up your details to enable us to
          personalize your future trips!
        </p>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Formik
          enableReinitialize={true}
          initialValues={inDatabase}
          validationSchema={aboutYouSchema}
          onSubmit={handleAboutYouSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form autoComplete="off">
              <fieldset
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "0",
                }}
              >
                <CustomInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  placeholder="Enter your date of birth"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Hobbies and Interests"
                  name="hobbies"
                  type="text"
                  placeholder="Optional"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Country of Residence"
                  name="countryOfResidence"
                  type="text"
                  placeholder="Enter your home country"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Dietary Restrictions"
                  name="dietaryRestrictions"
                  type="text"
                  placeholder="Optional"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Accessibility Assistance"
                  name="accessibility"
                  type="text"
                  placeholder="Optional"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <HiddenInput name="user" type="hidden" value="" />
                <br />
                {inDatabase.dateOfBirth === "" ? (
                  <Button
                    type="submit"
                    onClick={() => {
                      setFieldValue("user", `${loginID}`);
                    }}
                    disabled={isSubmitting}
                    variant="outlined"
                    style={{
                      width: "25%",
                      alignSelf: "flex-end",
                    }}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={() => {
                      setFieldValue("user", `${loginID}`);
                    }}
                    disabled={isSubmitting}
                    variant="outlined"
                    style={{
                      width: "25%",
                      alignSelf: "flex-end",
                    }}
                  >
                    Update
                  </Button>
                )}{" "}
                <span>{msg}</span>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default AboutYouForm;
