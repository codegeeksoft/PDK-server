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
  PrimaryKey,
  ForeignKey,
  IsUUID
} from 'sequelize-typescript';
import { Order } from './order';
@Table
export class Item extends Model<Item> {

  @Column
  oilType: string;

  @Column
  oilCode: string;

  @Column
  quantity: number;

  @Column
  amount: number;

  @ForeignKey(() => Order)
  @Column
  orderId: string;

  /* @BelongsTo(() => Order)
  order: Order; */
}
