"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define = async (word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    try {
        const result = await response.json();
        const pronunciation = result[0].phonetics[0].audio;
        const { definition } = result[0].meanings[0].definitions[0];
        const { example } = result[0].meanings[0].definitions[0];
        return { pronunciation, definition, example };
    }
    catch {
        return { error: "word not found" };
    }
};
exports.default = { define };
