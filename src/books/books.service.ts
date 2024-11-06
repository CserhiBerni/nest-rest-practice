import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  private books: Book[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0451524935',
      publishYear: 1949,
      reserved: false,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0061120084',
      publishYear: 1960,
      reserved: false,
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      publishYear: 1925,
      reserved: false,
    },
  ];
  private nextId: number = this.books.length + 1;

  create(createBookDto: CreateBookDto) {
    const b: Book = {
      id: this.nextId,
      ...createBookDto,
      reserved: false,
    }

    this.books.push(b);
    return b;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find(book => book.id == id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const index = this.books.findIndex(book => book.id == id);
    if (index == -1) return undefined;

    const newBook = {
      ...this.books[index],
      ...updateBookDto,
    }

    this.books[index] = newBook;

    return newBook;
  }

  remove(id: number) {
    const index = this.books.findIndex(book => book.id == id)
    if (index == -1) {
      return false;
    }

    this.books.splice(index, 1);
    return true;
  }
}
