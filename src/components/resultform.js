import styled, { keyframes } from "styled-components";
import Button from "./button";

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

    background: rgba(255, 230, 230, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 4;
`;

// Model 박스
const ModalBox = styled.div`
    width: 85%;
    height: 90%;

    border-radius: 1.8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: rgba(255, 255, 255, 1);
    z-index: 5;
    box-shadow: 3px 4px 14px 0px rgba(0, 0, 0, 0.15);

    animation: ${slideUp} 1s ease-out forwards;
`;

const StyledTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0px 0px 40px 0px;
    font-size: 3.5rem;
`;

const StyledText = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    padding-left: 2rem;
    font-size: 1.8rem;
`;

const StyledContent = styled.div`
    padding: 0rem 2rem 2rem 2rem;
`;

const ButtonWrapper = styled.div`
    align-self: center;
    width: 75%;
    height: 60px;

    > button {
        width: 100%;
        height: 100%;
    }
`;

const ResultForm = ({ response, name }) => {
    return (
        <Backdrop>
            <ModalBox>
                <StyledTitle>{name}의 미래는?</StyledTitle>
                <StyledText>직업: {response["job"]}</StyledText>
                <StyledText>MBTI: {response["MBTI"]}</StyledText>
                <StyledContent>{response["평가"]}</StyledContent>
                <ButtonWrapper>
                    <Button fill="true" color="black" bordertype="rect">
                        <a href="https://skrrr.vercel.app">HOME</a>
                    </Button>
                </ButtonWrapper>
            </ModalBox>
        </Backdrop>
    );
};

export default ResultForm;
