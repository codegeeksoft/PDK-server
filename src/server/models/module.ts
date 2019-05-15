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
import { Function } from './function';


@Table
export class Module extends Model<Module> {
  @PrimaryKey
  @Column
  moduleId: string;

  @Column
  moduleName: string;

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

  @HasMany(() => Function)
  functions: Function[];

}
