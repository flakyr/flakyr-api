import { Schema, model, Document } from 'mongoose';

export default interface Test extends Document {
    buildId: number;
    suiteName: string;
    status: boolean;
    testName: string;
    project: string;
    parentBuildId: number;
}

const schema = new Schema(
    {
        buildId: {
            type: Number,
            required: true,
            trim: true,
        },
        suiteName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        status: {
            type: Boolean,
            required: true,
        },
        testName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        project: {
            type: String,
            required: true,
            trim: '',
            maxlength: 100,
        },
        parentBuildId: {
            type: Number,
            required: true,
        },
    },
    {
        autoIndex: false,
        versionKey: false,
    }
);

export const TestModel = model<Test>('test', schema);
