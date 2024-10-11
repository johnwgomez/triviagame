const User = require('./User');
const Score = require('./Score');

User.hasOne(Score, {
  foreignKey: 'player_id'
})

Score.belongsTo(User, {
  foreignKey: 'player_id'
})



module.exports = { User, Score };
