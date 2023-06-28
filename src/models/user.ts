import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface userAttributes {
  oid: string;
  userId?: string;
  password?: Uint8Array;
  name?: string;
  createdAt?: Date;
}

@Table({ tableName: 'user', timestamps: false })
export class user
  extends Model<userAttributes, userAttributes>
  implements userAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(100) })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  oid!: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  @Index({ name: 'userId_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  userId?: string;

  @Column({ allowNull: true, type: DataType.BLOB })
  password?: Uint8Array;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  name?: string;

  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;
}
