export interface Post {
  id: number;
  title: string;
  content: string;
  blog_id: number;
  author_id: number;
  views: number;
  created_at: Date;
  updated_at: Date;
}
