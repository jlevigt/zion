import ForbiddenError from "errors/ForbiddenError";

const roles = {
  waiting: ["update:user:self", "delete:user:self"],
  guest: ["update:user:self", "delete:user:self", "read:meeting:list"],
  member: ["update:user:self", "delete:user:self", "read:meeting:list", "read:user:list"],
  leader: [
    "update:user:self",
    "delete:user:self",
    "read:meeting:list",
    "read:user:list",
    "create:meeting",
    "read:solicitation:list",
    "update:user:role",
    "delete:user",
  ],
};

function canRequest(user, feature) {
  const userPermissions = roles[user.role];

  if (!userPermissions.includes(feature)) {
    throw new ForbiddenError("Não possui permissão");
  }
}

function filterOutput(feature, output) {
  let filteredOutputValues = {};

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
