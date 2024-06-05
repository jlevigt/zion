exports.up = (pgm) => {
  pgm.createTable("solicitations", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "UUID",
      references: "users(id)",
      onDelete: "CASCADE",
    },
    status: {
      type: "VARCHAR(255)",
      notNull: true,
      default: "pending_analysis",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("solicitations");
};
