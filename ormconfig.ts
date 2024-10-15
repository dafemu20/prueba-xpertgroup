import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "prueba-xpert",
  useUnifiedTopology: true,
  entities: ["src/infrastructure/db/entities/**/*.ts"],
  synchronize: true, // No recomendado en producción
});
