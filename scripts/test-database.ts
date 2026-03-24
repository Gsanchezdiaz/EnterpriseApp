import "dotenv/config";
import prisma from "../lib/prisma";

async function testDatabase() {
  console.log("🔍 Testing Prisma Postgres connection...\n");

  try {
    // Test 1: simple connection check - try a lightweight query
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connected to database!");

    // Test 2: Create a test user
    const email = "demo@example.com";
    const name = "Demo User";

    console.log("\n📝 Checking if user exists...");
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      console.log("⚠️  User already exists:", existingUser);
    } else {
      console.log("👤 User not found, creating...");
      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: "admin123",
          role: "ADMIN"
        },
      });
      console.log("✅ Created user:", newUser);
    }

    // Test 3: Fetch all users
    console.log("\n📋 Fetching all users...");
    const allUsers = await prisma.user.findMany();
    console.log(`✅ Found ${allUsers.length} user(s):`);
    allUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });

    console.log("\n🎉 All tests passed! Your database is working perfectly.\n");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
