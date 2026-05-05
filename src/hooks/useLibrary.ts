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
  },
  {
    id: '7',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finance',
    description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave.',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.9,
    tags: ['Finance', 'Psychology']
  },
  {
    id: '8',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technology',
    description: 'A handbook of agile software craftsmanship.',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.8,
    tags: ['Coding', 'Engineering']
  },
  {
    id: '9',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    description: 'A brief history of humankind.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.8,
    tags: ['History', 'Science']
  },
  {
    id: '10',
    title: "Man's Search for Meaning",
    author: 'Viktor Frankl',
    category: 'Psychology',
    description: 'Psychiatrist Viktor Frankl’s memoir has riveted generations of readers with its descriptions of life in Nazi death camps.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop',
    available: true,
    rating: 4.9,
    tags: ['Psychology', 'Philosophy']
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

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('lib_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lib_books', JSON.stringify(books));
    localStorage.setItem('lib_borrows', JSON.stringify(borrows));
    localStorage.setItem('lib_favorites', JSON.stringify(favorites));
  }, [books, borrows, favorites]);

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const borrowBook = (bookId: string) => {
    // We allow multi-borrowing without strict limitations as requested
    const newBorrow: BorrowRecord = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user', 
      bookId,
      borrowDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
      status: 'active'
    };
    setBorrows(prev => [...prev, newBorrow]);
    // Optional: Mark book as unavailable if it's a physical singular item, 
    // but the user wants "unlimited", so we keep it available for others.
    return newBorrow;
  };

  const returnBook = (borrowId: string) => {
    setBorrows(prev => prev.map(br => 
      br.id === borrowId ? { ...br, status: 'returned', returnDate: new Date().toISOString() } : br
    ));
  };

  return { books, borrows, favorites, borrowBook, returnBook, toggleFavorite };
}
