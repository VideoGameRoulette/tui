import type { TooltipProps } from '@mui/material/Tooltip';

/** Lets taps reach the child immediately on touch devices (MUI Tooltip otherwise delays/blocks). */
export const touchSafeTooltipProps = {
  disableTouchListener: true,
} satisfies Partial<TooltipProps>;
