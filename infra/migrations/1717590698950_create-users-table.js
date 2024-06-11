exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    username: {
      type: "VARCHAR(60)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "VARCHAR(255)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "VARCHAR(60)",
      notNull: true,
    },
    role: {
      type: "VARCHAR(20)",
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
