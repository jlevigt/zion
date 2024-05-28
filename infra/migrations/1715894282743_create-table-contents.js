exports.up = (pgm) => {
  pgm.createTable("contents", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
    },

    owner_id: {
      type: "uuid",
      notNull: true,
      references: '"users"',
    },

    event_time: {
      type: "timestamptz",
      notNull: true,
    },

    location: {
      type: "varchar(100)",
      notNull: true,
    },

    title: {
      type: "varchar(60)",
      notNull: true,
    },

    description: {
      type: "text",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("contents");
};
