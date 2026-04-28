export enum UserSegment {
  STUDENT = 'Student',
  UNIVERSITY_STUDENT = 'University Student',
  TEACHER = 'Teacher/Lecturer',
  PUBLIC = 'General Public'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  pdfUrl?: string; // For downloading
  available: boolean;
  rating: number;
  tags: string[];
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'borrow' | 'return' | 'view';
  bookId: string;
  timestamp: any;
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: any;
  dueDate: any;
  returnDate?: any;
  status: 'active' | 'returned' | 'overdue';
}
