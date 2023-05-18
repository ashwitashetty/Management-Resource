export interface EmployeeInfo {
  id?: string;
  name?: string;
  joiningDate?: string;
  designation?: string;
  technologies?: string;
}

export interface ProjectInfo {
  id?: string;
  name?: string;
  startDate?: string;
  technologies?: string;
  status?: string;
  employees?: {
    id?: string;
    name?: string;
    joiningDate?: string;
    designation?: string;
    technologies?: string;
  }[];
}
