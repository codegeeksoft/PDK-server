/* jshint indent: 2 */
import {
  Table,
  Column,
  DataType,
  Model,
  CreatedAt,
  UpdatedAt,
  Unique,
  PrimaryKey,
  ForeignKey,
  HasOne,
  BelongsToMany
} from 'sequelize-typescript';
import { Function } from './function';
import { User } from './user';

@Table
export class UserFunction extends Model<UserFunction> {
  @ForeignKey(() => User)
  @Column
  userId: String;

  @ForeignKey(() => Function)
  @Column
  functionId: string;
}
