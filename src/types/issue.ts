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
  
    assignee_name:string;
  
    created_at: string;
  
    updated_at: string;
  }