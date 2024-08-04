import styled, { keyframes } from "styled-components";

// Modal keyframe
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modal Backdrop
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 4;
`;

// Model 박스
const ModalBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 1);
    text-align: center;
    z-index: 5;

    animation: ${slideUp} 1s ease-out forwards;
`;

const ResultForm = ({ response, name }) => {
    return (
        <Backdrop>
            <ModalBox>
                {name}의 직업은?: {response["job"]}
            </ModalBox>
        </Backdrop>
    );
};

export default ResultForm;
