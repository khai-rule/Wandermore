const miniNavOption = ({ label, option, view, setView }) => {
  return (
    <span
      onClick={() => setView(option)}
      style={{
        color: view === option ? "#000000" : "#808080",
        textDecoration: view === option ? "underline" : "0",
        cursor: "pointer",
      }}
    >
      {label}
    </span>
  );
};
export default miniNavOption;
