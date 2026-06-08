import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosinstance.js";
const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    // we use it to block the default of some html elements like the submit in html form when we click it the browser send the form and then refresh so we don't want this to happen
    e.preventDefault();

    if (!fullName.trim()) {
      setError("please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password) {
      setError("please enter a password");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(async() => {
       try {
      const response = await axiosInstance.post("/create-account", {
        fullName: fullName,
        email: email,
        password: password,
        profileImageUrl: "",
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong please try again later");
      }
    } finally {
      setIsLoading(false);
    }
    }, 2000);
   
  };
  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSignUp}>
        <p className="title text-2xl text-teal-700 font-bold leading-1 relative flex items-center p-7">Register </p>
        <p className="message">Signup now to start use our app. </p>
        <label>
          <input
            placeholder="Full Name"
            type="text"
            className="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-label="Full Name"
          />
        </label>
        <label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input"
            aria-label="Email"
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="password"
          />
        </label>

        {
          error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )
        }

        <button className="bg-teal-700 p-2.5 rounded-[10px] text-teal-100 font-bold transition duration-300  ease-in-out hover:bg-teal-900 cursor-pointer" type="submit" >Sign up</button>
        
        <p className="text-sm items-center text-gray-600" >
          Already have an acount ?{" "} <Link to="/login" className="text-teal-700 hover:underline hover:text-teal-900">Signin</Link>{" "}
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }



  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: oklch(43.7% 0.078 188.216);
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: oklch(43.7% 0.078 188.216);
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }


  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Signup;
