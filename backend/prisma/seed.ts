import { PrismaClient, RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar roles
  const roles = [
    {
      name: RoleName.VISITOR,
      permissions: {
        news: ['read'],
        documents: [],
        circulars: [],
      },
    },
    {
      name: RoleName.MEMBER,
      permissions: {
        news: ['read'],
        documents: ['read'],
        circulars: ['read'],
      },
    },
    {
      name: RoleName.DIRECTOR,
      permissions: {
        news: ['read', 'create', 'update'],
        documents: ['read', 'create', 'update'],
        circulars: ['read', 'create', 'update'],
        users: ['read'],
      },
    },
    {
      name: RoleName.ADMIN,
      permissions: {
        news: ['read', 'create', 'update', 'delete'],
        documents: ['read', 'create', 'update', 'delete'],
        circulars: ['read', 'create', 'update', 'delete'],
        users: ['read', 'create', 'update', 'delete'],
        roles: ['read', 'update'],
      },
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { permissions: role.permissions },
      create: role,
    });
    console.log(`✅ Role criada: ${role.name}`);
  }

  // Buscar role ADMIN
  const adminRole = await prisma.role.findUnique({
    where: { name: RoleName.ADMIN },
  });

  if (!adminRole) {
    throw new Error('Role ADMIN não encontrada');
  }

  // Criar usuário admin padrão
  const hashedPassword = await bcrypt.hash('Admin@123456', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ajucat.org.br' },
    update: {},
    create: {
      name: 'Administrador AJUCAT',
      email: 'admin@ajucat.org.br',
      password: hashedPassword,
      roleId: adminRole.id,
      active: true,
    },
  });

  console.log(`✅ Usuário admin criado: ${adminUser.email}`);

  // Criar role MEMBER para usuário de teste
  const memberRole = await prisma.role.findUnique({
    where: { name: RoleName.MEMBER },
  });

  if (memberRole) {
    const memberPassword = await bcrypt.hash('Member@123456', 12);
    await prisma.user.upsert({
      where: { email: 'membro@ajucat.org.br' },
      update: {},
      create: {
        name: 'Membro Teste',
        email: 'membro@ajucat.org.br',
        password: memberPassword,
        roleId: memberRole.id,
        active: true,
      },
    });
    console.log('✅ Usuário membro de teste criado: membro@ajucat.org.br');
  }

  console.log('🎉 Seed concluído com sucesso!');
  console.log('');
  console.log('Credenciais padrão:');
  console.log('  Admin: admin@ajucat.org.br / Admin@123456');
  console.log('  Membro: membro@ajucat.org.br / Member@123456');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
