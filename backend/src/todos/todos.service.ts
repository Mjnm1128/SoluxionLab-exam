import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(user: User, title: string) {
    const todo = this.todoRepository.create({ title, completed: false, user });
    return this.todoRepository.save(todo);
  }

  async findAll(user: User) {
    return this.todoRepository.find({ where: { user } });
  }

  async update(
    user: User,
    data: { id: number; title?: string; completed?: boolean },
  ) {
    const todo = await this.todoRepository.findOne({
      where: { id: data.id, user },
    });
    if (!todo) throw new Error('Todo not found');
    if (data.title !== undefined) todo.title = data.title;
    if (data.completed !== undefined) todo.completed = data.completed;
    return this.todoRepository.save(todo);
  }

  async delete(user: User, todoId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId, user },
    });
    if (!todo) throw new Error('Todo not found');
    return this.todoRepository.remove(todo);
  }
}
