import * as math from 'mathjs';
import OpenAI from 'openai';

const {
    VITE_OPENAI_API_KEY,
    VITE_OPENAI_ORG_ID,
    VITE_OPENAI_MODEL
} = import.meta.env;

class Vector {
    elements: number[];

    constructor(elements: number[]) {
        this.elements = elements;
    }

    add(vector: Vector): Vector {
        return new Vector(
            math.add(this.elements, vector.elements)
        );
    }

    dot(vector: Vector): number {
        return math.dot(this.elements, vector.elements);
    }

    normalize(): Vector {
        const norm = math.norm(this.elements);
        if (norm === 0) {
            return this;
        }
        return new Vector(this.elements.map(
            v => v as number / (norm as number)
        ));
    }
}

export const openai = new OpenAI({
    apiKey: VITE_OPENAI_API_KEY,
    organization: VITE_OPENAI_ORG_ID
});

const getEmbedding = async (text: string): Promise<Vector> => {
    const response = await openai.embeddings.create({
        input: text,
        model: VITE_OPENAI_MODEL,
        encoding_format: 'float'
    }).then(response => response.data[0].embedding);

    return new Vector(response);
};

export const getEmbeddings = async (texts: string[]): Promise<{
    text: string,
    embedding: Vector
}[]> => {
    return await Promise.all(texts.map(getEmbedding)).then(embeddings => {
        //const result: { [text: string]: Vector } = {};

        //for (let i = 0; i < texts.length; i++) {
        //    result[texts[i]] = embeddings[i];
        //}
        return texts.map((text, i) => ({ text, embedding: embeddings[i] }));

        //return result;
    });
};
