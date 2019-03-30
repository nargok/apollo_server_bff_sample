import { expect } from 'chai';

import * as userApi from './userApis';

describe('users', () => {
  describe('users: [Users]', () => {
    it('returns user list', async () => {
      const result = await userApi.users();
      expect(result.data.length).to.not.equal(0);
    })
  })
});