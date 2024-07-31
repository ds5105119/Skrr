const fetchAIHandler = async (userData) => {
    const response = await fetch("/api/openai_api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        redirect: "follow",
    });

    const jsonResponse = await response.json();
    const returnValue = await jsonResponse.choices[0].message.content;

    return returnValue;
};

export default fetchAIHandler;
