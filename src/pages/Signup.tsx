import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SignupController from "../features/auth/SignupController";
import { validateEmail } from "../utils/EmailValidationRegex";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!email || !password || !confirmPassword) {
      setError("null");
    } else if (!validateEmail(email)) {
      setError("invalid email");
    } else if (password !== confirmPassword) {
      setError("password mismatch");
    } else {
      setError("");
    }
  }, [email, password, confirmPassword]);

  const handleSignup = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const success = await SignupController.signup(name, email, password);
      if (success) {
        navigate("/home");
      } else {
        setError("Signup failed");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <Outlet
        context={{
          name,
          setName,
          email,
          setEmail,
          password,
          setPassword,
          confirmPassword,
          setConfirmPassword,
          error,
          setError,
          handleSignup,
        }}
      />
    </>
  );
};

export default Signup;
