// Route data for the generic report pages, so several reports can share one component
export interface ReportPageConfig {
  title: string;
  description: string;
  // Path under the API base URL, e.g. 'BursaryReport/GenerateCashBook'
  endpoint: string;
  fileName: string;
  buttonLabel: string;
  successMessage: string;
  // Session/term reports only: whether a term must be picked
  termRequired?: boolean;
}
