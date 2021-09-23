'use strict';


module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('to_dos', {
      to_do_id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING(1234)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('to_dos');
  }
};