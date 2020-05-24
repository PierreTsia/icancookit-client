import { USER_FACTORY } from "./User.factory";

describe("FactoryExample.spec.ts", () => {
  describe("|->User Factory", () => {
    it("should create a random user", () => {
      const user = USER_FACTORY.getSingleRecord();
      ["_id", "email", "handle", "joinDate", "avatar"].forEach(property => {
        expect(user[property]).toBeTruthy();
      });
      expect(user.joinDate instanceof Date).toBe(true);
      expect(/.+@.+\..+/.test(user.email)).toBe(true);
      expect(/(http(s?):)([/|.|\w|\s|-])*\.(?:png)/.test(user.avatar)).toBe(
        true
      );
    });

    it("should create an array of users", () => {
      const users = USER_FACTORY.getArrayRecord(5);
      expect(users.length).toEqual(5);
      users.forEach((user: any) => {
        ["_id", "email", "handle", "joinDate", "avatar"].forEach(property => {
          expect(user[property]).toBeTruthy();
        });
        expect(user.joinDate instanceof Date).toBe(true);
        expect(/.+@.+\..+/.test(user.email)).toBe(true);
        expect(/(http(s?):)([/|.|\w|\s|-])*\.(?:png)/.test(user.avatar)).toBe(
          true
        );
      });
    });
  });
});
