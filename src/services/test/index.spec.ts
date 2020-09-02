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

        const secondCreateTestData = await TestService.createTest(createTestData);

        // assert
        assert.deepEqual(omit(secondCreateTestData.toObject(), '_id'), expectedCreatedTest);
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
        const secondCreateTestData = {
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
        await TestService.createTest(secondCreateTestData);

        const lastBuildsIds = await TestService.getLastBuildsIds(checkProject, checkLastCount);

        // assert
        assert.deepEqual(lastBuildsIds, expectedLastBuildsIds);
    });

    it('method: "findTestNamesWithFailsTests"', async () => {
        // arrange
        const secondCreateTestData = {
            ...createTestData,
            testName: 'second test name',
        };
        const buildsIds = [createTestData.buildId, secondCreateTestData.buildId];

        // act
        const testName = (await TestService.createTest(createTestData)).testName;
        const secondTestName = (await TestService.createTest(secondCreateTestData)).testName;
        await TestService.createTest({
            ...createTestData,
            status: true,
        });

        const testNamesWithFailsTests = await TestService.getTestNamesWithFailsTests(
            createTestData.project,
            buildsIds
        );
        // assert
        assert.deepEqual(testNamesWithFailsTests, [testName, secondTestName]);
    });
});
