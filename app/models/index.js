var DataTypes = require("sequelize").DataTypes;
var _members = require("./members");

function initModels(sequelize) {
  var members = _members(sequelize, DataTypes);

//   permissions.belongsToMany(roles, { as: 'role_id_roles', through: role_has_permissions, foreignKey: "permission_id", otherKey: "role_id" });
//   roles.belongsToMany(permissions, { as: 'permission_id_permissions', through: role_has_permissions, foreignKey: "role_id", otherKey: "permission_id" });
//   games.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
//   customers.hasMany(games, { as: "games", foreignKey: "customer_id"});
//   admins.belongsTo(groups, { as: "group", foreignKey: "group_id"});
//   groups.hasMany(admins, { as: "admins", foreignKey: "group_id"});
//   group_module.belongsTo(groups, { as: "group", foreignKey: "group_id"});
//   groups.hasMany(group_module, { as: "group_modules", foreignKey: "group_id"});
//   group_module.belongsTo(modules, { as: "module", foreignKey: "module_id"});
//   modules.hasMany(group_module, { as: "group_modules", foreignKey: "module_id"});
//   model_has_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
//   permissions.hasMany(model_has_permissions, { as: "model_has_permissions", foreignKey: "permission_id"});
//   role_has_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
//   permissions.hasMany(role_has_permissions, { as: "role_has_permissions", foreignKey: "permission_id"});
//   answers.belongsTo(questions, { as: "question", foreignKey: "question_id"});
//   questions.hasMany(answers, { as: "answers", foreignKey: "question_id"});
//   model_has_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
//   roles.hasMany(model_has_roles, { as: "model_has_roles", foreignKey: "role_id"});
//   role_has_permissions.belongsTo(roles, { as: "role", foreignKey: "role_id"});
//   roles.hasMany(role_has_permissions, { as: "role_has_permissions", foreignKey: "role_id"});

  return {
    members,
    // activitys,
    // admins,
    // answers,
    // chats,
    // customers,
    // faqs,
    // games,
    // group_module,
    // groups,
    // migrations,
    // model_has_permissions,
    // model_has_roles,
    // modules,
    // notifications,
    // password_resets,
    // permissions,
    // qas,
    // questions,
    // role_has_permissions,
    // roles,
    // rules,
    // users,
    // video_survey,
    // videos,
    // logs,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
