import { UserAuth } from "../../context/AuthContext";
import classes from "./SignInToAdd.module.css";

const SignInToAdd = () => {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes["google-page"]}>
      <div className={classes["google-btn"]} onClick={handleGoogleSignIn}>
        <div className={classes["google-icon-wrapper"]}>
          <img
            className={classes["google-icon"]}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google"
          />
        </div>
        <p className={classes["btn-text"]}>
          <b>Sign in with google</b>
        </p>
      </div>
    </div>
  );
};

export default SignInToAdd;
