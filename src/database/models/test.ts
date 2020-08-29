import { Schema, model, Document } from 'mongoose';

export default interface ITest extends Document {
    buildId: number;
    suiteName: string;
    status: boolean;
    testName: string;
    project: string;
    parentBuildId: number;
}

const TestSchema = new Schema(
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
        },
    },
    {
        autoIndex: false,
        versionKey: false,
    }
);

TestSchema.pre<ITest>('save', async function (next) {
    const parentBuildId = this.buildId;
    const testName = `${this.suiteName}:${this.testName}`;

    const countTestDublicates = await TestModel.find({
        project: this.project,
        testName,
        parentBuildId: this.buildId,
    }).countDocuments();

    if (countTestDublicates) {
        this.buildId = parseFloat(`${this.buildId}.${countTestDublicates}`);
    }

    this.testName = testName;
    this.parentBuildId = parentBuildId;

    next();
});

export const TestModel = model<ITest>('test', TestSchema);
