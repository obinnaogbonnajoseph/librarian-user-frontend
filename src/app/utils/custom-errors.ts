import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'passwordMatch',
    format: requiredFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `Passwords do not match`;
}
