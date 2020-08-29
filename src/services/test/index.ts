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
        return TestModel.create<CreateTestData>(data);
    }

    public static async getProjects(): Promise<Projects> {
        return TestModel.find().distinct('project');
    }
}
