import * as mongoose from 'mongoose';
import Collection from './collection.interface';


const collectionSchema = new mongoose.Schema(
    {
        name: String,
        group: {
            ref: 'Group',
            type: mongoose.Schema.Types.ObjectId,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);
const collectionModel = mongoose.model<Collection & mongoose.Document>('Collection', collectionSchema);

export default collectionModel;
