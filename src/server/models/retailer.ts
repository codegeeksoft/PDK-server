/* jshint indent: 2 */
import {
  Table,
  Column,
  DataType,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
  PrimaryKey
} from 'sequelize-typescript';
import { Tank } from './tank';
import { Employee } from './employee';

@Table
export class Retailer extends Model<Retailer> {
  @PrimaryKey
  @Column
  retailerId: string;

  @Column
  retailerName: string;

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

  @HasMany(() => Tank)
  tanks: Tank[];

  @HasMany(() => Employee)
  employees: Employee[];
}
