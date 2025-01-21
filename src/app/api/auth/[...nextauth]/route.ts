import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { mockUsers } from "@/lib/mockData";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("请输入用户名和密码");
        }

        const user = mockUsers.find(u => u.username === credentials.username);
        if (!user) {
          throw new Error("用户名或密码错误");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("用户名或密码错误");
        }

        if (!user.is_active) {
          throw new Error("账户已被禁用");
        }

        if (user.valid_until && new Date(user.valid_until) < new Date()) {
          throw new Error("账户已过期");
        }

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24小时
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  }
});

export { handler as GET, handler as POST } 