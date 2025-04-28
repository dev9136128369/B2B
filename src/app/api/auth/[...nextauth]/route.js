// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// });

// export { handler as GET, handler as POST };


// app/api/auth/[...nextauth]/route.js
// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Yeh line multiple accounts show karne ke liye
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };