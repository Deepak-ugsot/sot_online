/**
 * Public API for the auth feature.
 *
 * Routes and other features import from `@/features/auth` only — never from an
 * internal component path.
 */
export { LoginScreen } from "./components/login-screen";
export {
  useRequireSession,
  useSession,
  useSignOut,
} from "./hooks/use-session";
export type {
  CallbackField,
  CallbackFieldName,
  CallbackRequest,
  LoginStep,
  RequestStatus,
  Session,
  SessionStatus,
} from "./types/auth.types";
