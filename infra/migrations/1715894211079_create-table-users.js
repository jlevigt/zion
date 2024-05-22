exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
    },

    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },

    password: {
      type: "varchar(60)",
      notNull: true,
    },

    is_admin: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
