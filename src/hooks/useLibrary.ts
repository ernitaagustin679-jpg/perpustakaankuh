import { useState, useEffect } from 'react';
import { Book, UserActivity, BorrowRecord } from '../types';

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    description: 'A story of wealth, love, and the American Dream.',
    coverImage: 'https://images.unsplash.com/photo-1543005814-14b24e777ea1?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.5,
    tags: ['Classic', 'Fiction'],
    pdfUrl: 'https://1drv.ms/i/c/A95EB84DE78AEDA3/IQClfSlZNGYyQ4SSI8ESsE3EAWzxU0BqBUfrI0b8JQPV9sQ?e=NC5zzL'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.8,
    tags: ['Self-Help', 'Productivity']
  },
   {
    id: '3',
    title: 'Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    description: 'A journey through space and time.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.9,
    tags: ['Science', 'Cosmology']
  },
  {
    id: '4',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    description: 'A deep dive into the systems that drive our thoughts.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.7,
    tags: ['Psychology', 'Behavioral Science']
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    description: 'The epic story of Arrakis and the struggle for power.',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.8,
    tags: ['Sci-Fi', 'Epic']
  },
  {
    id: '6',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Adventure',
    description: 'A shepherd boy travels in search of treasure and finds his legend.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.6,
    tags: ['Adventure', 'Fiction']
  }
];

export function useLibrary() {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('lib_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [borrows, setBorrows] = useState<BorrowRecord[]>(() => {
    const saved = localStorage.getItem('lib_borrows');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lib_books', JSON.stringify(books));
    localStorage.setItem('lib_borrows', JSON.stringify(borrows));
  }, [books, borrows]);

  const borrowBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, available: false } : b));
    const newBorrow: BorrowRecord = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user1', // Demo user
      bookId,
      borrowDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    };
    setBorrows(prev => [...prev, newBorrow]);
    return newBorrow;
  };

  const returnBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, available: true } : b));
    setBorrows(prev => prev.map(br => br.bookId === bookId && br.status === 'active' ? { ...br, status: 'returned', returnDate: new Date().toISOString() } : br));
  };

  return { books, borrows, borrowBook, returnBook };
}
