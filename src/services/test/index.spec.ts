import omit from 'lodash/omit';
import { assert } from 'chai';

import 'database';
import { TestModel } from 'database/models/test';

import TestService, { CreateTestData } from './index';

describe('Test service check', () => {
    beforeEach(async () => {
        await TestModel.deleteMany({});
    });

    it('create test', async () => {
        // arrange
        const createTestData: CreateTestData = {
            status: false,
            testName: 'test name',
            suiteName: 'suite name',
            buildId: 343,
            project: 'project',
        };

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

    it('create test with buildId dublicate', async () => {
        // arrange
        const createTestData: CreateTestData = {
            status: false,
            testName: 'test name',
            suiteName: 'suite name',
            buildId: 343,
            project: 'project',
        };

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
});
