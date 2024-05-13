import migrationRunner from "node-pg-migrate";

import database from "infra/database.js";

const defaultConfigurations = {
  dir: "infra/migrations",
  direction: "up",
  migrationsTable: "pgmigrations",
  verbose: true,
};

async function listPendingMigrations() {
  const databaseClient = await database.getNewClient();

  try {
    const pendingMigrations = await migrationRunner({
      ...defaultConfigurations,
      dbClient: databaseClient,
      dryRun: true,
    });

    return pendingMigrations;
  } finally {
    await databaseClient.end();
  }
}

async function runPendingMigrations() {
  const databaseClient = await database.getNewClient();

  try {
    const migratedMigrations = await migrationRunner({
      ...defaultConfigurations,
      dbClient: databaseClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await databaseClient.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
