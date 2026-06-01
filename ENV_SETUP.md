# Environment Variables Setup Guide

This guide covers setting up all required environment variables for CarbonFlow.

## Quick Start

1. Copy the template:
```bash
cp .env.example .env.local
```

2. Update with your actual values

3. Verify all required variables are set

## Database Configuration

### PostgreSQL (Aurora PostgreSQL Recommended)

**Environment Variable:**
```
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
```

**For Local PostgreSQL:**
```bash
# Create database
createdb carbonflow

# Set environment variable
DATABASE_URL="postgresql://localhost:5432/carbonflow"
```

**For AWS Aurora PostgreSQL:**
```bash
# Get cluster endpoint from AWS console
DATABASE_URL="postgresql://[username]:[password]@[aurora-cluster-endpoint]:5432/[database-name]"
```

**For Neon (PostgreSQL Cloud):**
```bash
# From Neon dashboard
DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[database]?sslmode=require"
```

**For Vercel Postgres (if using):**
```bash
# From Vercel dashboard
DATABASE_URL="postgres://[...connection-string...]"
```

### Testing Database Connection

```bash
# Test with psql
psql $DATABASE_URL -c "SELECT 1"

# Test with Prisma
pnpm prisma validate

# View database
pnpm prisma studio
```

## Authentication Configuration

### JWT Secret

**Environment Variable:**
```
JWT_SECRET="your-super-secret-key-change-this"
```

**Generate Secure Secret:**

On macOS/Linux:
```bash
openssl rand -base64 32
```

On Windows (PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {[byte](Get-Random -Max 256)}))
```

Online generator:
- https://www.random.org/bytes/ (generate 32 bytes, convert to base64)
- https://generate-random.org/ (text mode, 32 characters)

**Important:** 
- Use a cryptographically secure random value
- Store securely in production
- Change immediately if exposed
- Never commit to version control

### Token Expiration

**Environment Variable:**
```
JWT_EXPIRES_IN="7d"
```

**Common Values:**
- `7d` - 7 days (default, recommended for web)
- `1d` - 1 day (more secure)
- `14d` - 14 days (less secure)
- `24h` - 24 hours
- `30m` - 30 minutes (for testing)

## AWS S3 Configuration

### Required AWS Credentials

**Environment Variables:**
```
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="carbonflow-documents"
```

### Setup AWS S3

**1. Create S3 Bucket:**
```bash
aws s3 mb s3://carbonflow-documents --region us-east-1
```

**2. Create IAM User with S3 Access:**
```bash
# Create user
aws iam create-user --user-name carbonflow-app

# Create access key
aws iam create-access-key --user-name carbonflow-app

# Attach policy
aws iam attach-user-policy \
  --user-name carbonflow-app \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
```

**3. Get Credentials:**
The `create-access-key` command returns:
- AccessKeyId → AWS_ACCESS_KEY_ID
- SecretAccessKey → AWS_SECRET_ACCESS_KEY

**4. Bucket Policy (for presigned URLs):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/carbonflow-app"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::carbonflow-documents",
        "arn:aws:s3:::carbonflow-documents/*"
      ]
    }
  ]
}
```

### AWS Regions

Popular regions:
- `us-east-1` - N. Virginia
- `us-west-2` - Oregon
- `eu-west-1` - Ireland
- `ap-southeast-1` - Singapore
- `ap-northeast-1` - Tokyo

## Application Configuration

### Environment Type

**Environment Variable:**
```
NODE_ENV="development"
```

**Options:**
- `development` - Local development (verbose logging)
- `production` - Production deployment (minimal logging)

### Application URL

**Environment Variable:**
```
NEXTAUTH_URL="http://localhost:3000"
```

**Local Development:**
```
NEXTAUTH_URL="http://localhost:3000"
```

**Production:**
```
NEXTAUTH_URL="https://yourdomain.com"
```

## Complete .env.local Example

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/carbonflow"

# Authentication
JWT_SECRET="abcd1234efgh5678ijkl9012mnop3456qrst"
JWT_EXPIRES_IN="7d"

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_S3_BUCKET="carbonflow-documents"

# Application
NODE_ENV="development"
NEXTAUTH_URL="http://localhost:3000"
```

## Verification Checklist

After setting environment variables:

- [ ] DATABASE_URL connects successfully
- [ ] JWT_SECRET is set to secure random value
- [ ] AWS credentials are valid
- [ ] S3 bucket exists and is accessible
- [ ] Region matches bucket location
- [ ] NODE_ENV matches deployment target
- [ ] NEXTAUTH_URL matches your domain

**Test Database:**
```bash
pnpm prisma validate
```

**Test S3:**
```bash
# This will be tested when uploading documents
# In API route: /api/s3-upload
```

**View Environment:**
```bash
echo $DATABASE_URL
echo $JWT_SECRET
```

## Common Issues

### "DATABASE_URL not found"
**Problem:** Environment variable not loaded
**Solution:** 
- Ensure `.env.local` exists in project root
- Run `source .env.local` (bash/zsh)
- Restart dev server: `pnpm dev`

### "PrismaClientInitializationError"
**Problem:** Database connection failed
**Solution:**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check credentials are correct
- Test: `psql $DATABASE_URL`

### "AWS S3 access denied"
**Problem:** Invalid credentials or permissions
**Solution:**
- Verify AWS_ACCESS_KEY_ID
- Verify AWS_SECRET_ACCESS_KEY
- Check IAM policy allows S3 access
- Ensure bucket name matches

### "Invalid JWT token"
**Problem:** Session/token issues
**Solution:**
- Clear cookies: DevTools → Application → Cookies
- Login again
- Check JWT_SECRET hasn't changed

## Production Environment Setup

### Using Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Go to Project Settings → Environment Variables
4. Add all variables from `.env.example`
5. Deploy

### Using Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
ENV NODE_ENV=production
CMD ["pnpm", "start"]
```

Build and run:
```bash
docker build -t carbonflow .
docker run -e DATABASE_URL="..." -p 3000:3000 carbonflow
```

### Using Cloud Platforms

**Heroku:**
```bash
heroku config:set DATABASE_URL="postgresql://..."
heroku config:set JWT_SECRET="..."
# ... etc
```

**Railway.app:**
- Add environment variables in dashboard
- Connect to database plugin

**Fly.io:**
```bash
fly secrets set DATABASE_URL="..."
fly secrets set JWT_SECRET="..."
```

## Security Best Practices

1. **Never commit .env.local to Git**
   - Add to .gitignore
   - Keep credentials private

2. **Use strong JWT_SECRET**
   - Minimum 32 characters
   - Use cryptographically secure random value
   - Rotate periodically

3. **Protect AWS Credentials**
   - Use IAM roles when possible
   - Limit permissions to necessary S3 bucket
   - Rotate access keys regularly
   - Monitor usage

4. **Production Database**
   - Use SSL/TLS connections
   - Enable encryption at rest
   - Use secure passwords
   - Enable audit logging
   - Regular backups

5. **Secure NEXTAUTH_URL**
   - Use HTTPS in production
   - Match your actual domain
   - Enable secure cookies

## Monitoring Environment Variables

Check what's loaded:
```javascript
// In your code
console.log("[v0] Environment loaded:", {
  hasDatabase: !!process.env.DATABASE_URL,
  hasJWT: !!process.env.JWT_SECRET,
  hasAWS: !!process.env.AWS_ACCESS_KEY_ID,
  nodeEnv: process.env.NODE_ENV,
});
```

All variables are available in:
- Server Components
- Server Actions
- API Routes
- Middleware

Client-side variables must be prefixed with `NEXT_PUBLIC_`.

---

**Last Updated**: June 1, 2026
