// middleware.ts (root of project)

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login', // 👈 redirects to /login instead of /api/auth/signin
  },
});

export const config = {
  matcher: ['/student','/teacher', '/stuff'], // protect this route
};
