//@flow
import type { ComponentType } from "react";

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
  username: string,
  routes: Array<FeatureRoute>
};
