export interface Post {
    userId?: number;
    id: number;
    title?: string;   
    name?: string;    //optional (for comments)
    body: string;
  }