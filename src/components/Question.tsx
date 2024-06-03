import React from "react";
import { observer } from "mobx-react-lite";
import { Question as QuestionType } from "../types";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion";
import LongAnswerQuestion from "./LongAnswerQuestion";

interface QuestionProps {
  question: QuestionType;
}

const QuestionComponent: React.FC<QuestionProps> = observer(({ question }) => {
  if (!question) {
    return <div>Loading...</div>;
  }

  switch (question.type) {
    case "single":
      return <SingleChoiceQuestion question={question} />;
    case "multiple":
      return <MultipleChoiceQuestion question={question} />;
    case "short":
      return <ShortAnswerQuestion question={question} />;
    case "long":
      return <LongAnswerQuestion question={question} />;
    default:
      return <div>Unknown question type</div>;
  }
});

export default QuestionComponent;
