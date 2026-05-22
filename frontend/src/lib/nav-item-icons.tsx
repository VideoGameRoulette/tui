'use client';

import type { SvgIconComponent } from '@mui/icons-material';
import CampaignIcon from '@mui/icons-material/Campaign';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import TvIcon from '@mui/icons-material/Tv';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { NAV_SECTIONS, type NavSection } from '@/lib/nav';
import {
  accentForSection,
  type SectionAccent,
} from '@/lib/nav-shell-styles';

/** href → icon for all routes declared in nav.ts */
export const NAV_ITEM_ICON_MAP: Record<string, SvgIconComponent> = {
  '/mui':                  HomeIcon,
  '/mui/demo/datagrid':    TableChartIcon,
  '/mui/demo/marketing':   CampaignIcon,
  '/tui':                  HomeIcon,
  '/tui/demo/datagrid':    TableChartIcon,
  '/tui/demo/marketing':   CampaignIcon,
  '/apple':                HomeIcon,
  '/apple/demo/datagrid':  TableChartIcon,
  '/apple/demo/marketing': CampaignIcon,
  '/ads':                  TvIcon,
  '/ads/builder':          DesignServicesIcon,
};

export type NavSectionWithAccent = NavSection & SectionAccent & {
  items: Array<NavSection['items'][number] & { icon: SvgIconComponent }>;
};

export function buildNavSectionsWithIcons(
  accents: Record<string, SectionAccent>,
  fallback: SectionAccent,
): NavSectionWithAccent[] {
  return NAV_SECTIONS.map((section) => {
    const accent = accentForSection(accents, section.id, fallback);
    return {
      ...section,
      ...accent,
      items: section.items.map((item) => ({
        ...item,
        icon: NAV_ITEM_ICON_MAP[item.href] ?? HomeIcon,
      })),
    };
  });
}
