export const lessons = [];

const curriculum = [
    { range: [1, 30], topic: "JavaScript Basics", language: "js" },
    { range: [31, 60], topic: "Advanced JavaScript", language: "js" },
    { range: [61, 90], topic: "HTML Foundations", language: "html" },
    { range: [91, 120], topic: "CSS Styling", language: "css" },
    { range: [121, 150], topic: "Web Projects", language: "js" },
    { range: [151, 180], topic: "Python Programming", language: "python" }
];

curriculum.forEach(section => {
    for (let i = section.range[0]; i <= section.range[1]; i++) {

        lessons.push({
            id: i,
            title: `Lesson ${i}: ${section.topic}`,
            language: section.language,

            instructions: [
                `Welcome to ${section.topic}.`,
                `Read the explanation carefully.`,
                `Complete the coding task below.`,
                `Click "Check My Code" when done.`
            ],

            explanation: `
                <p>This lesson builds your understanding step by step.</p>
                <p>You are learning ${section.topic}.</p>
                <p>By lesson ${section.range[1]}, you will have mastered this section.</p>
            `,

            starterCode: getStarter(section.language),

            mustContain: getRequirement(section.language)
        });
    }
});

function getStarter(lang) {
    if (lang === "js") return `console.log("Hello World");`;
    if (lang === "html") return `<h1>Hello World</h1>`;
    if (lang === "css") return `body { background: white; }`;
    if (lang === "python") return `print("Hello World")`;
}

function getRequirement(lang) {
    if (lang === "js") return ["console"];
    if (lang === "html") return ["<"];
    if (lang === "css") return ["{"];
    if (lang === "python") return ["print"];
}
