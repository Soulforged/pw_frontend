//@flow
import type { User } from "src/users/types";

export type SessionUser = {
  details: User,
  token: string
};
