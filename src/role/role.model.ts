import * as mongoose from 'mongoose';
import Role from './role.interface';

const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["globalManager", "manager", "regular"]
        },
        groupId: {
            ref: 'Group',
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }
);

const RoleModel = mongoose.model<Role & mongoose.Document>('Role', roleSchema);

export default RoleModel;

