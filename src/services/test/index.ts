import takeRight from 'lodash/takeRight';

import Test, { TestModel } from 'database/models/test';

export type BuildId = number;
export type Project = string;
export type TestName = string;

export declare interface ICreateTestData {
    buildId: BuildId;
    suiteName: string;
    status: boolean;
    testName: TestName;
    project: Project;
}

export default class TestService {
    public static async createTest(data: ICreateTestData): Promise<Test> {
        return TestModel.create<ICreateTestData>(data);
    }

    public static async getProjects(): Promise<Array<Project>> {
        return TestModel.find().distinct('project');
    }

    public static async getLastBuildsIds(project: Project, count: number): Promise<Array<BuildId>> {
        const ids = await TestModel.find({ project }).lean().distinct('buildId');

        return takeRight(ids, count);
    }

    public static async getTestNamesWithFailsTests(
        project: Project,
        ids: Array<BuildId>
    ): Promise<Array<TestName>> {
        const testNames = await TestModel.find({
            project,
            status: false,
            buildId: { $in: ids },
        })
            .lean()
            .distinct('testName');

        return testNames;
    }
}
