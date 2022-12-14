import { useState } from "react";

const SignUp = () => {
  const [msg, setMsg] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    const signUpData = new FormData(event.target);
    const signUpInfo = Object.fromEntries(signUpData);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo), // body data type must match "Content-Type" header
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      //   const data = await response.json();
      //   console.log(data);
    } catch (error) {
      setMsg("Account exists, please log in.");
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <legend>Sign Up</legend>
        <fieldset>
          <label>
            Email:{" "}
            <input
              name="email"
              type="text"
              placeholder="example@domain.com"
              required={true}
            />
          </label>
          <br />
          <label>
            First Name:{" "}
            <input
              name="firstName"
              type="text"
              placeholder="E.g. John"
              required={true}
            />
          </label>
          <br />
          <label>
            Last Name:{" "}
            <input
              name="lastName"
              type="text"
              placeholder="E.g. Smith"
              required={true}
            />
          </label>
          <br />
          <label>
            Password:{" "}
            <input
              name="password"
              type="password"
              placeholder="min. 6 characters"
              required={true}
            />
          </label>
          <br />
        </fieldset>
        <p>{msg}</p>
        <button>Create</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
};

export default SignUp;
