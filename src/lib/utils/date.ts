/**
 * Format a year-month date string to display just the year
 * @param dateStr - Date string in YYYY-MM format, or undefined for 'Present'
 * @returns Formatted year or 'Present'
 */
export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Present';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { year: 'numeric' });
}
