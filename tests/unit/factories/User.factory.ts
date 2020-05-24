import { MockDataFactory } from "./MockDataFactory";
import { User, UserId } from "@/models/User.model";
import { RANDOM_TYPED_ID, RANDOM_STRING } from "./RandomDataFactory";

const PREFIX = "USER_";

export const USER_FACTORY: any = new MockDataFactory<User>(() => {
  const _id: UserId = RANDOM_TYPED_ID.getOne();
  return new User({
    _id,
    handle: `${PREFIX}_${_id}_DISPLAY-NAME_${RANDOM_STRING.getOne()}`,
    avatar: `https://api.adorable.io/avatars/100/${RANDOM_STRING.getOne()}.png`,
    joinDate: new Date(),
    email: `${PREFIX}_${_id}_EMAIL@${RANDOM_STRING.getOne(5)}.com`
  });
});
