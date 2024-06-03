import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Question } from "../types";
import testStore from "../stores/TestStore";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface MultipleChoiceQuestionProps {
  question: Question;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = observer(
  ({ question }) => {
    const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
      new Set()
    );

    useEffect(() => {
      const savedAnswer = testStore.answers.get(question.id);
      if (savedAnswer) {
        setSelectedOptions(new Set(savedAnswer.answer as string[]));
      }
    }, [question.id]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const option = event.target.value;
      setSelectedOptions((prevSelectedOptions) => {
        const newSelectedOptions = new Set(prevSelectedOptions);
        if (newSelectedOptions.has(option)) {
          newSelectedOptions.delete(option);
        } else {
          newSelectedOptions.add(option);
        }
        testStore.answerQuestion({
          questionId: question.id,
          answer: Array.from(newSelectedOptions),
        });
        return newSelectedOptions;
      });
    };

    if (!question) {
      return <div>Loading...</div>;
    }

    return (
      <Box>
        <Typography variant="h6" sx={{margin: 2}}>{question.question}</Typography>
        <FormControl component="fieldset">
          {question.options?.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={selectedOptions.has(option)}
                  onChange={handleOptionChange}
                  value={option}
                />
              }
              label={option}
            />
          ))}
        </FormControl>
      </Box>
    );
  }
);

export default MultipleChoiceQuestion;
