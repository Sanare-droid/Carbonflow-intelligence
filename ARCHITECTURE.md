# CarbonFlow AWS Architecture

## System Overview

CarbonFlow is a production-ready, enterprise-grade SaaS platform for carbon project management built on AWS and Vercel infrastructure. The architecture is designed for scalability, security, and performance.

## Architecture Layers

### 1. Client Layer
**Users / Web Browsers**
- Global users accessing the application
- Support for desktop and mobile browsers
- Real-time updates via WebSocket-ready infrastructure

### 2. Frontend Layer
**Vercel Hosting + Next.js Frontend**
- Deployed on Vercel's global CDN for low-latency access
- React 19 with TypeScript for type safety
- Server-side rendering (SSR) and static generation (SSG)
- Automatic deployments on GitHub push
- Edge Functions for request routing and authentication checks

### 3. Application Layer
**Next.js Server Actions + API Routes**

#### Server Actions
- User authentication (login, register, logout)
- Project CRUD operations
- Document management with S3 integration
- Impact metrics recording
- Carbon credit issuance and trading
- Organization and team management
- Audit logging for compliance

#### API Routes
- `/api/s3-upload` - Generate presigned URLs for secure file uploads
- `/api/health` - Health checks and monitoring
- `/api/webhooks` - Future webhook integrations

### 4. Authentication Layer
**JWT + Role-Based Access Control (RBAC)**

#### Authentication Flow
1. User credentials validated with bcryptjs (10 salt rounds)
2. JWT token issued and stored in HTTP-only secure cookies
3. Token includes user ID, organization ID, and role
4. Middleware validates token on each request
5. Role-based authorization gates access to resources

#### User Roles
- **ADMIN**: Full system access, user management
- **ORG_ADMIN**: Organization-level admin
- **USER**: Standard user with full project access
- **VIEWER**: Read-only access

#### Security Features
- HTTP-only secure cookies (HTTPS only in production)
- CSRF protection via middleware
- Input validation with Zod schemas
- SQL injection prevention via Prisma ORM
- Rate limiting ready (configurable)

### 5. Data Layer
**Amazon Aurora PostgreSQL**

#### Database Models
- **Users**: User accounts with roles and organization association
- **Organizations**: Multi-tenant organization support
- **Projects**: Carbon offset projects with detailed metadata
- **Documents**: Project documentation with S3 integration
- **ImpactMetrics**: Measurement data for impact tracking
- **CarbonCredits**: Credit issuance and tracking
- **Trades**: Credit trading transactions
- **RiskAssessments**: Project risk analysis
- **AuditLogs**: Compliance and audit trails

#### Performance Features
- Strategic indexes on frequently queried columns
- Connection pooling via Prisma
- Query optimization for dashboard aggregations
- Backup and point-in-time recovery enabled

### 6. Storage Layer
**Amazon S3**

#### File Management
- Secure file upload with presigned URLs
- Document versioning support
- Configurable access policies
- Lifecycle management for old objects

#### Supported Documents
- Project plans
- Methodology documents
- Monitoring reports
- Verification reports
- Audit reports
- Certificates

### 7. Analytics & Monitoring Layer
**CloudWatch + Custom Metrics**

#### Monitoring
- Application logs via CloudWatch
- Database performance metrics
- API response times and error rates
- Authentication success/failure rates
- S3 storage usage

#### Custom Dashboards
- Real-time project statistics
- KPI calculations from database
- Impact metrics aggregation
- Credit issuance tracking
- Team activity monitoring

#### Audit Logging
- Complete audit trail of all changes
- User action tracking
- Change history with before/after values
- Compliance reporting ready

## Data Flow Diagrams

### Authentication Flow
```
User Input → Login Page → Server Action
    ↓
Validate Credentials (bcryptjs)
    ↓
Generate JWT Token
    ↓
Set HTTP-only Cookie
    ↓
Redirect to Dashboard
    ↓
Middleware validates token on each request
```

### Project Creation Flow
```
User Form Input → Server Action (validateProjectInput)
    ↓
Check User Authorization (RBAC)
    ↓
Create Project in Aurora PostgreSQL
    ↓
Log Audit Event
    ↓
Return Project ID to Frontend
    ↓
Redirect to Project Details
```

### Document Upload Flow
```
User Selects File → Request Presigned URL (/api/s3-upload)
    ↓
Validate User & Project Access
    ↓
Generate S3 Presigned URL (15-minute expiry)
    ↓
Return URL to Frontend
    ↓
Client uploads directly to S3
    ↓
Create Document Record in Aurora
    ↓
Audit log entry
```

### Dashboard Metrics Flow
```
Dashboard Page (Server Component)
    ↓
getDashboardMetrics Server Action
    ↓
Query Aurora PostgreSQL:
  - COUNT(Projects by status)
  - SUM(estimatedCO2e)
  - SUM(verifiedCO2e)
  - COUNT(Credits by status)
  - COUNT(Metrics)
    ↓
Aggregate results
    ↓
Return to component
    ↓
Render dashboard with real-time data
```

## Scalability Considerations

### Horizontal Scaling
- **Frontend**: Vercel auto-scales based on traffic
- **Database**: Aurora auto-scaling read replicas
- **Storage**: S3 handles unlimited scale automatically

### Vertical Scaling
- Aurora can scale to larger instance types for increased compute
- Next.js can be deployed on larger Vercel instances

### Performance Optimization
- Database query optimization with indexes
- Caching strategies (browser cache, CDN cache)
- Image optimization via Vercel Image Optimization
- API response compression

## Security Best Practices

### Infrastructure
- HTTPS/TLS encryption in transit
- Encryption at rest (Aurora encryption, S3 encryption)
- VPC isolation (Aurora in private subnet)
- IAM roles with least privilege principle

### Application
- Input validation and sanitization
- SQL injection prevention via ORM
- XSS protection via React
- CSRF token validation
- Secure password hashing (bcryptjs)
- Session timeout after inactivity
- Audit logging for compliance

### Data Protection
- Role-based access control
- Organization-level data isolation
- Encrypted environment variables
- Secure secrets management

## Deployment Architecture

### Development
- Local Next.js dev server with hot reload
- Local PostgreSQL for development
- Environment variables from .env.local

### Staging
- Vercel Preview deployments on PR
- Staging Aurora instance
- Pre-production testing

### Production
- Vercel Production deployment
- Multi-region Aurora setup
- Auto-scaling and load balancing
- CloudWatch monitoring and alerts

## Cost Optimization

### Services Used
- **Vercel**: Pay-as-you-go for compute
- **Aurora PostgreSQL**: On-demand pricing, auto-pause for dev/test
- **S3**: Standard storage tier with lifecycle policies
- **CloudWatch**: Pay per metric and log volume

### Recommendations
- Enable S3 lifecycle policies for log retention
- Use Aurora auto-pause for non-production environments
- Implement query optimization to reduce database costs
- Monitor CloudWatch costs and adjust retention policies

## Future Enhancements

### Planned Additions
- Real-time notifications (SNS + WebSocket)
- Advanced analytics (QuickSight)
- Document processing (Textract)
- Machine learning predictions (SageMaker)
- CDN caching (CloudFront)
- Email notifications (SES)
- Mobile app (React Native + AWS Amplify)

### Scalability Roadmap
- GraphQL API for flexible queries
- Redis caching layer for frequently accessed data
- Elasticsearch for full-text search
- Lambda functions for async processing
- Event-driven architecture with EventBridge

## Monitoring & Observability

### Key Metrics
- Request latency (p50, p95, p99)
- Error rates by endpoint
- Database query performance
- S3 upload success rates
- Authentication success rates
- Audit log volume

### Alerting
- High error rate alerts
- Database performance degradation
- S3 access violations
- Authentication failures
- Cost threshold alerts

## Disaster Recovery

### Backup Strategy
- Aurora automatic backups (35-day retention)
- Point-in-time recovery enabled
- Cross-region backup replication
- S3 versioning enabled

### Recovery Time Objective (RTO)
- Less than 5 minutes for application failover
- Less than 15 minutes for database recovery

### Recovery Point Objective (RPO)
- Less than 1 minute for most data
- Less than 5 minutes for S3 objects

## Compliance & Governance

### Standards Supported
- SOC 2 (via AWS infrastructure)
- GDPR (data protection controls)
- CCPA (data retention policies)
- Industry-specific carbon accounting standards

### Audit Trail
- Complete action history
- User identification for all operations
- Timestamp and change tracking
- Compliance report generation ready

## Architecture Diagram

See `architecture-diagram.png` for visual representation of the complete AWS architecture.

---

**Last Updated**: 2026-06-01
**Status**: Production Ready
**Version**: 1.0
