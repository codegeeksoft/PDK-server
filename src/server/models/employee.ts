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
  HasOne,
  PrimaryKey
} from 'sequelize-typescript';
import { Retailer } from './retailer';
import { User } from './user';
import { employee } from '../routes/employeeRouter';

@Table
export class Employee extends Model<Employee> {

  @PrimaryKey
  @Column
  employeeId:string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @Column
  updatedBy: string;

  @ForeignKey(() => Retailer)
  retailerId: string;



  @ForeignKey(() => User)
  userId: string;

  //  @BelongsTo(() => Retailer)
  //  retailer: Retailer;
}
