# CarbonFlow Intelligence Platform - Full-Stack Implementation

A production-ready enterprise SaaS platform for managing carbon offset projects, tracking impact metrics, and trading carbon credits. Built with Next.js 16, PostgreSQL, Prisma ORM, and comprehensive authentication.

## What's Included

### Database & Backend
- **11-model PostgreSQL schema** with Prisma ORM
- **JWT authentication** with bcrypt password hashing
- **7 server action modules** for all CRUD operations
- **Role-based access control** (ADMIN, ORG_ADMIN, USER, VIEWER)
- **S3 integration** for document storage with presigned URLs
- **Audit logging** for compliance and security

### Frontend
- **Protected dashboard** with real database data
- **Authentication pages** (login, register, forgot password)
- **Project management** interface
- **Document, metric, and credit tracking**
- **Team management** interface
- **Responsive design** with Tailwind CSS v4 and shadcn/ui

### Features
- Multi-tenant organization structure
- Project status tracking (DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED)
- Verification workflow support
- Carbon credit issuance and trading
- Impact metric recording and verification
- Risk assessment tracking
- Complete audit trail

## Quick Start

### 1. Prerequisites
- Node.js 18+
- PostgreSQL (local or cloud)
- AWS S3 bucket (optional, for file uploads)
- pnpm (or npm/yarn)

### 2. Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local  # or your editor
```

### 3. Database Setup

```bash
# Run migrations
pnpm prisma:migrate

# Seed development data
pnpm prisma:seed
```

### 4. Start Development

```bash
pnpm dev
```

Application runs on `http://localhost:3000`

### 5. Login with Demo Account

- **Email**: admin@carbonflow.com
- **Password**: admin123

## Project Structure

```
app/
├── actions/              # Server Actions (backend operations)
│   ├── auth.ts          # Authentication & login
│   ├── projects.ts      # Project CRUD & metrics
│   ├── documents.ts     # Document management
│   ├── metrics.ts       # Impact metrics
│   ├── credits.ts       # Carbon credits
│   └── organizations.ts # Team management
├── api/                 # API Routes
│   ├── s3-upload/       # Presigned URL generation
│   └── health/          # Health check
├── auth/                # Authentication pages
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── dashboard/           # Protected dashboard
│   └── [subpages]
└── page.tsx             # Landing page

lib/
├── auth.ts              # JWT utilities
├── db.ts                # Prisma client
├── validations.ts       # Zod validation schemas

prisma/
├── schema.prisma        # Database schema
└── seed.ts              # Sample data

middleware.ts           # Request authentication
```

## Key Technologies

- **Next.js 16** - React framework with App Router & Server Actions
- **PostgreSQL** - Relational database
- **Prisma 7** - Type-safe ORM
- **TypeScript** - Type safety
- **JWT** - Session tokens
- **bcryptjs** - Password hashing
- **Zod** - Input validation
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **AWS S3** - File storage

## Environment Variables

Required variables (see `.env.example`):

```env
DATABASE_URL=                    # PostgreSQL connection string
JWT_SECRET=                      # Cryptographic secret (use openssl rand -base64 32)
AWS_REGION=                      # AWS region (e.g., us-east-1)
AWS_ACCESS_KEY_ID=               # AWS access key
AWS_SECRET_ACCESS_KEY=           # AWS secret key
AWS_S3_BUCKET=                   # S3 bucket name
NODE_ENV=development|production  # Environment
NEXTAUTH_URL=                    # Application URL
```

Full setup guide: See `ENV_SETUP.md`

## Database Models

### Core Models
- **Users** - Authentication and team members
- **Organizations** - Multi-tenant isolation
- **Projects** - Carbon offset projects
- **Documents** - Project documents (PDF, reports, etc.)
- **ImpactMetrics** - Project impact measurements
- **CarbonCredits** - Issued carbon credits
- **Trades** - Credit transfers
- **RiskAssessments** - Project risks
- **AuditLogs** - Compliance audit trail

## Server Actions

All operations are server-side for security:

### Authentication
- `login(email, password)` - User login
- `register(data)` - Create account & organization
- `logout()` - Clear session
- `getCurrentUser()` - Get current user

### Projects
- `getProjects(orgId)` - List organization projects
- `createProject(orgId, data)` - Create new project
- `updateProject(id, data)` - Update project
- `deleteProject(id)` - Delete project
- `getDashboardMetrics(orgId)` - Calculate KPIs

### Documents
- `createDocument(projectId, data)` - Add document
- `getProjectDocuments(projectId)` - List documents
- `deleteDocument(id)` - Remove document

### Metrics
- `createMetric(projectId, data)` - Record metric
- `getProjectMetrics(projectId)` - List metrics
- `verifyMetric(id)` - Mark verified
- `deleteMetric(id)` - Remove metric

### Credits
- `createCredit(projectId, orgId, data)` - Issue credits
- `getProjectCredits(projectId)` - List credits
- `issueCredit(id)` - Update status
- `retireCredit(id)` - Retire credits
- `deleteCredit(id)` - Remove credit

### Organizations
- `getOrganization(id)` - Get org details
- `updateOrganization(id, data)` - Update org
- `getOrganizationMembers(id)` - List team members
- `inviteTeamMember(orgId, email, role)` - Add member
- `updateMemberRole(orgId, userId, role)` - Change role
- `removeMember(orgId, userId)` - Remove member

## API Endpoints

```
POST   /api/auth/login          - Login endpoint
POST   /api/auth/register       - Registration endpoint
POST   /api/auth/logout         - Logout endpoint
POST   /api/s3-upload           - Generate presigned URL
GET    /api/health              - Health check
```

## Authentication Flow

1. User enters credentials on `/auth/login`
2. Server validates against database
3. JWT token created with user info
4. Token stored in HTTP-only cookie
5. Subsequent requests validate token
6. Middleware redirects unauth to login

Token includes:
- userId
- email
- organizationId
- role

## Security Features

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ HTTP-only secure cookies
- ✅ CSRF protection (same-site cookies)
- ✅ SQL injection prevention (Prisma parameterization)
- ✅ Input validation with Zod
- ✅ Role-based access control
- ✅ Audit logging for compliance
- ✅ Encrypted S3 document storage
- ✅ Presigned URLs for secure file access

## Development

### Database Commands

```bash
# Run migrations
pnpm prisma:migrate

# Seed sample data
pnpm prisma:seed

# View database GUI
pnpm prisma studio

# Generate Prisma client
pnpm prisma:generate

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset
```

### Testing Features

**Demo Accounts:**
- admin@carbonflow.com / admin123 (ADMIN)
- admin@globalsolutions.com / orgadmin123 (ORG_ADMIN)
- john.doe@globalsolutions.com / user123 (USER)

**Sample Data:**
- 2 organizations
- 15 projects
- 30+ documents
- 75+ metrics
- 20+ carbon credits

### Debugging

Debug logs use `console.log("[v0] message")` format:

```typescript
console.log("[v0] Dashboard metrics calculated:", metrics);
console.log("[v0] Error fetching projects:", error);
```

Check application logs for issues.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy automatically

### Docker

```bash
docker build -t carbonflow .
docker run -e DATABASE_URL="..." -p 3000:3000 carbonflow
```

### Self-Hosted

```bash
pnpm build
pnpm start
```

Production checklist in `SETUP.md`

## Documentation

- **SETUP.md** - Complete setup guide
- **IMPLEMENTATION.md** - Architecture and implementation details
- **ENV_SETUP.md** - Environment variables configuration

## Performance

- Server-side rendering reduces bundle
- Database indexes on frequent queries
- Presigned URLs avoid direct S3 access
- Prisma client pooling for connections
- Static generation where possible

## Scalability

- Multi-tenancy via organizationId
- Prepared for horizontal scaling
- Database connection pooling
- Audit logging for compliance
- Ready for API key management

## Next Steps

1. ✅ Seed sample data: `pnpm prisma:seed`
2. ✅ Start dev server: `pnpm dev`
3. ✅ Login with demo account
4. ✅ Explore projects and dashboard
5. Create new organization
6. Invite team members
7. Create carbon projects
8. Upload documents
9. Record impact metrics
10. Issue carbon credits

## Contributing

This is a production-ready application. For modifications:

1. Follow TypeScript best practices
2. Add Zod validation for new inputs
3. Implement audit logging for new operations
4. Test with sample data
5. Check database constraints

## Support

For issues:
1. Check logs: `console.log("[v0] ...")`
2. Verify environment variables
3. Check database connection
4. Review documentation files
5. Check middleware logs

## License

Built with v0 and Vercel technologies.

---

**Status**: Production-Ready MVP
**Last Updated**: June 1, 2026
**Version**: 1.0.0

Start building carbon-neutral projects today with CarbonFlow Intelligence Platform!
