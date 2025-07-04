import { HiEye, HiEyeOff, HiMail } from "react-icons/hi";
import "./css/Login.css";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";

export function Signinup() {
  let [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="login-signup-box">
        <NavigationBar />
        <div>
          <div className="illustartion">
            <img
              className="illustartionImg"
              src={"/images/login/connected-illustration.svg"}
              alt="Connected Peoples"
            />
          </div>
          {isLogin ? (
            <Login switchToSignup={() => setIsLogin(false)} />
          ) : (
            <Signup switchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </>
  );
}

export function Login({ switchToSignup }) {
  let [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-box">
      <div className="logo">
        <img src="/images/UNOSQ_logo.png" alt="logo" />
        <span>UNOSQ</span>
      </div>

      <form>
        <label htmlFor="email">
          <input type="email" placeholder="Email" required />
          <HiMail />
        </label>
        <label htmlFor="password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onFocus={() => setShowPassword(true)}
            onBlur={() => setShowPassword(false)}
            required
          />
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </label>
        <input type="submit" className="primary-btn" value={"Login"} />
      </form>
      <span style={{ textAlign: "center", width: "100%", display: "block" }}>
        Don't Have an account?{" "}
        <span
          style={{ color: "#7f7fff", textDecoration: "underline" }}
          onClick={switchToSignup}
        >
          Signup
        </span>
      </span>
    </div>
  );
}

export function Signup({ switchToLogin }) {
  let [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-box">
      <div className="logo">
        <img src="/images/UNOSQ_logo.png" alt="logo" />
        <span>UNOSQ</span>
      </div>

      <form>
        <label htmlFor="name">
          <input type="text" placeholder="Name" required />
          <HiMail />
        </label>
        <label htmlFor="email">
          <input type="email" placeholder="Email" required />
          <HiMail />
        </label>
        <label htmlFor="password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onFocus={() => setShowPassword(true)}
            onBlur={() => setShowPassword(false)}
            required
          />
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </label>
        <input type="submit" className="primary-btn" value={"Signup"} />
      </form>
      <span style={{ textAlign: "center", width: "100%", display: "block" }}>
        Already Have an account?{" "}
        <span
          style={{ color: "#7f7fff", textDecoration: "underline" }}
          onClick={switchToLogin}
        >
          Login
        </span>
      </span>
    </div>
  );
}
