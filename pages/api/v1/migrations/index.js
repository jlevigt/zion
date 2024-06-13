import migrator from "infra/migrator.js";

import errorHandler from "errors/errorHandler";

export default async function migrations(request, response) {
  try {
    switch (request.method) {
      case "GET":
        const pendingMigrations = await migrator.listPendingMigrations();
        return response.status(200).json(pendingMigrations);

      case "POST":
        const migratedMigrations = await migrator.runPendingMigrations();

        if (migratedMigrations.length > 0) {
          return response.status(201).json(migratedMigrations);
        }

        return response.status(200).json(migratedMigrations);

      default:
        return response.status(405).end();
    }
  } catch (err) {
    errorHandler(err, response);
  }
}
