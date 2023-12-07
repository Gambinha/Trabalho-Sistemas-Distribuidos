import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto, userId: string) {
    return this.prisma.todoList.create({
      data: {
        description: createTodoDto.description,
        checked: false,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.todoList.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.todoList.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todoList.update({
      where: {
        id: id,
      },
      data: {
        description: updateTodoDto.description,
        checked: updateTodoDto.checked,
      },
    });
  }

  remove(id: string) {
    return this.prisma.todoList.delete({
      where: {
        id: id,
      },
    });
  }
}
