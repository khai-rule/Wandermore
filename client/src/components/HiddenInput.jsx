import { useField } from "formik";

const HiddenInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
    </>
  );
};
export default HiddenInput;
