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
      references: "users(id)",
      notNull: true,
    },

    event_time: {
      type: "timestamptz",
      notNull: true,
    },

    localtion: {
      type: "varchar(100)",
      notNull: true,
    },

    title: {
      type: "varchar(60)",
      notNull: true,
    },

    description: {
      type: "text",
      notNull: false,
    },

    created_at: {
      type: "timestampz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {};
