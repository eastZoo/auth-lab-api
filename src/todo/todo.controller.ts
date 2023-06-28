import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/')
  addTodo(@Req() req) {
    return this.todoService.addTodo(req);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/')
  getTodo(@Req() req) {
    const { userId } = req.user;
    return this.todoService.getTodo(userId);
  }
}
