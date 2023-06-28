import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface todoAttributes {
  id?: number;
  userId?: string;
  title?: string;
  contents?: string;
  createdAt?: Date;
}

@Table({ tableName: 'todo', timestamps: false })
export class todo
  extends Model<todoAttributes, todoAttributes>
  implements todoAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  userId?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  title?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  contents?: string;

  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;
}
