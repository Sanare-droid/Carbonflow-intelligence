# CarbonFlow Intelligence Platform - Setup Guide

## Overview

CarbonFlow is a full-stack enterprise SaaS platform for managing carbon offset projects, tracking impact metrics, and trading carbon credits. This guide covers the complete setup and deployment process.

## Tech Stack

- **Frontend**: Next.js 16 with React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js App Router, Server Actions, API Routes
- **Database**: PostgreSQL (Aurora PostgreSQL recommended)
- **ORM**: Prisma
- **Authentication**: JWT-based with bcrypt password hashing
- **File Storage**: AWS S3
- **Validation**: Zod

## Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- PostgreSQL database (local or cloud)
- AWS S3 bucket (for document storage)
- Environment variables configured

## Installation

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Update the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/carbonflow"

# Authentication
JWT_SECRET="your-super-secret-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="carbonflow-documents"

# Environment
NODE_ENV="development"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup Database

#### Create Database (PostgreSQL)

```bash
createdb carbonflow
```

#### Run Migrations

```bash
pnpm prisma:migrate
```

This will:
- Create all database tables
- Set up relationships and indexes
- Initialize the schema

#### Seed Data (Development)

```bash
pnpm prisma:seed
```

This creates:
- 1 admin user (admin@carbonflow.com / admin123)
- 2 organizations with team members
- 15 sample projects
- 30+ documents
- 75+ impact metrics
- 20+ carbon credits
- Risk assessments and audit logs

## Running the Application

### Development

```bash
pnpm dev
```

Application runs on `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

## Database Schema

### Core Models

**Users**
- Email-based authentication with bcrypt hashing
- Roles: ADMIN, ORG_ADMIN, USER, VIEWER
- Organization membership for multi-tenancy

**Organizations**
- Contains projects and team members
- Isolated data per organization

**Projects**
- Carbon offset/reduction projects
- Track estimated and verified CO₂e
- Support multiple project types
- Verification status tracking

**Documents**
- Store project-related documents in S3
- Types: PROJECT_PLAN, METHODOLOGY, MONITORING_REPORT, etc.
- Presigned URLs for secure access

**Impact Metrics**
- Record project impact (CO₂ reduction, trees planted, etc.)
- Verification tracking
- Measurement date and values

**Carbon Credits**
- Generated from projects
- Track vintage year and status
- Support trading between organizations

**Trades**
- Track carbon credit transfers
- From/to organization tracking
- Pricing information

**Risk Assessment**
- Identify and track project risks
- Severity levels: HIGH, MEDIUM, LOW
- Mitigation tracking

**Audit Logs**
- Complete audit trail of all actions
- User tracking
- Change history

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### S3 Integration
- `POST /api/s3-upload` - Generate presigned URL for file uploads

### Health Check
- `GET /api/health` - Database connectivity check

## Server Actions

### Authentication (`app/actions/auth.ts`)
- `login(email, password)` - Authenticate user
- `register(formData)` - Create new account and organization
- `logout()` - Clear session
- `getCurrentUser()` - Get current user from session

### Projects (`app/actions/projects.ts`)
- `getProjects(organizationId)` - List organization projects
- `getProjectById(projectId)` - Get project details
- `createProject(organizationId, data)` - Create new project
- `updateProject(projectId, data)` - Update project
- `deleteProject(projectId)` - Delete project
- `getDashboardMetrics(organizationId)` - Calculated KPIs

### Documents (`app/actions/documents.ts`)
- `createDocument(projectId, data)` - Upload document metadata
- `getProjectDocuments(projectId)` - List project documents
- `deleteDocument(documentId)` - Remove document

### Metrics (`app/actions/metrics.ts`)
- `createMetric(projectId, data)` - Record impact metric
- `getProjectMetrics(projectId)` - List metrics
- `verifyMetric(metricId)` - Mark as verified
- `deleteMetric(metricId)` - Remove metric

### Credits (`app/actions/credits.ts`)
- `createCredit(projectId, organizationId, data)` - Issue credits
- `getProjectCredits(projectId)` - List project credits
- `getOrganizationCredits(organizationId)` - List all org credits
- `issueCredit(creditId)` - Update status to ISSUED
- `retireCredit(creditId)` - Retire credits
- `deleteCredit(creditId)` - Remove credit

## Authentication & Security

### JWT Token

Tokens are stored in HTTP-only cookies and include:
- User ID
- Email
- Organization ID
- Role

Token expiration is configurable via `JWT_EXPIRES_IN`.

### Password Hashing

Passwords are hashed using bcryptjs with 10 salt rounds before storage.

### Protected Routes

Dashboard routes (`/dashboard/*`) are protected by middleware. Unauthenticated requests redirect to `/auth/login`.

### Role-Based Access

Implement RBAC in server actions:

```typescript
if (session.role !== 'ORG_ADMIN') {
  return { error: 'Unauthorized' };
}
```

## File Upload (S3)

### Generate Presigned URL

```typescript
const response = await fetch('/api/s3-upload', {
  method: 'POST',
  body: JSON.stringify({
    fileName: 'document.pdf',
    fileType: 'application/pdf',
    projectId: 'proj-123',
  }),
});
const { uploadUrl, key } = await response.json();
```

### Upload File

```typescript
const file = new File(['content'], 'document.pdf');
await fetch(uploadUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': 'application/pdf' },
});
```

## Folder Structure

```
app/
├── actions/              # Server actions
│   ├── auth.ts          # Authentication actions
│   ├── projects.ts      # Project CRUD
│   ├── documents.ts     # Document management
│   ├── metrics.ts       # Impact metrics
│   └── credits.ts       # Carbon credits
├── api/                 # API routes
│   ├── s3-upload/       # Presigned URL generation
│   └── health/          # Health check
├── auth/                # Authentication pages
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── dashboard/           # Protected dashboard
│   ├── layout.tsx       # Sidebar + nav layout
│   ├── page.tsx         # Main dashboard
│   ├── projects/        # Project management
│   ├── documents/       # Document management
│   ├── verification/    # Verification tracking
│   ├── risk/            # Risk assessment
│   ├── impact/          # Community impact
│   ├── credits/         # Carbon credits
│   ├── team/            # Team management
│   ├── marketplace/     # Credit marketplace
│   └── settings/        # Organization settings
└── page.tsx             # Landing page

components/
├── layout/
│   ├── sidebar.tsx      # Navigation sidebar
│   └── top-nav.tsx      # Top navigation bar
└── ui/                  # shadcn/ui components

lib/
├── auth.ts              # Auth utilities
├── db.ts                # Prisma client
├── validations.ts       # Zod schemas
└── mock-data.ts         # Development mock data

prisma/
├── schema.prisma        # Database schema
└── seed.ts              # Seed data script

middleware.ts           # Request authentication
```

## Demo Credentials

After seeding, use these credentials to test:

- **Admin**: admin@carbonflow.com / admin123
- **Org Admin**: admin@globalsolutions.com / orgadmin123
- **User**: john.doe@globalsolutions.com / user123

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in project settings
4. Run migrations: `pnpm prisma:migrate:deploy`
5. Deploy

### Database Migration on Deployment

```bash
prisma migrate deploy
```

Use this instead of `prisma:migrate` in production to apply migrations without prompts.

## Troubleshooting

### Database Connection Errors

```bash
# Test connection
pnpm prisma validate

# Check URL format
echo $DATABASE_URL
```

### Seed Data Issues

```bash
# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Rebuild Prisma client
pnpm prisma generate
```

### Missing Modules

```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Development Tips

### Generate Prisma Client

```bash
pnpm prisma:generate
```

### View Database

```bash
pnpm prisma studio
```

Opens Prisma Studio at `http://localhost:5555` to browse data.

### Debug Queries

Set `log` in `lib/db.ts`:

```typescript
new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

## Environment Checklist

- [ ] DATABASE_URL configured and tested
- [ ] JWT_SECRET set to secure random value
- [ ] AWS credentials configured
- [ ] S3 bucket created and accessible
- [ ] Node environment set (development/production)
- [ ] Migrations run successfully
- [ ] Seed data loaded (development only)
- [ ] Auth pages accessible
- [ ] Dashboard protected
- [ ] Upload functionality working

## Next Steps

1. Run seed data: `pnpm prisma:seed`
2. Start development: `pnpm dev`
3. Login with demo account
4. Explore features
5. Customize for your needs
6. Configure production environment
7. Deploy to production

## Support

For issues or questions:
1. Check application logs: `console.log("[v0] message")`
2. Verify database connection
3. Check environment variables
4. Review Prisma error messages
5. Check middleware logs

---

**Last Updated**: 2026-06-01
**Version**: 1.0.0
