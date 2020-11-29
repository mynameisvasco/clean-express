const config = require("./config.json")

module.exports = {
    "type": config.db.type,
    "database": config.db.name,
    "entities": config.db.entities,
    "migrations": config.db.migrations,
    "cli": config.db.cli,
}