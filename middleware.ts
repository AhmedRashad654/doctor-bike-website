import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
// import { JWTPayload, jwtVerify } from "jose";

const locales = ["en", "ar", "he"];

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/user", "/checkout", "/orders", "/success-checkout"];

const guestOnlyRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgt-password",
  "/change-password",
  "/otp",
  "/succss-otp",
];

// async function verifyToken(token: string) {
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
//     console.log(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (error) {
//     console.log(error, "error");
//     return null;
//   }
// }

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token_doctor_bike_website")?.value;
  const segments = pathname.split("/");
  const locale = locales.includes(segments[1]) ? segments[1] : null;
  const cleanPath = locale ? `/${segments.slice(2).join("/")}` : pathname;
  const isProtected = protectedRoutes.some((route) =>
    cleanPath.startsWith(route)
  );
  const isGuestOnly = guestOnlyRoutes.some((route) =>
    cleanPath.startsWith(route)
  );

  // let payload: JWTPayload | null = null;
  // if (token) {
  //   payload = await verifyToken(token);
  // }
  // console.log(payload, "payload");
  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL(`/${locale || "en"}/sign-in`, request.url)
    );
  }

  if (isGuestOnly && token) {
    return NextResponse.redirect(new URL(`/${locale || "en"}/`, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
