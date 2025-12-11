export class UserProfileDto {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}
