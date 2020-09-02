import takeRight from 'lodash/takeRight';

import Test, { TestModel } from 'database/models/test';

export type BuildId = number;
export type Project = string;

export declare interface ICreateTestData {
    buildId: BuildId;
    suiteName: string;
    status: boolean;
    testName: string;
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
}
