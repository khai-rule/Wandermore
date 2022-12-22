import { TextField } from "@mui/material";
import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>{label}</label>
      <br />
      <TextField
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
        sx={{
          "& fieldset": {
            borderRadius: "0",
          },
        }}
      />
      {meta.touched && meta.error && (
        <span className="error"> {meta.error} </span>
      )}
    </>
  );
};
export default CustomInput;
