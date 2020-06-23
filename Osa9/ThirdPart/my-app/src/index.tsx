import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Total from './components/Total'
import Content from './components/Content'

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartFour {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartFour {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFive extends CoursePartFour {
  name: "testia",

}
interface CoursePartFour extends CoursePartBase {
  description: string;
}
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFive;

const App: React.FC = () => {

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "testia",
      exerciseCount: 9,
      description: "testidescriptioni"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById("root"));