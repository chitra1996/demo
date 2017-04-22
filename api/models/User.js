/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    tableName: 'demo',
    autoUpdatedAt: false,
    autoCreatedAt: false,
    autoPK: false,
    attributes: {
      username: {
        type: "string",
        required: true
      },

      password: {
        type: "string",
        required: true
      },
      age: {
        type: "integer",
        required: "false"
      },
      email: {
          type: "string",
          required: false
      }
    }
};
