import { useState } from "react";
import "./App.css";
import Lesson1 from "./lessons/Lesson1_CORS";
import Lesson2 from "./lessons/Lesson2_XHR_Fetch";
import Lesson3 from "./lessons/Lesson3_React_CORS";
import Lesson4 from "./lessons/Lesson4_OWASP";
import Lesson5 from "./lessons/Lesson5_Security_cases";
import Lesson6 from "./lessons/Lesson6_Injection_XSS_CSRF";

function App() {
  const [currentLesson, setCurrentLesson] = useState(1);

  const lessons = [
    { id: 1, title: "CORS 기본 개념", component: Lesson1 },
    { id: 2, title: "XMLHttpRequest & Fetch API", component: Lesson2 },
    { id: 3, title: "React에서의 CORS", component: Lesson3 },
    { id: 4, title: "OWASP Top 10", component: Lesson4 },
    { id: 5, title: "보안사고 사례", component: Lesson5 },
    { id: 6, title: "SQL injection, XSS ,CSRF", component: Lesson6 },
  ];

  const CurrentComponent =
    lessons.find((l) => l.id === currentLesson)?.component || Lesson1;

  return (
    <div className="app">
      <header className="app-header">
        <h1>웹 시큐리티 실습 강의</h1>
        <nav className="lesson-nav">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              className={currentLesson === lesson.id ? "active" : ""}
              onClick={() => setCurrentLesson(lesson.id)}
            >
              {lesson.id}, {lesson.title}
            </button>
          ))}
        </nav>
      </header>
      <main className="lesson-content">
        <CurrentComponent />
      </main>
    </div>
  );
}

export default App;
