import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ua"],

  defaultLocale: "ua",
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // Ensure that locale specific sign-in pages are public
  publicRoutes: [
    "/",
    "/ua",
    "/ua/about",
    "/ua/blog",
    "/ua/contact",
    "/ua/campaign",
    "/en",
    "/en/about",
    "/en/blog",
    "/en/contact",
    "/en/campaign",
    "/:locale/sign-in",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
