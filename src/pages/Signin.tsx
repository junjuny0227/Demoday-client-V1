import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import SignInController from "../features/auth/SignInController";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/EmailValidationRegex";
import { Wrapper } from "../components/Wrapper";
import { ErrorMessage } from "../components/ErrorMessage";
import { useUser } from "../context/UserContext";

interface SigninFormInputs {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const { setEmail } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<SigninFormInputs> = async ({ email, password }) => {
    try {
      const success = await SignInController.signin(email, password);
      if (success) {
        setEmail(email);
        navigate("/home", { state: { email } });
      } else {
        setError("email", { type: "manual", message: "Signin failed" });
      }
    } catch (error) {
      setError("email", { type: "manual", message: (error as Error).message });
    }
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      setError("email", { type: "manual", message: "null" });
    }
  }, [errors, setError]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          value={emailValue}
          {...register("email", {
            required: "Email is required",
            validate: (value) => validateEmail(value) || "Invalid email",
          })}
          placeholder="아이디"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <InputField
          type="password"
          value={passwordValue}
          {...register("password", { required: "Password is required" })}
          placeholder="비밀번호"
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <button type="submit">로그인</button>
      </form>
    </Wrapper>
  );
};

export default Signin;
