export interface User {
    id: number;
    name: string;
    email?: string;
  }
  
  export interface Issue {
    id: number;
    title: string;
    description: string;
  
    status: "Open" | "In Progress" | "Closed";
  
    assigned_to: number | null;
  
    assigned_user?: {
      id: number;
      name: string;
    };
  
    created_at: string;
  
    updated_at: string;
  }