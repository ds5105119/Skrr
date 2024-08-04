import fetchAIHandler from "./openai";

const fetchQuestions = async (systemContent, userContent) => {
    try {
        const response = await fetchAIHandler([
            {
                role: "system",
                content: systemContent.replace(/\n/gi, ""),
            },
            {
                role: "user",
                content: userContent,
            },
        ]);
        const jsonResponse = JSON.parse(response);

        if (!jsonResponse["answer"]) {
            throw new Error("fetchAIHandler error: no content");
        }

        return jsonResponse;
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
        return false;
    }
};

export default fetchQuestions;
