import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthInfos } from 'src/core/decorators/auth-infos.decorator';
import { AuthDto } from '../auth/dto/auth.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @AuthInfos() authInfos: AuthDto,
  ) {
    return this.todoService.create(createTodoDto, authInfos.id);
  }

  @Get()
  findAll(@AuthInfos() authInfos: AuthDto) {
    return this.todoService.findAll(authInfos.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
