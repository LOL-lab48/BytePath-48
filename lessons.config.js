// lessons.config.js

export const lessons = [];

/* ======================================================
   BEGINNER SECTION – VERY DETAILED (Lessons 1–5)
====================================================== */

lessons.push({
    id: 1,
    title: "Lesson 1: What is JavaScript?",
    explanation: `
        <p>Welcome to BytePath 48!</p>

        <p>JavaScript is a programming language used to make websites interactive.</p>

        <p>It allows websites to respond when you click buttons,
        type in forms, or load new content.</p>

        <p>The most basic command in JavaScript is:</p>

        <pre>console.log("Hello World");</pre>

        <p>This prints text into the browser console.</p>
    `,
    task: "Print the text Hello BytePath 48 to the console.",
    example: `console.log("Hello BytePath 48");`,
    starterCode: `console.log("");`
});

lessons.push({
    id: 2,
    title: "Lesson 2: Variables",
    explanation: `
        <p>A variable stores information.</p>

        <p>Think of it like a box with a label.</p>

        <p>We use the word <strong>let</strong> to create one.</p>

        <pre>let age = 13;</pre>

        <p>This creates a variable called age and stores the number 13.</p>
    `,
    task: "Create a variable called age and set it equal to 13.",
    example: `let age = 13;`,
    starterCode: `let age = ;`
});

lessons.push({
    id: 3,
    title: "Lesson 3: Strings",
    explanation: `
        <p>A string is text.</p>

        <p>Strings go inside quotation marks:</p>

        <pre>"Hello"</pre>

        <p>You can store strings in variables.</p>
    `,
    task: "Create a variable called name and store your name in it.",
    example: `let name = "Alex";`,
    starterCode: `let name = "";`
});

lessons.push({
    id: 4,
    title: "Lesson 4: Numbers",
    explanation: `
        <p>Numbers do NOT use quotation marks.</p>

        <pre>let score = 100;</pre>

        <p>You can add numbers together:</p>

        <pre>let total = 5 + 10;</pre>
    `,
    task: "Create a variable called score and set it equal to 50.",
    example: `let score = 50;`,
    starterCode: `let score = ;`
});

lessons.push({
    id: 5,
    title: "Lesson 5: Printing Variables",
    explanation: `
        <p>You can print variables using console.log().</p>

        <pre>
let age = 13;
console.log(age);
        </pre>

        <p>This prints the value stored inside the variable.</p>
    `,
    task: "Create a variable called city and print it to the console.",
    example: `
let city = "London";
console.log(city);
    `,
    starterCode: `let city = "";\nconsole.log(city);`
});

/* ======================================================
   STRUCTURED CURRICULUM (6–180)
====================================================== */

const curriculumSections = [
    { start: 6, end: 30, topic: "JavaScript Fundamentals" },
    { start: 31, end: 60, topic: "Advanced JavaScript" },
    { start: 61, end: 90, topic: "HTML Foundations" },
    { start: 91, end: 120, topic: "CSS Styling" },
    { start: 121, end: 150, topic: "Web Projects" },
    { start: 151, end: 180, topic: "Python Programming" }
];

curriculumSections.forEach(section => {
    for (let i = section.start; i <= section.end; i++) {

        lessons.push({
            id: i,
            title: `Lesson ${i}: ${section.topic}`,
            explanation: `
                <p>This lesson is part of the ${section.topic} section.</p>

                <p>You are building real coding skills step by step.</p>

                <p>Read carefully, try your best, and practice consistently.</p>

                <p>By the end of this section, you will feel much more confident.</p>
            `,
            task: "Write code that prints something meaningful to the console.",
            example: `console.log("I am improving every day!");`,
            starterCode: `console.log("");`
        });

    }
});
