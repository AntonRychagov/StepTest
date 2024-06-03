import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import testStore from "../stores/TestStore";
import Stepper from "./Stepper";
import QuestionComponent from "./Question";
import Timer from "./Timer";
import { Question } from "../types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const StepTestApp: React.FC = observer(() => {
  useEffect(() => {
    const mockQuestions: Question[] = [
      {
        id: "1",
        type: "single",
        question:
          "Что должен знать фронтенд-разработчик? Назовите три ключевых технологии",
        options: [
          "HTML, CSS и JavaScript.",
          "Kotlin, PHP и JavaScript.",
          "PHP, HTML и CSS.",
        ],
      },
      {
        id: "2",
        type: "multiple",
        question: "Выберите целый числа",
        options: ["2", "3", "4", "5"],
      },
      { id: "3", type: "short", question: "Введите имя" },
      {
        id: "4",
        type: "long",
        question: "Опишите свой опыт программирования",
      },
    ];
    testStore.setQuestions(mockQuestions);
    testStore.reset();
    testStore.loadProgress();
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      testStore.saveProgress();
    }, 5000); // Сохраняем прогресс каждые 5 секунд

    return () => clearInterval(saveInterval);
  }, []);

  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{borderRadius: 3}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Тестирование
          </Typography>
          <Timer />
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Stepper
          currentStep={testStore.currentQuestionIndex + 1}
          totalSteps={testStore.questions.length}
        />
        {testStore.questions.length > 0 && (
          <QuestionComponent
            question={testStore.questions[testStore.currentQuestionIndex]}
          />
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={() => testStore.previousQuestion()}
            disabled={testStore.currentQuestionIndex === 0}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => testStore.nextQuestion()}
            disabled={
              testStore.currentQuestionIndex === testStore.questions.length - 1
            }
          >
            Далее
          </Button>
        </Box>
      </Box>
    </Container>
  );
});

export default StepTestApp;
