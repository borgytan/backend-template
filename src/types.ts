export default {

    // features
    CreateUser: Symbol.for('CreateUser'),

    // services
    UserDataSource: Symbol.for('UserDataSource'),

    DateService: Symbol.for('DateService'),
    JwtService: Symbol.for('JwtService'),

    Bcrypt: Symbol.for('Bcrypt'),
    MongoConnection: Symbol.for('MongoConnection'),

    UserCollection: Symbol.for('UserCollection'),
};
