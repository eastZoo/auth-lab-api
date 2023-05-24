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
  id?: string;
  password?: Uint8Array;
  created_at?: Date;
}

@Table({ tableName: 'user', timestamps: false })
export class user
  extends Model<userAttributes, userAttributes>
  implements userAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(100) })
  @Index({ name: 'user_pkey', using: 'btree', unique: true })
  oid!: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  id?: string;

  @Column({ allowNull: true, type: DataType.BLOB })
  password?: Uint8Array;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  created_at?: Date;
}
