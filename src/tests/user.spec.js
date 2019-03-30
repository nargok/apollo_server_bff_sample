import { expect } from 'chai';

import * as userApi from './userApis';

describe('users', () => {
  describe('users: [Users]', () => {
    it('returns user list', async () => {
      const result = await userApi.users();
      expect(result.data.length).to.not.equal(0);
    });
  });
  describe('me', () => {
    it('returns current user', async () => {
      const expectedResult = {
        me: {
          username: '百獣魔団長クロコダイン'
        }
      };

      const result = await userApi.me();
      expect(result.data['data']).to.eql(expectedResult);
    });
  });

});
