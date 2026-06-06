import styled from "styled-components";
import { MdEdit } from "react-icons/md";

const Card = ({ title, content1 }) => {
  return (
    <StyledWrapper>
      <div className="book">
        <div className="inner flex flex-col items-center py-3 px-1 justify-between gap-10">
          <p className="text-white text-[20px] font-bold">{content1}</p>
          <div className="flex items-center justify-center gap-5 bottom-0 bg-black">
            <MdEdit className="text-white"/>
          </div>
        </div>
        <div className="cover">
          <p className="text-white text-[20px] font-bold">{title}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
 --cover-background: oklch(27.7% 0.046 192.524); 
 --main-background: oklch(43.7% 0.078 188.216);

  .book {
    position: relative;
    border-radius: 10px;
    width: 180px;
    height: 250px;
    background-color: var(--cover-background);
    -webkit-box-shadow: 1px 1px 5px #000;
    box-shadow: 1px 1px 5px #000;
    -webkit-transform: preserve-3d;
    -ms-transform: preserve-3d;
    transform: preserve-3d;
    -webkit-perspective: 2000px;
    perspective: 600px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #000;
    transition-duration: 0.5s;
  }

  .cover{
   top: 0;
    position: absolute;
    background-color: var(--main-background);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 1px 5px #000;
    box-shadow: 1px 1px 5px #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .inner {
    top: 0;
    position: absolute;
    background-color: var(--main-background);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 1px 5px #000;
    box-shadow: 1px 1px 5px #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
  }

  .book:hover .cover {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: rotatey(70deg);
    -ms-transform: rotatey(70deg);
    transform: rotatey(-70deg);
  }

  .book:hover .inner {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    transform: rotateZ(10deg) rotateX(-3deg) rotateY(-10deg) translateX(140px);
    -webkit-box-shadow: 1px 1px 20px #000a;
    box-shadow: 1px 1px 20px #000a;
  }

  .book:hover {
    transform: rotateZ(-10deg);
  }  
  }`;

export default Card;
