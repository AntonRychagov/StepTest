import { makeAutoObservable } from "mobx";
import { Question, Answer } from "../types";

class TestStore {
  questions: Question[] = [];
  answers: Map<string, Answer> = new Map();
  currentQuestionIndex: number = 0;
  startTime: number = Date.now();
  timeLimit: number = 1200; // 20 мин

  constructor() {
    makeAutoObservable(this);
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  answerQuestion(answer: Answer) {
    this.answers.set(answer.questionId, answer);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  getTimeRemaining() {
    return Math.max(0, this.timeLimit - (Date.now() - this.startTime) / 1000);
  }

  reset() {
    this.currentQuestionIndex = 0;
    this.answers.clear();
    this.startTime = Date.now();
  }

  saveProgress() {
    const progress = {
      answers: Array.from(this.answers.entries()),
      currentQuestionIndex: this.currentQuestionIndex,
      startTime: Date.now(),
    };
    localStorage.setItem("testProgress", JSON.stringify(progress));
  }

  loadProgress() {
    const savedProgress = localStorage.getItem("testProgress");
    if (savedProgress) {
      const { answers, currentQuestionIndex, startTime } =
        JSON.parse(savedProgress);
      this.answers = new Map(answers);
      this.currentQuestionIndex = currentQuestionIndex;
      this.startTime = startTime;
    } else {
      this.reset();
    }
  }
}

const testStore = new TestStore();
export default testStore;
