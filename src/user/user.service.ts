import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/database/models/user.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: User): Promise<UserDocument> {
    const user = await this.userModel.create({
      ...data,
    });
    return user;
  }

  async updateUser(
    id: mongoose.Types.ObjectId,
    data: Partial<User>,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate({ _id: id }, { ...data });
  }

  async deleteUser(id: mongoose.Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id);
  }

  async findUserById(
    id: mongoose.Types.ObjectId,
  ): Promise<UserDocument | null> {
    return this.userModel.findById(id).lean();
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email });
  }
}
