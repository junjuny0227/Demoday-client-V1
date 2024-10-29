import { Dispatch, SetStateAction, FC } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";

interface OutletContext {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}
interface InputFieldProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  name: string; // Add this line to include 'name' in the props
}
const SignupName: FC = () => {
  const { name, setName } = useOutletContext<OutletContext>();

  const formik = useFormik({
    initialValues: {
      name: name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("이름을 입력하세요"),
    }),
    onSubmit: (values) => {
      setName(values.name);
    },
  });

  return (
    <Wrapper>
      <h2>이름 입력</h2>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          type="text"
          placeholder="이름을 입력하세요"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? <p className="error">{formik.errors.name}</p> : null}
        <NextButton to="/signup/email" disabled={!!formik.errors.name} />
      </form>
    </Wrapper>
  );
};

export default SignupName;
