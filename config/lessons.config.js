export const lessons = [
    {
        id: 1,
        title: "Lesson 1 / 180: Hello World in JS",
        language: "javascript",
        instructions: ["Print 'Hello World' using console.log."],
        starterCode: `// Your code here`,
        expectedOutput: "Hello World",
        mustContain: ["console.log"]
    },
    // ... lessons 2–9
    {
        id: 10,
        title: "Lesson 10 / 180: Simple Loop",
        language: "javascript",
        instructions: [
            "Create a for loop that prints numbers 1 to 5",
            "Use console.log inside the loop"
        ],
        starterCode: `// Your code here`,
        expectedOutput: "1\n2\n3\n4\n5",
        mustContain: ["for", "console.log"]
    },
    // ... continue lessons 11–180
];
