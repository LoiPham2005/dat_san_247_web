
import NextAuth from "next-auth";
// Configure providers properly

const handler = NextAuth({
    providers: [],
});

export { handler as GET, handler as POST };
