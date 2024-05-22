exports.up = (pgm) => {
  pgm.createTable("contents", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    owner_id: {
      type: "uuid",
      references: "users(id)",
      notNull: false,
    },

    title: {
      type: "varchar",
      check: "length(title) <= 256",
      notNull: false,
    },

    body: {
      type: "text",
      check: "length(body) <= 20000",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
