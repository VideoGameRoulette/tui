'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SxProps, Theme } from '@mui/material/styles';

export interface AccordionItem {
  id: string;
  summary: string;
  details: ReactNode;
  disabled?: boolean;
}

export interface AppAccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string | string[];
  allowMultiple?: boolean;
  disableGutters?: boolean;
  variant?: 'default' | 'separated';
  sx?: SxProps<Theme>;
}

export default function AppAccordion({
  items,
  defaultExpanded,
  allowMultiple = false,
  disableGutters = false,
  variant = 'default',
  sx,
}: AppAccordionProps) {
  const initDefault = defaultExpanded
    ? Array.isArray(defaultExpanded)
      ? defaultExpanded
      : [defaultExpanded]
    : [];

  const [expanded, setExpanded] = useState<string[]>(
    allowMultiple ? initDefault : initDefault.slice(0, 1),
  );

  function toggle(id: string) {
    setExpanded(prev => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  }

  const separated = variant === 'separated';

  return (
    <div style={{ ...(separated ? { display: 'flex', flexDirection: 'column', gap: 8 } : {}) }}>
      {items.map(item => (
        <Accordion
          key={item.id}
          expanded={expanded.includes(item.id)}
          onChange={() => !item.disabled && toggle(item.id)}
          disabled={item.disabled}
          disableGutters={disableGutters}
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            ...(separated
              ? { borderRadius: '8px !important', '&:before': { display: 'none' } }
              : {
                  '&:not(:last-child)': { borderBottom: 0 },
                  '&:first-of-type': { borderTopLeftRadius: '8px !important', borderTopRightRadius: '8px !important' },
                  '&:last-of-type': { borderBottomLeftRadius: '8px !important', borderBottomRightRadius: '8px !important' },
                }),
            ...(!Array.isArray(sx) ? sx : {}),
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ fontWeight: 600 }}
          >
            <Typography fontWeight={600}>{item.summary}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {typeof item.details === 'string' ? (
              <Typography color="text.secondary">{item.details}</Typography>
            ) : (
              item.details
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
