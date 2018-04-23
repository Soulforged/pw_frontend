//@flow
import type { ComponentType } from "react";
import type { SessionUser } from "src/session/types";

export * from "react";
export * from "redux";
export * from "react-router";

export type AppError = {
  message: string,
  status: string
} | Error | boolean;

export type UserInfo = {
  username: string,
  password: string
};

export type FeatureRoute = {
  path: string,
  name: string,
  title?: string,
  component: ComponentType<*>,
  hidden?: boolean,
  routes?: Array<FeatureRoute>
};

export type Session = {
  user: SessionUser,
  routes: Array<FeatureRoute>
};
