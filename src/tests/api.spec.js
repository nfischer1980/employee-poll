import { saveQuestion, saveQuestionAnswer, saveUser } from "../utils/api";

jest.useRealTimers();

describe("Save question function", () => {
  jest.setTimeout(10000);
  it("returned the save question and verify the fields", async () => {
    const mockQuestion = {
      optionOneText: "Eat a sandwick",
      optionTwoText: "Eat an omelette",
      author: "saraedo",
    };

    const formattedQuestion = await saveQuestion(mockQuestion);

    expect(formattedQuestion.id).not.toBeNull();
    expect(formattedQuestion.timestamp).not.toBeNull();
    expect(formattedQuestion.author).toBe("saraedo");
    expect(formattedQuestion.optionOne.votes.length).toBe(0);
    expect(formattedQuestion.optionOne.text).toBe("Eat a sandwick");
    expect(formattedQuestion.optionTwo.votes.length).toBe(0);
    expect(formattedQuestion.optionTwo.text).toBe("Eat an omelette");
  });
  it("return an error if incorrect data is passed", async () => {
    const mockQuestion = {
      optionOne: "Eat a sandwick",
      optionTwo: "Eat an omelette",
      author: "saraedo",
    };

    await expect(saveQuestion(mockQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("Save questionAnswer function", () => {
  jest.setTimeout(10000);
  it("returned the save question and verify the fields", async () => {
    const mockAnswer = {
      authedUser: "zoshikanlu",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    const saved = await saveQuestionAnswer(mockAnswer);

    expect(saved).toBe(true);
  });

  it("return an error if incorrect data is passed", async () => {
    const mockAnswer = {
      authedUser: "sarahedo",
    };

    await expect(saveQuestionAnswer(mockAnswer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
