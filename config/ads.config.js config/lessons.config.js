export const lessons = Array.from({ length: 180 }, (_, i) => {
    return {
        id: i + 1,
        title: `Lesson ${i + 1}`,
        content: `This is lesson ${i + 1}. Learn and practice coding here.`
    };
});
