export const formatDuration = (value: Number, singular: string, plural: string): string => {
  return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
}
