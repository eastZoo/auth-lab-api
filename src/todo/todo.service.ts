import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TodoRepository } from './todo.repository';
import { todo } from 'src/models';

@Injectable()
export class TodoService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly todoRepository: TodoRepository,
  ) {}

  async addTodo(req: any) {
    const t = await this.seqeulize.transaction();
    const { title, contents } = req.body;
    const { userId } = req.user;
    try {
      await todo.create(
        {
          userId: userId,
          title: title,
          contents: contents,
        },
        { transaction: t },
      );

      await t.commit();
      return { msg: 'success' };
    } catch (error) {
      Logger.error(error);
      await t.rollback();
      throw new HttpException(error.response.message, 400);
    }
  }

  async getTodo(userId: string) {
    const t = await this.seqeulize.transaction();
    try {
      const result = await todo.findAll({
        where: {
          userId: userId,
        },
        order: [['created_at', 'desc']],
      });

      await t.commit();
      return result;
    } catch (error) {
      Logger.error(error);
      await t.rollback();
      throw new HttpException(error.response.message, 400);
    }
  }
}
