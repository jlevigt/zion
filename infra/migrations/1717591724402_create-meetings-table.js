exports.up = (pgm) => {
  pgm.createTable("meetings", {
    id: {
      type: "SERIAL",
      primaryKey: true,
    },
    day: {
      type: "DATE",
      notNull: true,
      unique: true,
    },
    time: {
      type: "TIME",
      notNull: true,
    },
    location: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    theme: {
      type: "TEXT",
    },
    created_at: {
      type: "TIMESTAMP",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("meetings");
};
