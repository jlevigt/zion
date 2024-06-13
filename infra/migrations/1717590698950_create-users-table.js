exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    username: {
      type: "VARCHAR(30)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "VARCHAR(254)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "VARCHAR(60)",
      notNull: true,
    },
    role: {
      type: "VARCHAR(10)",
      notNull: true,
      default: "waiting",
    },
    created_at: {
      type: "TIMESTAMP",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
