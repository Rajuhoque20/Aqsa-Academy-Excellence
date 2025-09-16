import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Users from "../../../../../models/users";
// import bcrypt from "bcryptjs"; // if using password hashing

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          await connectToDatabase();
          const user = await Users.findOne({ username: credentials.username });
          if (!user) return null;

          // Password check (if using bcrypt)
          // const isValid = await bcrypt.compare(credentials.password, user.password);
          // if (!isValid) return null;

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            name:user?.name
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // ✅ correct key
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
