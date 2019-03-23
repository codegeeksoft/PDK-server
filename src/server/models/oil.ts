/* jshint indent: 2 */
import {Table, Column, DataType, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Oil extends Model<Oil> {

  @Column
  oilType: string;

  @Column
  oilCode: string;

  @Column(DataType.DOUBLE('PRICE'))
  price: number;

  @Column
  maxQuantity: number;

  @Column
  availableQuantity: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}