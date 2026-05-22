'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import ExtensionIcon from '@mui/icons-material/Extension';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GridViewIcon from '@mui/icons-material/GridView';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NAV_ITEMS = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    icon: BarChartIcon,
    href: '#',
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    icon: ChatBubbleOutlineIcon,
    href: '#',
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure",
    icon: SecurityIcon,
    href: '#',
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools and find out what's best for you",
    icon: ExtensionIcon,
    href: '#',
  },
];

const QUICK_LINKS = [
  { name: 'Watch demo', icon: PlayArrowIcon, href: '#' },
  { name: 'View all products', icon: GridViewIcon, href: '#' },
  { name: 'Contact sales', icon: EmailIcon, href: '#' },
];

const RECENT_POSTS = [
  {
    title: 'Boost your conversion rate',
    category: 'Marketing',
    href: '#',
    date: 'Mar 16, 2023',
  },
  {
    title: 'How to use search engine optimization to drive sales',
    category: 'Analytics',
    href: '#',
    date: 'Feb 12, 2023',
  },
  {
    title: 'Improve your customer experience',
    category: 'Engagement',
    href: '#',
    date: 'Jan 29, 2023',
  },
];

export interface MegaMenuProps {
  label?: string;
}

export default function MegaMenu({ label = 'Solutions' }: MegaMenuProps) {
  const { palette } = useTheme();
  const dark = palette.mode === 'dark';
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'inline-flex' }}>
      {/* Trigger */}
      <Button
        ref={setAnchorEl}
        onClick={() => setOpen((o) => !o)}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 18,
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          />
        }
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: '0.9375rem',
          '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
        }}
      >
        {label}
      </Button>

      {/* Panel */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        disablePortal
        modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
        sx={{ zIndex: 1300, width: { xs: '100vw', sm: 620, lg: 720 } }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: dark
                  ? '0 8px 24px rgba(0,0,0,0.4)'
                  : '0 8px 24px rgba(0,0,0,0.1)',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  {/* Main content: nav items (left) + recent posts (right) */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '3fr 2fr' },
                    }}
                  >
                    {/* Left: nav items */}
                    <Box sx={{ p: 2 }}>
                      {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Box
                            key={item.name}
                            component="a"
                            href={item.href}
                            onClick={handleClose}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 2,
                              p: 1.5,
                              borderRadius: 1.5,
                              textDecoration: 'none',
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                          >
                            <Box
                              sx={{
                                mt: 0.25,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: 1.5,
                                bgcolor: dark ? 'rgba(255,255,255,0.06)' : 'grey.100',
                                flexShrink: 0,
                                color: 'primary.main',
                              }}
                            >
                              <Icon sx={{ fontSize: 18 }} />
                            </Box>
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', mt: 0.25, lineHeight: 1.4, fontSize: '0.8125rem' }}
                              >
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>

                    {/* Right: recent posts */}
                    <Box
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        bgcolor: dark ? 'rgba(255,255,255,0.03)' : 'grey.50',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          fontWeight: 600,
                          color: 'text.disabled',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          mb: 1.5,
                          px: 1,
                        }}
                      >
                        Recent posts
                      </Typography>
                      {RECENT_POSTS.map((post) => (
                        <Box
                          key={post.title}
                          component="a"
                          href={post.href}
                          onClick={handleClose}
                          sx={{
                            display: 'block',
                            p: 1.25,
                            borderRadius: 1.5,
                            textDecoration: 'none',
                            '&:hover': { bgcolor: 'action.hover' },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.8125rem', lineHeight: 1.4 }}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.disabled', mt: 0.25 }}
                          >
                            {post.category} · {post.date}
                          </Typography>
                        </Box>
                      ))}
                      <Box
                        component="a"
                        href="#"
                        onClick={handleClose}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mt: 1,
                          px: 1.25,
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        See all posts <ArrowForwardIcon sx={{ fontSize: 14 }} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Quick links footer */}
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                      p: 1.5,
                      bgcolor: dark ? 'rgba(255,255,255,0.02)' : 'grey.50',
                    }}
                  >
                    {QUICK_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Button
                          key={link.name}
                          component="a"
                          href={link.href}
                          onClick={handleClose}
                          startIcon={<Icon sx={{ fontSize: '16px !important' }} />}
                          size="small"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                            '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                          }}
                        >
                          {link.name}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
