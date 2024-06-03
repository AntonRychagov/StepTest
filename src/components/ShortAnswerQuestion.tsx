import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Question } from "../types";
import testStore from "../stores/TestStore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ShortAnswerQuestionProps {
  question: Question;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = observer(
  ({ question }) => {
    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
      const savedAnswer = testStore.answers.get(question.id);
      if (savedAnswer) {
        setAnswer(savedAnswer.answer as string);
      }
    }, [question.id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAnswer(event.target.value);
      testStore.answerQuestion({
        questionId: question.id,
        answer: event.target.value,
      });
    };

    if (!question) {
      return <div>Loading...</div>;
    }

    return (
      <Box>
        <Typography variant="h6" sx={{margin: 2}}>{question.question}</Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={answer}
          onChange={handleInputChange}
        />
      </Box>
    );
  }
);

export default ShortAnswerQuestion;
