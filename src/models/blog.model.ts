import { User } from "./user.model";

export interface Blog {
  id: number;
  name: string;
  description: string | null;
  owner_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface BlogWithMembers extends Blog {
  members: User[];
  member_count: number;
}

export interface BlogMember {
  blog_id: number;
  user_id: number;
  joined_at: Date;
}
