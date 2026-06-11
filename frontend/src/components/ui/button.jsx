import styled from 'styled-components';

const Button = ({onClick}) => {
  return (
    <StyledWrapper>
      <button className="btn-53" onClick={onClick}>
        <div className="original">New?</div>
        <div className="letters">
          <span>S</span>
          <span>I</span>
          <span>G</span>
          <span>N</span>
          <span>-</span>
          <span>U</span>
          <span>P</span>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn-53,
  .btn-53 *,
  .btn-53 :after,
  .btn-53 :before,
  .btn-53:after,
  .btn-53:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-53 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Blur effect for glassmorphism */
    border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for depth */
    box-shadow: 0 0 20px rgba(0, 195, 255, 0.7); /* Sun color glow */
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    margin: 0;
    padding: 1.2rem 3rem;
    position: relative;
    text-transform: uppercase;
    border-radius: 999px;
    overflow: hidden;
  }

  .btn-53 .original {
    background: #000;
    color: #fff;
    display: grid;
    place-content: center;
    position: absolute;
    inset: 0;
    transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1);
  }

  .btn-53 .letters {
    display: flex;
    justify-content: center;
    height: 100%;
    position: relative;
  }

  .btn-53 span {
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s cubic-bezier(0.87, 0, 0.13, 1);
    transition-delay: 0.1s;
  }

  .btn-53:hover .original,
  .btn-53:hover span {
    transform: translateY(100%);
  }

  .btn-53:hover .letters span {
    opacity: 1;
    transform: translateY(0);
  }

  /* Additional CSS for spinning "U" */
  .btn-53 span:first-child {
    display: inline-block;
    transition: transform 0.5s ease-in-out;
  }

  .btn-53:hover span:first-child {
    transform: rotate(360deg); /* Spin the "U" */
  }

  /* Adjusting nth-child delays for sequential appearance */
  .btn-53:hover span:nth-child(1) {
    transition-delay: 0.1s;
  }
  .btn-53:hover span:nth-child(2) {
    transition-delay: 0.2s;
  }
  .btn-53:hover span:nth-child(3) {
    transition-delay: 0.3s;
  }
  .btn-53:hover span:nth-child(4) {
    transition-delay: 0.4s;
  }
  .btn-53:hover span:nth-child(5) {
    transition-delay: 0.5s;
  }
  .btn-53:hover span:nth-child(6) {
    transition-delay: 0.6s;
  }
  .btn-53:hover span:nth-child(7) {
    transition-delay: 0.7s;
  }
  .btn-53:hover span:nth-child(8) {
    transition-delay: 0.8s;
  }
  .btn-53:hover span:nth-child(9) {
    transition-delay: 0.9s;
  }`;

export default Button;
