import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  firstName: yup.string().required("Required").trim(),
  lastName: yup.string().required("Required").trim(),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required"),
});

export const tripRequestSchema = yup.object().shape({
  departureDate: yup
    .date()
    .min(new Date(), "Departure Date must be later than today")
    .required("Required"),
  returnDate: yup
    .date()
    .min(yup.ref("departureDate"), "Return Date must be after Departure Date")
    .required("Required"),
  country: yup.string().required("Required"),
  activityPreference: yup
    .string()
    .oneOf(["adventure", "relaxation", "cultural"], "Invalid activity type")
    .required("Required"),
  accomodationPreference: yup
    .string()
    .oneOf(
      ["hotel", "hostel", "bed & breakfast", "others"],
      "Invalid accomodation type"
    )
    .required("Required"),
  pax: yup.number().min(1).required("Required"),
  paxInfo: yup.string(),
  otherInfo: yup.string(),
});

export const aboutYouSchema = yup.object().shape({
  dateOfBirth: yup.date().required("Required"),
  hobbies: yup.string(),
  countryOfResidence: yup.string().required("Required"),
  dietaryRestrictions: yup.string(),
  accessibility: yup.string(),
});
