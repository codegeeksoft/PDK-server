/* jshint indent: 2 */
import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, HasMany, ForeignKey, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {Item} from './item';
@Table
export class Order extends Model<Order> {

 

  @PrimaryKey
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
  quantity: number;

  @Column(DataType.DOUBLE)
  amount: number;

  @Column
  discount: number;

  @Column(DataType.DOUBLE)
  totalAmount: number;

  @Column
  status: string;

  @Column
  userId: string;

  @CreatedAt
  @Column
  orderDate: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
/* 
  @ForeignKey(() => Item)
  @Column
  teamId: number; */
  
  @HasMany(() => Item)
  items: Item[];
}
