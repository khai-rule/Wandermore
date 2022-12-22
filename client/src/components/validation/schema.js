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
    .matches(passwordRules, {
      message:
        "Password requires at least 1 uppercase, 1 lowercase letter and 1 number",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const loginMaintSchema = yup.object().shape({
  passwordOld: yup.string().required("Required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, {
      message:
        "Password requires at least 1 uppercase, 1 lowercase letter and 1 number",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email"),
  password: yup.string(),
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
    .oneOf(["Adventure", "Relaxation", "Cultural"], "Invalid activity type")
    .required("Required"),
  accomodationPreference: yup
    .string()
    .oneOf(
      ["Hotel", "Hostel", "Bed & breakfast", "Others"],
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

export const activitySchema = yup.object().shape({
  name: yup.string().required("Required"),
  date: yup.date().required("Required"),
  startTime: yup.string().required("Required"),
  endTime: yup.string().required("Required"),
  location: yup.string().required("Required"),
  photo1: yup.string(),
  photo2: yup.string(),
  description: yup.string(),
});
