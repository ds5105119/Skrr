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

    background: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 2;
`;

// Model 박스
const ModalBox = styled.div`
    width: 90%;

    background: rgba(255, 255, 255, 1);
    padding: 40px 20px 40px 20px;

    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 3;

    padding-top: 3rem;
    padding-right: 3rem;
    padding-bottom: 3rem;
    padding-left: 3rem;

    animation: ${slideUp} 0.8s ease-out forwards;

    // close button
    > button {
        margin-top: 20px;
        width: 100%;
        height: 4rem;
        font-size: 1.3rem;
    }
`;

const Modal = ({ children }) => {
    return (
        <Backdrop>
            <ModalBox>{children}</ModalBox>
        </Backdrop>
    );
};

export default Modal;
