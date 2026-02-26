// config/lessons.config.js
export const lessons = [
    {
        id: 1,
        title: "Lesson 1: HTML Basics",
        instructions: [
            "Create an <h1> element with 'Hello World'",
            "Create a <p> element with some text"
        ],
        starterCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Write your code here -->
  </body>
</html>`,
        language: "html",
        checker: function(userCode) {
            if(userCode.includes("<h1>") && userCode.includes("<p>")) {
                return { passed: true, feedback: "You created heading and paragraph correctly!" };
            } else {
                return { passed: false, feedback: "Make sure you add an <h1> and a <p>." };
            }
        }
    },
    {
        id: 10,
        title: "Lesson 10: Simple Snake Game (Python)",
        instructions: [
            "Step 1: Import the turtle module.",
            "Step 2: Create the snake head as a square.",
            "Step 3: Make the snake move with arrow keys.",
            "Step 4: Add food that the snake can eat.",
            "Step 5: Detect collision with walls or itself."
        ],
        starterCode: `import turtle

# Your snake game code here
`,
        language: "python",
        checker: function(userCode) {
            if(userCode.includes("turtle") && userCode.includes("import")) {
                return { passed: true, feedback: "You imported turtle! Next, set up your snake head." };
            } else {
                return { passed: false, feedback: "You need to import turtle first." };
            }
        }
    }
];

// Optionally generate 180 lessons dynamically
for(let i = 2; i <= 180; i++) {
    if(!lessons.find(l => l.id === i)) {
        lessons.push({
            id: i,
            title: `Lesson ${i}`,
            instructions: ["Follow the instructions for this lesson."],
            starterCode: "// Your code here",
            language: "html",
            checker: (code) => ({ passed: true, feedback: "This is a placeholder lesson." })
        });
    }
}
