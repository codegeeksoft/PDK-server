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
  ForeignKey
} from 'sequelize-typescript';
import { Retailer } from './retailer';

@Table
export class Tank extends Model<Tank> {
  @Column
  tankName: string;

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

  @ForeignKey(() => Retailer)
  retailerId: string;

  // @BelongsTo(() => Retailer)
  // retailer: Retailer;  
}
