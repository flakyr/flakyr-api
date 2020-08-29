import Test, { TestModel } from 'database/models/test';

export type CreateTestData = {
    buildId: number;
    suiteName: string;
    status: boolean;
    testName: string;
    project: string;
};

export type Projects = Array<string>;

export default class TestService {
    public static async createTest(data: CreateTestData): Promise<Test> {
        const parentBuildId = data.buildId;
        const testName = `${data.suiteName}:${data.testName}`;
        const test = {
            ...data,
            testName,
            parentBuildId,
        };

        const countTestDublicates = await TestModel.find({
            project: data.project,
            parentBuildId,
            testName,
        })
            .lean()
            .countDocuments();

        if (countTestDublicates) {
            test.buildId = parseFloat(`${data.buildId}.${countTestDublicates}`);
        }

        return TestModel.create(test);
    }

    public static async getProjects(): Promise<Projects> {
        return TestModel.find().distinct('project');
    }
}
