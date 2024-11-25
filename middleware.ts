import NextAuth from "next-auth";
import authConfig from "./next-auth.config";

const { auth: middleware } = NextAuth(authConfig);
const authPaths = [
    "/auth",
]

export default middleware((req) => {
    if (authPaths.includes(req.nextUrl.pathname)) {
        if (req.auth) {
            const redirectUrl = new URL("/", req.url);
            return Response.redirect(redirectUrl);
        }
        return
    }
    if (!req.auth) {
        const redirectUrl = new URL("/auth", req.url);
        return Response.redirect(redirectUrl);
    }
    return
})

export const config = {
    matcher: ["/auth/:path*", "/events/:path*"],
}