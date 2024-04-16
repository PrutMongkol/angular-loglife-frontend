export const formatDuration = (value: Number|undefined, singular: string, plural: string): string => {
  if (!value) return '';
  return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
}
