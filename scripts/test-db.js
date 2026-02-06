import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "../database/mongoose.ts";

async function testDatabaseConnection() {
  console.log("Testing database connection...");

  try {
    // Connect to MongoDB using the helper function
    console.log("⏳ Connecting to MongoDB...");
    await connectToDatabase();

    console.log("✅ Successfully connected to MongoDB!");
    console.log(`Database: ${mongoose.connection.db.databaseName}`);
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(
      `State: ${mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"}`,
    );

    // Test a simple operation
    console.log("\n⏳ Testing database operation...");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`✅ Found ${collections.length} collection(s)`);

    // Disconnect
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
    console.log("\n✨ All tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection test failed:");
    console.error(error.message);
    process.exit(1);
  }
}

testDatabaseConnection();
