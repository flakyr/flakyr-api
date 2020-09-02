import omit from 'lodash/omit';
import { assert } from 'chai';

import 'database';
import { TestModel } from 'database/models/test';

import TestService, { ICreateTestData } from './index';

describe('service: "TestService"', () => {
    const createTestData: ICreateTestData = {
        status: false,
        testName: 'test name',
        suiteName: 'suite name',
        buildId: 343,
        project: 'project',
    };

    beforeEach(async () => {
        await TestModel.deleteMany({});
    });

    it('method: "createTest"', async () => {
        // arrange
        const expectedCreatedTest = {
            ...createTestData,
            testName: `${createTestData.suiteName}:${createTestData.testName}`,
            parentBuildId: createTestData.buildId,
        };

        // act
        const createdTest = await TestService.createTest(createTestData);

        // assert
        assert.deepEqual(omit(createdTest.toObject(), '_id'), expectedCreatedTest);
    });

    it('method: "createTest" with buildId dublicate', async () => {
        // arrange
        const expectedCreatedTest = {
            ...createTestData,
            buildId: 343.1,
            testName: `${createTestData.suiteName}:${createTestData.testName}`,
            parentBuildId: createTestData.buildId,
        };

        // act
        await TestService.createTest(createTestData);

        const secondCreatedTest = await TestService.createTest(createTestData);

        // assert
        assert.deepEqual(omit(secondCreatedTest.toObject(), '_id'), expectedCreatedTest);
    });

    it('method: "getProjects"', async () => {
        // arrange
        const secondProject = 'second-project';
        const expectedProjects = [createTestData.project, secondProject];

        // act
        await TestService.createTest(createTestData);
        await TestService.createTest(createTestData);
        await TestService.createTest({ ...createTestData, project: secondProject });

        const projects = await TestService.getProjects();

        // assert
        assert.deepEqual(expectedProjects, projects);
    });

    it('method: "getLastBuildsIds"', async () => {
        // arrange
        const checkProject = createTestData.project;
        const checkLastCount = 10;
        const secondCreatedTest = {
            ...createTestData,
            project: 'second-project',
        };
        const expectedLastBuildsIds = [
            createTestData.buildId,
            parseFloat(`${createTestData.buildId}.1`),
        ];

        // act
        await TestService.createTest(createTestData);
        await TestService.createTest(createTestData);
        await TestService.createTest(secondCreatedTest);

        const lastBuildsIds = await TestService.getLastBuildsIds(checkProject, checkLastCount);

        // assert
        assert.deepEqual(lastBuildsIds, expectedLastBuildsIds);
    });
});
