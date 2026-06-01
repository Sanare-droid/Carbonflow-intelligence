import { z } from 'zod';

// Auth
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  organizationName: z.string().min(1, 'Organization name is required'),
});

// Projects
export const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  type: z.string().min(1, 'Project type is required'),
  location: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  estimatedCO2e: z.number().positive('Must be a positive number'),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

// Documents
export const CreateDocumentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  type: z.enum(['PROJECT_PLAN', 'METHODOLOGY', 'MONITORING_REPORT', 'VERIFICATION_REPORT', 'AUDIT', 'CERTIFICATE', 'OTHER']),
  s3Key: z.string(),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
});

// Impact Metrics
export const CreateMetricSchema = z.object({
  metricType: z.string().min(1, 'Metric type is required'),
  value: z.number().positive('Value must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  measurementDate: z.date(),
});

// Carbon Credits
export const CreateCreditSchema = z.object({
  quantity: z.number().positive('Quantity must be positive'),
  vintageYear: z.number().int().min(2000).max(2100),
});

// Risk Assessment
export const CreateRiskSchema = z.object({
  riskType: z.string().min(1, 'Risk type is required'),
  severity: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  description: z.string().min(1, 'Description is required'),
  mitigation: z.string().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type CreateDocumentInput = z.infer<typeof CreateDocumentSchema>;
export type CreateMetricInput = z.infer<typeof CreateMetricSchema>;
export type CreateCreditInput = z.infer<typeof CreateCreditSchema>;
export type CreateRiskInput = z.infer<typeof CreateRiskSchema>;
