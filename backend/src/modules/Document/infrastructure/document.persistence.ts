export interface DocumentPersistenceModel {
  id: string;
  work_program_id: string;
  uploaded_by: string;
  type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  created_at: Date;
}
