import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { todo } from 'src/models';

@Module({
  imports: [SequelizeModule.forFeature([todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
