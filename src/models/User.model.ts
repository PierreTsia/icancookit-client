import { As } from "@/models/common";

export type UserId = string & As<"UserId">;

export interface UserInterface {
  _id: UserId;
  handle: string;
  avatar: string;
  email: string;
  joinDate: Date;
}

export class User {
  public _id: UserId;
  public handle: string;
  public avatar: string;
  public email: string;
  public joinDate: Date;
  constructor(obj: UserInterface) {
    this._id = obj._id;
    this.handle = obj.handle;
    this.avatar = obj.avatar;
    this.joinDate = obj.joinDate;
    this.email = obj.email;
  }
}
