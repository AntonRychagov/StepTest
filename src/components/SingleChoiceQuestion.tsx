import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Question } from "../types";
import testStore from "../stores/TestStore";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface SingleChoiceQuestionProps {
  question: Question;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = observer(
  ({ question }) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
      const savedAnswer = testStore.answers.get(question.id);
      if (savedAnswer) {
        setSelectedOption(savedAnswer.answer as string);
      }
    }, [question.id]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
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
        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            {question.options?.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  }
);

export default SingleChoiceQuestion;
