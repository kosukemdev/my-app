import nextauth from "next-auth";
import authOptions from "@/lib/auth";

const handler = nextauth(authOptions);

export { handler as GET, handler as POST };
