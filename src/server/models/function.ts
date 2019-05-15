/* jshint indent: 2 */
import {
  Table,
  Column,
  DataType,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  BelongsToMany
} from 'sequelize-typescript';
import { Module } from './module';
import { User } from './user';
import { UserFunction } from './userFunction';

@Table
export class Function extends Model<Function> {
  @PrimaryKey
  @Column
  functionId: string;

  @Column
  functionName: string;

  @Column
  businessType: string;

  @Column
  status: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @Column
  updatedBy: string;

  @ForeignKey(() => Module)
  moduleId: string;

  @BelongsToMany(() => User, () => UserFunction, 'userId', 'functionId')
  users: User[];

  // @BelongsTo(() => Retailer)
  // retailer: Retailer;
}
