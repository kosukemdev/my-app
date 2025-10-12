import nextauth from "next-auth";
import githubProvider from "next-auth/providers/github";

const handler = nextauth({
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
