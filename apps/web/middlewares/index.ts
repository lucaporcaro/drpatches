import { LanguageMiddleware } from "./language.middleware";
import { NoLoginMiddleware } from "./no-login.middleware";

export default [NoLoginMiddleware, LanguageMiddleware];
