import styled from "styled-components";

const registerForm = () => {
  return (
    <StyledWrapper>
      <form className="form">
        <p>Sign Up</p>

        <div className="group">
          <input required className="main-input" type="text" name="userName" />
          <span className="highlight-span" />
          <label className="label-email">Username</label>
        </div>

        <div className="container-1">
          <div className="group">
            <input required className="main-input" type="email" name="email" />
            <span className="highlight-span" />
            <label className="label-email">Email</label>
          </div>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              required
              className="main-input"
              type="password"
              name="password"
            />
            <span className="highlight-span" />
            <label className="label-email">Password</label>
          </div>
        </div>

        <button className="submit" type="submit">
          Sign Up
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border: 1px solid white;
    padding: 60px 40px 90px;
    background-color: black;
    border-radius: 20px;
    position: relative;
  }

  .form p {
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: white;
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
    margin-top: 1.2rem;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export default registerForm;
