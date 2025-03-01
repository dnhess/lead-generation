# Authentication Documentation

## Overview
The application uses a simple cookie-based authentication system for admin access. This implementation is designed for development and testing purposes. For production use, it's recommended to implement a more robust solution like NextAuth.js.

## Current Implementation

### Authentication Flow
1. Users access the login page at `/login`
2. Upon successful login, a secure HTTP-only cookie is set
3. Protected routes check for this cookie and redirect to login if not present
4. Admin routes are protected under the `/admin/*` path

### Key Components

#### Server Actions
The authentication logic is handled by three main server actions:

```typescript:app/actions.ts
startLine: 5
endLine: 22
```

- `login()`: Validates credentials and sets authentication cookie
- `logout()`: Removes authentication cookie
- `checkAuth()`: Verifies authentication status

#### Protected Routes
Admin routes are protected using a layout component that checks authentication status:

```typescript:app/admin/layout.tsx
startLine: 6
endLine: 23
```

### Default Credentials

```
Email: admin@tryalma.com
Password: password123
```


⚠️ **Warning**: These are development credentials and should be changed in production.

## Security Considerations

### Current Security Features
- HTTP-only cookies to prevent XSS attacks
- Secure cookie flag enabled for HTTPS
- Server-side authentication checks
- Protected route redirects

### Security Limitations
1. Basic credential validation
2. No rate limiting
3. No CSRF protection
4. No session expiration
5. Credentials stored in code

## Recommended Production Improvements

1. **Implement NextAuth.js**
   - Provides built-in security features
   - Supports multiple authentication providers
   - Handles session management

2. **Enhanced Security**
   - Add rate limiting for login attempts
   - Implement CSRF protection
   - Add session expiration
   - Store hashed credentials in database
   - Add 2FA support

3. **User Management**
   - Add user registration
   - Password reset functionality
   - Email verification
   - Role-based access control

4. **Monitoring & Logging**
   - Add authentication event logging
   - Monitor failed login attempts
   - Implement security alerts

## Usage Examples

### Checking Authentication Status

```typescript
const { isAuthenticated } = await checkAuth();
```

### Protected API Routes

```typescript
import { checkAuth } from "@/app/actions";
export async function GET() {
const { isAuthenticated } = await checkAuth();
if (!isAuthenticated) {
return new Response("Unauthorized", { status: 401 });
}
// Handle authenticated request
}
```