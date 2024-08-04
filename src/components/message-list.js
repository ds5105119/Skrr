import styled from "styled-components";

import Image from "next/image";
import Message from "./message";

const StyledUserMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 0.6rem;

    & > * {
        background-color: rgba(0, 122, 255, 0.9);
        border-radius: 1.2rem;
        max-width: 80%;
    }

    & > :not(:last-child):first-child {
        border-radius: 1.2rem 1.2rem 0.2rem 1.2rem;
    }

    & > :not(:first-child):last-child {
        border-radius: 1.2rem 0.2rem 1.2rem 1.2rem;
    }

    & > *:not(:first-child):not(:last-child) {
        border-radius: 1.2rem 0.2rem 0.2rem 1.2rem;
    }

    & > *:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const StyledOtherMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 80%;
    padding-left: 0.6rem;

    & > * {
        border-radius: 1.2rem;
    }

    & > :not(:last-child):first-child {
        border-radius: 1.2rem 1.2rem 1.2rem 0.2rem;
    }

    & > :not(:first-child):last-child {
        border-radius: 0.2rem 1.2rem 1.2rem 1.2rem;
    }

    & > *:not(:first-child):not(:last-child) {
        border-radius: 0.2rem 1.2rem 1.2rem 0.2rem;
    }

    & > *:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const StyledOtherMessageWrapper = styled.div`
    padding-left: 0.6rem;
    display: flex;
    align-items: flex-end;
`;

const StyledMessageList = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 12px;
    }
`;

const profileStyle = {
    borderRadius: "50%",
    border: "3px solid rgba(100, 100, 0, 0.3)",
};

const groupMessageById = (messageList) => {
    /**
     * @param message: [{isUser: boolean, ...},] 형태의 리스트
     * @return id로 그룹화된 리스트
     */
    const messages = [];
    let currentId = null;
    let currentGroup = [];

    messageList.forEach((item) => {
        if (item.isUser !== currentId) {
            if (currentGroup.length > 0) {
                messages.push(currentGroup);
            }
            currentId = item.isUser;
            currentGroup = [item];
        } else {
            currentGroup.push(item);
        }
    });

    if (currentGroup.length > 0) {
        messages.push(currentGroup);
    }

    return messages;
};

const MessageList = ({ messages, currentTypingId, onEndTyping }) => {
    const groupMessage = groupMessageById(messages);

    return (
        <StyledMessageList>
            {groupMessage.map((messagePiece, pieceIndex) =>
                messagePiece[0].isUser ? (
                    <StyledUserMessage key={pieceIndex}>
                        {messagePiece.map((message, index) => (
                            <Message {...message} key={index} onEndTyping={onEndTyping} currentTypingId={currentTypingId} />
                        ))}
                    </StyledUserMessage>
                ) : (
                    <StyledOtherMessageWrapper key={pieceIndex}>
                        <Image src="/character1-white.png" alt="butler profile" quality={30} width={40} height={40} style={profileStyle} />
                        <StyledOtherMessage>
                            {messagePiece.map((message, index) => (
                                <Message {...message} key={index} onEndTyping={onEndTyping} currentTypingId={currentTypingId} />
                            ))}
                        </StyledOtherMessage>
                    </StyledOtherMessageWrapper>
                )
            )}
        </StyledMessageList>
    );
};

export default MessageList;
