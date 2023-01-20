module.exports = (sequelize, dataType) => {
    const transaction = sequelize.define('transaction', {
        userId: {
            type: dataType.INTEGER,
            allowNull: false
        },

        reference: {
            type: dataType.STRING,
            allowNull: false
        },

        amount: {
            type: dataType.FLOAT,
            allowNull: false
        },

        status: {
            type: dataType.STRING,
        }
    });

    return transaction;
}