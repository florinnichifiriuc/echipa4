Schemas = {};
if (Meteor.isClient) {
    Template.registerHelper("Schemas", Schemas);
}

Schemas.voteSession = new SimpleSchema(
    {

        name: {
            type: String
        },
        vote: {
            type: Number
        },
        voteRound: {
            type: Number
        },

        planningSessionId: {
            type: String
        },
        taskId: {
            type: String
        },
        createdAt: {
            type: Date
        }
    }
);


var Collections = {};
if (Meteor.isClient) {
    Template.registerHelper("Collections", Collections);
}
voteSessions = Collections.voteSessions = new Mongo.Collection("voteSessions");
voteSessions.attachSchema(Schemas.voteSession);
if (Meteor.isServer) {
    Meteor.publish("voteSessions", function (planningSessionId, taskId) {
        return voteSessions.find({planningSessionId: planningSessionId, taskId: taskId});
    });
}
voteSessions.allow({
    insert: function () {
        return true;
    },
    remove: function (userId, doc) {
        return userId == doc.createdBy;
    },
    update: function () {
        return false;
    }
});


