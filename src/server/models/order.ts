/* jshint indent: 2 */
import {Table, Column, DataType, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Order extends Model<Order> {

  @Column
  orderId: string;

  @Column
  retailer: string;


  @Column
  depot: string;

  @Column
  transport: string;

  @Column
  supplier: string;

  @Column
  orderQuantity: number;

  @Column(DataType.DOUBLE('PRICE'))
  orderAmount: any;

  @Column
  status: string;

  @CreatedAt
  @Column
  orderDate: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}