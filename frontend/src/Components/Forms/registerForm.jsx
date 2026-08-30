import { register } from "@/Services/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (userData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!emailRegex.test(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await register(userData);

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper className="h-full w-full md:w-[50%] p-0 m-0 items-center flex justify-center">
      <form
        className="form
        px-10 md:px-20
        py-10
        rounded-2xl
        mt-5
        h-full
        w-full
        "
        onSubmit={handleSubmit}
      >
        <p className="font-['Black_Ops_One'] mb-10 text-teal-100 relative inline-block">
          Sign Up

          <span className="absolute left-1/2 bottom-px h-1 w-full -translate-x-1/2 overflow-hidden">
            <span className="absolute left-1/2 h-full w-0 -translate-x-1/2 bg-green-50 animate-underline" />
          </span>
        </p>

        <div className="group">
          <input
            required
            className="main-input"
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) =>
              setUserData({
                ...userData,
                name: e.target.value,
              })
            }
          />

          <span className="highlight-span" />

          <label className="label-email">
            Username
          </label>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              required
              className="main-input"
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
            />

            <span className="highlight-span" />

            <label className="label-email">
              Email
            </label>
          </div>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              required
              minLength={8}
              className="main-input"
              type="password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e.target.value,
                })
              }
            />

            <span className="highlight-span" />

            <label className="label-email">
              Password
            </label>
          </div>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              required
              className="main-input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <span className="highlight-span" />

            <label className="label-email">
              Confirm Password
            </label>
          </div>
        </div>

        <button
          className="submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .group {
    position: relative;
  }

  .form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;

    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;

    position: relative;
  }

  .form p {
    padding-bottom: 20px;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .container-1 {
    padding-top: 30px;
  }

  .main-input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 185px;
    border: none;
    border-bottom: 1px solid #6c6c6c;
    background: transparent;
    color: #ffffff;
  }

  .main-input:focus {
    outline: none;
    border-bottom-color: #42ff1c;
  }

  .label-email {
    color: #999999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  .main-input:focus ~ .label-email,
  .main-input:valid ~ .label-email {
    top: -20px;
    font-size: 14px;
    color: #42ff1c;
  }

  .highlight-span {
    position: absolute;
    height: 60%;
    width: 0;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .main-input:focus ~ .highlight-span {
    animation: input-focus 0.3s ease;
  }

  @keyframes input-focus {
    from {
      background: #42ff1c;
    }

    to {
      width: 185px;
    }
  }

  .submit {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);

    padding: 12px 20px;
    margin-top: 35px;

    width: 70%;

    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    cursor: pointer;

    color: #f0fdfa;

    font-family: "Black Ops One", sans-serif;
    font-size: 18px;

    transition: all 0.7s ease;
  }

  .submit:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.9);
    color: #134e4a;

    transform: translateY(-2px);

    box-shadow: 0 10px 25px rgba(13, 148, 136, 0.15);
  }

  .submit:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Mobile */
  @media (max-width: 767px) {
    .form p {
      font-size: 32px;
    }

    .container-1 {
      padding-top: 25px;
    }

    .main-input {
      width: 185px;
    }
  }
`;

export default RegisterForm;