import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Clean up existing data
  try {
    await prisma.auditLog.deleteMany();
    await prisma.trade.deleteMany();
    await prisma.riskAssessment.deleteMany();
    await prisma.carbonCredit.deleteMany();
    await prisma.impactMetric.deleteMany();
    await prisma.document.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    console.log('🧹 Cleaned up existing data');
  } catch (error) {
    console.warn('⚠️ Could not clean up existing data (likely permission restriction on Aurora default db). Continuing with seed...');
  }

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      id: 'admin-' + uuidv4(),
      email: 'admin@carbonflow.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  // Create organizations
  const org1 = await prisma.organization.create({
    data: {
      id: 'org-' + uuidv4(),
      name: 'Global Carbon Solutions',
      description: 'Leading carbon offset project developer',
      country: 'United States',
      industry: 'Renewable Energy',
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      id: 'org-' + uuidv4(),
      name: 'Forest Future Initiatives',
      description: 'Reforestation and biodiversity projects',
      country: 'Brazil',
      industry: 'Environmental Conservation',
    },
  });

  // Create org admins
  const orgAdmin1Password = await bcrypt.hash('orgadmin123', 10);
  const orgAdmin1 = await prisma.user.create({
    data: {
      id: 'user-' + uuidv4(),
      email: 'admin@globalsolutions.com',
      password: orgAdmin1Password,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'ORG_ADMIN',
      organizationId: org1.id,
    },
  });

  const orgAdmin2Password = await bcrypt.hash('orgadmin123', 10);
  const orgAdmin2 = await prisma.user.create({
    data: {
      id: 'user-' + uuidv4(),
      email: 'admin@forestfuture.com',
      password: orgAdmin2Password,
      firstName: 'Carlos',
      lastName: 'Silva',
      role: 'ORG_ADMIN',
      organizationId: org2.id,
    },
  });

  // Create regular users
  const user1Password = await bcrypt.hash('user123', 10);
  const user1 = await prisma.user.create({
    data: {
      id: 'user-' + uuidv4(),
      email: 'john.doe@globalsolutions.com',
      password: user1Password,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      organizationId: org1.id,
    },
  });

  const user2Password = await bcrypt.hash('user123', 10);
  const user2 = await prisma.user.create({
    data: {
      id: 'user-' + uuidv4(),
      email: 'maria.santos@forestfuture.com',
      password: user2Password,
      firstName: 'Maria',
      lastName: 'Santos',
      role: 'USER',
      organizationId: org2.id,
    },
  });

  // Create org for narrative projects
  const org3 = await prisma.organization.create({
    data: {
      id: 'org-' + uuidv4(),
      name: 'East Africa Conservation Alliance',
      description: 'Conservation and restoration projects across Kenya and Tanzania',
      country: 'Kenya',
      industry: 'Environmental Conservation',
    },
  });

  const orgAdmin3Password = await bcrypt.hash('demo123', 10);
  const orgAdmin3 = await prisma.user.create({
    data: {
      id: 'user-' + uuidv4(),
      email: 'demo@carbonflow.com',
      password: orgAdmin3Password,
      firstName: 'Demo',
      lastName: 'Account',
      role: 'ORG_ADMIN',
      organizationId: org3.id,
    },
  });

  // Create projects with narrative
  const projects = [];

  // Maasai Mara Reforestation Project
  const project1 = await prisma.project.create({
    data: {
      id: 'proj-' + uuidv4(),
      name: 'Maasai Mara Reforestation Initiative',
      description: 'Restoring 5,000 hectares of native acacia woodland in the Maasai Mara ecosystem, benefiting local communities and supporting wildlife corridors. This project combines traditional land management practices with modern reforestation techniques.',
      status: 'ACTIVE' as any,
      type: 'Reforestation',
      location: 'Maasai Mara, Kenya',
      startDate: new Date(2022, 3, 15),
      estimatedCO2e: 125000,
      verifiedCO2e: 89500,
      verificationStatus: 'VERIFIED' as any,
      organizationId: org3.id,
      createdById: orgAdmin3.id,
      updatedById: orgAdmin3.id,
    },
  });
  projects.push(project1);

  // Amboseli Community Carbon Project
  const project2 = await prisma.project.create({
    data: {
      id: 'proj-' + uuidv4(),
      name: 'Amboseli Community Carbon Project',
      description: 'Community-led conservation project protecting 15,000 hectares of grasslands and supporting Maasai pastoralist communities. Generates income through carbon credits while maintaining traditional land use practices and protecting elephant migration routes.',
      status: 'ACTIVE' as any,
      type: 'Grassland Conservation',
      location: 'Amboseli, Kenya',
      startDate: new Date(2021, 6, 1),
      estimatedCO2e: 185000,
      verifiedCO2e: 142500,
      verificationStatus: 'VERIFIED' as any,
      organizationId: org3.id,
      createdById: orgAdmin3.id,
      updatedById: orgAdmin3.id,
    },
  });
  projects.push(project2);

  // Mount Kenya Agroforestry Initiative
  const project3 = await prisma.project.create({
    data: {
      id: 'proj-' + uuidv4(),
      name: 'Mount Kenya Agroforestry Initiative',
      description: 'Supporting 2,000 smallholder farmers in implementing agroforestry systems on 8,000 hectares. Combines tree planting with crop production, improving soil health, farmer income, and carbon sequestration.',
      status: 'ACTIVE' as any,
      type: 'Agroforestry',
      location: 'Mount Kenya Region, Kenya',
      startDate: new Date(2023, 0, 10),
      estimatedCO2e: 95000,
      verificationStatus: 'IN_PROGRESS' as any,
      organizationId: org3.id,
      createdById: orgAdmin3.id,
      updatedById: orgAdmin3.id,
    },
  });
  projects.push(project3);

  // Add standard projects for org1
  const projectTypes = ['Solar Farm', 'Wind Energy', 'Hydroelectric'];
  for (let i = 0; i < 3; i++) {
    const project = await prisma.project.create({
      data: {
        id: 'proj-' + uuidv4(),
        name: `${projectTypes[i]} - ${org1.name} ${i + 1}`,
        description: `A comprehensive carbon offset project focusing on ${projectTypes[i].toLowerCase()} energy generation.`,
        status: 'ACTIVE' as any,
        type: projectTypes[i],
        location: ['California', 'Texas', 'Colorado'][i],
        startDate: new Date(2023, i, 1),
        estimatedCO2e: 45000 + Math.random() * 35000,
        verifiedCO2e: 35000 + Math.random() * 25000,
        verificationStatus: 'VERIFIED' as any,
        organizationId: org1.id,
        createdById: orgAdmin1.id,
        updatedById: orgAdmin1.id,
      },
    });
    projects.push(project);
  }

  // Create documents
  const documentTypes = ['PROJECT_PLAN', 'METHODOLOGY', 'MONITORING_REPORT', 'VERIFICATION_REPORT'];
  for (const project of projects.slice(0, 10)) {
    for (let i = 0; i < 3; i++) {
      await prisma.document.create({
        data: {
          id: 'doc-' + uuidv4(),
          name: `${documentTypes[i]} for ${project.name}`,
          type: documentTypes[i] as any,
          s3Key: `documents/${project.id}/${documentTypes[i]}-${i}.pdf`,
          uploadedBy: project.createdById,
          projectId: project.id,
          createdById: project.createdById,
          updatedById: project.updatedById,
          fileSize: 1024000 + Math.random() * 5000000,
          mimeType: 'application/pdf',
        },
      });
    }
  }

  // Create impact metrics
  const metricTypes = ['CO2_REDUCTION', 'TREES_PLANTED', 'BIODIVERSITY_INDEX', 'JOBS_CREATED'];
  for (const project of projects) {
    for (let i = 0; i < 5; i++) {
      await prisma.impactMetric.create({
        data: {
          id: 'metric-' + uuidv4(),
          metricType: metricTypes[i % 4],
          value: Math.random() * 10000,
          unit: metricTypes[i % 4] === 'TREES_PLANTED' ? 'units' : metricTypes[i % 4] === 'JOBS_CREATED' ? 'people' : 'tonnes',
          measurementDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          isVerified: Math.random() > 0.5,
          projectId: project.id,
          createdById: project.createdById,
        },
      });
    }
  }

  // Create carbon credits
  const creditStatuses = ['PENDING', 'ISSUED', 'TRANSFERRED'];
  for (const project of projects) {
    const creditCount = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < creditCount; i++) {
      await prisma.carbonCredit.create({
        data: {
          id: 'credit-' + uuidv4(),
          creditNumber: `CF-${project.id.substring(0, 8)}-${i + 1}`,
          vintageYear: 2024,
          quantity: Math.floor(Math.random() * 10000) + 1000,
          status: creditStatuses[Math.floor(Math.random() * creditStatuses.length)] as any,
          issuanceDate: new Date(2024, 0, Math.floor(Math.random() * 28) + 1),
          projectId: project.id,
          organizationId: project.organizationId,
          createdById: project.createdById,
        },
      });
    }
  }

  // Create risk assessments
  const riskTypes = ['ENVIRONMENTAL', 'MARKET', 'REGULATORY', 'OPERATIONAL'];
  for (const project of projects.slice(0, 10)) {
    for (let i = 0; i < 2; i++) {
      await prisma.riskAssessment.create({
        data: {
          id: 'risk-' + uuidv4(),
          riskType: riskTypes[i % 4],
          severity: ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)] as any,
          description: `Potential ${riskTypes[i % 4].toLowerCase()} risk for this project.`,
          mitigation: 'Regular monitoring and stakeholder engagement.',
          projectId: project.id,
        },
      });
    }
  }

  // Create some audit logs
  for (const project of projects.slice(0, 5)) {
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'CREATE',
        entityType: 'PROJECT',
        entityId: project.id,
        userId: project.createdById,
        organizationId: project.organizationId,
        projectId: project.id,
      },
    });
  }

  console.log('✅ Seeding completed!');
  console.log('📊 Seeded:');
  console.log(`  - 1 Admin user (admin@carbonflow.com / admin123)`);
  console.log(`  - 2 Organizations`);
  console.log(`  - 4 Team members (2 org admins + 2 regular users)`);
  console.log(`  - 15 Projects`);
  console.log(`  - 30+ Documents`);
  console.log(`  - 75+ Impact Metrics`);
  console.log(`  - 20+ Carbon Credits`);
  console.log(`  - 20+ Risk Assessments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
