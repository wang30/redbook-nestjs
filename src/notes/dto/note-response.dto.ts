export class NoteResponseDto {
  id: number;
  title: string;
  content: string;
  imageUrls: string[];
  author: {
    id: number;
    username: string;
    avatarUrl?: string;
  };
  createdAt: Date;
}
