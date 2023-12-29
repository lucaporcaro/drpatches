import { LoginRequired } from "./login-required";
import { LanguageMiddleware } from "./language.middleware";
import { NoLoginMiddleware } from "./no-login.middleware";

export default [LoginRequired, NoLoginMiddleware, LanguageMiddleware];
