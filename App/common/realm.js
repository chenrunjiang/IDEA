import Realm from 'realm'

const IdeaSchema = {
    name: 'Idea',
    properties: {
        title: 'string',
        content: 'string',
        create_at: 'date',
        update_at: 'date',
    }
};
let realm = new Realm({schema: [IdeaSchema]});

export default realm;
