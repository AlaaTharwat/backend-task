import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        role: [{
            ref: 'Role',
            type: mongoose.Schema.Types.ObjectId,
        }],
        password: {
            type: String
        },
        isDeleted: {
            type: String
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
