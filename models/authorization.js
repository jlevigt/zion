const roles = {
  leader: [
    "read:users:list",
    "update:user:role",
    "create:meeting",
    "read:meetings",
    "update:self",
    "delete:self",
    "read:solicitations",
  ],
  member: ["read:users:list", "read:meetings", "update:self", "delete:self"],
  guest: ["read:meetings", "update:self", "delete:self"],
  waiting: ["update:self", "delete:self"],
};

function canRequest(user, feature) {
  const userPermissions = roles[user.role];

  if (!userPermissions.includes(feature)) {
    throw new Error("Unauthorized");
  }
}

function filterOutput(user, feature, output) {
  let filteredOutputValues = {};

  if (feature === "read:user") {
    filteredOutputValues = {
      id: output.id,
      email: output.email,
      username: output.username,
      role: output.role,
      created_at: output.created_at,
    };
  }

  if (feature === "read:user:list") {
    filteredOutputValues = output.map((user) => ({
      username: user.username,
      role: user.role,
      created_at: user.created_at,
    }));
  }
  // Force the clean up of "undefined" values
  return JSON.parse(JSON.stringify(filteredOutputValues));
}

export default {
  canRequest,
  filterOutput,
};
