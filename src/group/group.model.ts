import * as mongoose from 'mongoose';
import Group from './group.interface';


const groupSchema = new mongoose.Schema(
    {
        name: String,
        collectionIds: [{
            ref: 'Collection',
            type: mongoose.Schema.Types.ObjectId,
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);

// userSchema.virtual('groupId', {
//     ref: 'Role',
//     localField: '_id',
//     foreignField: 'groupId',
// });

const groupModel = mongoose.model<Group & mongoose.Document>('Group', groupSchema);

export default groupModel;
