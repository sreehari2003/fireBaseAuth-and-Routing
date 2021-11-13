import classes from "./ProfileForm.module.css";
import React from "react";
import { useRef, useContext } from "react";
import AuthContext from "../store/auth-context";

const ProfileForm = () => {
  const authCTX = useContext(AuthContext);
  const apiKey = authCTX.Key;
  const newPassWord = useRef();
  const changePassWord = (e) => {
    e.preventDefault();
    const passWord = newPassWord.current.value;
    if (passWord.length < 6) {
      alert("password should be atleast 6 letters");
    } else {
      const passChange = async () => {
        try {
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
            {
              method: "POST",
              body: JSON.stringify({
                idToken: authCTX.token,
                passWord,
                returnSecureToken: false,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            throw new Error("Something Went Wrong");
          }
        } catch (err) {
          alert(err);
        }
      };
      passChange();
    }
  };
  return (
    <form className={classes.form} onSubmit={changePassWord}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassWord} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
