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
import { Employee } from './employee';
import { Function } from './function';
import { UserFunction } from './userFunction';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column
  userId: string;

  @Column
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column
  emailVerified: boolean;

  @Column
  mobileVerified: boolean;

  @Column
  status: string;

  @HasOne(() => Employee)
  employeeId: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @Column
  updatedBy: string;

  @BelongsToMany(() => Function, () => UserFunction, 'userId', 'functionId')
  functions: Function[];
}
