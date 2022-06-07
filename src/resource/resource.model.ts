import * as mongoose from 'mongoose';
import Resource from './resource.interface';


const resourceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, //  Example: User
        slug: { type: String, required: true }, //Example: User
        resources_roles: [{
          role_name: { type:  String, ref : 'Role', field: 'name' }, // Example: user
          create: { type: Boolean },
          delete: { type: Boolean }, 
          update: { type: Boolean }, 
          read: { type: Boolean }, 
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);

const resourceModel = mongoose.model<Resource & mongoose.Document>('Resource', resourceSchema);

export default resourceModel;
