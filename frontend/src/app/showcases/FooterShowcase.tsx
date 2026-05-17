'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';

// ─── shared UI ────────────────────────────────────────────────────────────────

function Label({ children }: { children: string }) {
  return (
    <Typography
      variant="caption"
      sx={{ color: 'var(--text-secondary)', mb: 1.5, display: 'block', fontWeight: 500 }}
    >
      {children}
    </Typography>
  );
}

function FooterLinkCol({
  heading,
  items,
  headingColor = '#111827',
}: {
  heading: string;
  items: { name: string; href: string }[];
  headingColor?: string;
}) {
  return (
    <Box>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: '1.5rem', color: headingColor }}>
        {heading}
      </Typography>
      <Box
        component="ul"
        sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, listStyle: 'none', pl: 0, mb: 0 }}
      >
        {items.map((item) => (
          <li key={item.name}>
            <Box
              component="a"
              href={item.href}
              sx={{
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                color: '#4b5563',
                textDecoration: 'none',
                '&:hover': { color: '#111827' },
              }}
            >
              {item.name}
            </Box>
          </li>
        ))}
      </Box>
    </Box>
  );
}

// ─── shared data ──────────────────────────────────────────────────────────────

const footerNav = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
};

const socialItems = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

// ─── 1. Four column with company mission ──────────────────────────────────────
//
// xl: 3-col grid: [mission col-1] [4-col links col-span-2]
// Links: 2×(2-col on md+) — Solutions+Support | Company+Legal
// Bottom bar: border-t rgba(17,24,39,0.1) + copyright

function FourColumnWithMission() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, lg: 4 }, pb: 4, pt: { xs: 8, sm: 12, lg: 16 } }}>
        {/* Top section */}
        <Box
          sx={{
            display: { xs: 'block', xl: 'grid' },
            gridTemplateColumns: { xl: 'repeat(3, 1fr)' },
            gap: { xl: 4 },
          }}
        >
          {/* Mission column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box
              component="img"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Company name"
              sx={{ height: 36, width: 'auto' }}
            />
            <Typography sx={{ fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}>
              Making the world a better place through constructing elegant hierarchies.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {socialItems.map((item) => (
                <Box
                  key={item.name}
                  component="a"
                  href={item.href}
                  aria-label={item.name}
                  sx={{
                    color: '#4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { color: '#1f2937' },
                  }}
                >
                  {item.icon}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Four link columns */}
          <Box
            sx={{
              mt: { xs: 8, xl: 0 },
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 4,
              gridColumn: { xl: 'span 2' },
            }}
          >
            {/* Solutions + Support */}
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Solutions" items={footerNav.solutions} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Support" items={footerNav.support} />
              </Box>
            </Box>

            {/* Company + Legal */}
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Company" items={footerNav.company} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Legal" items={footerNav.legal} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box sx={{ mt: { xs: 8, sm: 10, lg: 12 }, pt: 4, borderTop: '1px solid rgba(17,24,39,0.1)' }}>
          <Typography sx={{ fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}>
            &copy; 2024 Your Company, Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ─── 2. Four column with call-to-action ───────────────────────────────────────
//
// Centered CTA block (max-w-2xl): eyebrow + heading + body + "Get started" btn
// Below: border-t then xl:3-col grid [logo col-1] [4-col links col-span-2]
// Bottom bar: border-t, md:flex justify-between — social icons RIGHT (order-2),
//             copyright LEFT (order-1)

function FourColumnWithCTA() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, lg: 4 }, py: { xs: 8, sm: 12, lg: 16 } }}>
        {/* Centered CTA */}
        <Box sx={{ mx: 'auto', maxWidth: 672, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '1rem', lineHeight: '1.75rem', fontWeight: 600, color: '#4f46e5' }}>
            Get started
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: 1,
              fontSize: { xs: '2.25rem', sm: '3rem' },
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#111827',
              lineHeight: 1.1,
            }}
          >
            Boost your productivity. Start using our app today.
          </Typography>
          <Typography
            sx={{ mx: 'auto', mt: 3, maxWidth: 560, fontSize: '1.125rem', lineHeight: '2rem', color: '#4b5563' }}
          >
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur
            commodo do ea.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Box
              component="a"
              href="#"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 1,
                bgcolor: '#4f46e5',
                px: '14px',
                py: '10px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                '&:hover': { bgcolor: '#6366f1' },
              }}
            >
              Get started
            </Box>
          </Box>
        </Box>

        {/* Logo + link columns — separated by border-t */}
        <Box sx={{ mt: 12, borderTop: '1px solid rgba(17,24,39,0.1)', pt: 6 }}>
          <Box
            sx={{
              display: { xs: 'block', xl: 'grid' },
              gridTemplateColumns: { xl: 'repeat(3, 1fr)' },
              gap: { xl: 4 },
            }}
          >
            <Box
              component="img"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Company name"
              sx={{ height: 36, width: 'auto' }}
            />
            <Box
              sx={{
                mt: { xs: 8, xl: 0 },
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 4,
                gridColumn: { xl: 'span 2' },
              }}
            >
              {/* Solutions + Support */}
              <Box
                sx={{
                  display: { xs: 'block', md: 'grid' },
                  gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                  gap: { md: 4 },
                }}
              >
                <FooterLinkCol heading="Solutions" items={footerNav.solutions} headingColor="#030712" />
                <Box sx={{ mt: { xs: 5, md: 0 } }}>
                  <FooterLinkCol heading="Support" items={footerNav.support} headingColor="#030712" />
                </Box>
              </Box>

              {/* Company + Legal */}
              <Box
                sx={{
                  display: { xs: 'block', md: 'grid' },
                  gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                  gap: { md: 4 },
                }}
              >
                <FooterLinkCol heading="Company" items={footerNav.company} headingColor="#030712" />
                <Box sx={{ mt: { xs: 5, md: 0 } }}>
                  <FooterLinkCol heading="Legal" items={footerNav.legal} headingColor="#030712" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom bar: social RIGHT, copyright LEFT on md+ */}
        <Box
          sx={{
            mt: 6,
            borderTop: '1px solid rgba(17,24,39,0.1)',
            pt: 4,
            display: { md: 'flex' },
            alignItems: { md: 'center' },
            justifyContent: { md: 'space-between' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, order: { md: 2 } }}>
            {socialItems.map((item) => (
              <Box
                key={item.name}
                component="a"
                href={item.href}
                aria-label={item.name}
                sx={{ color: '#4b5563', display: 'flex', alignItems: 'center', '&:hover': { color: '#1f2937' } }}
              >
                {item.icon}
              </Box>
            ))}
          </Box>
          <Typography
            sx={{ mt: { xs: 4, md: 0 }, order: { md: 1 }, fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}
          >
            &copy; 2024 Your Company, Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ─── 3. Four column simple ────────────────────────────────────────────────────
//
// xl:3-col grid: [logo col-1] [4-col links col-span-2]
// No mission text, no social icons, no bottom bar

function FourColumnSimple() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, lg: 4 }, py: { xs: 8, sm: 12, lg: 16 } }}>
        <Box
          sx={{
            display: { xs: 'block', xl: 'grid' },
            gridTemplateColumns: { xl: 'repeat(3, 1fr)' },
            gap: { xl: 4 },
          }}
        >
          <Box
            component="img"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Company name"
            sx={{ height: 36, width: 'auto' }}
          />
          <Box
            sx={{
              mt: { xs: 8, xl: 0 },
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 4,
              gridColumn: { xl: 'span 2' },
            }}
          >
            {/* Solutions + Support */}
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Solutions" items={footerNav.solutions} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Support" items={footerNav.support} />
              </Box>
            </Box>

            {/* Company + Legal */}
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Company" items={footerNav.company} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Legal" items={footerNav.legal} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ─── 4. Four column with newsletter ──────────────────────────────────────────
//
// xl: 3-col grid: [4-col links col-span-2] [newsletter col-1]
// Link columns come FIRST (no logo), newsletter on the right
// Bottom bar: social RIGHT (order-2), copyright LEFT (order-1)

function FourColumnWithNewsletter() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, lg: 4 }, pb: 4, pt: { xs: 10, sm: 12, lg: 16 } }}>
        {/* Link columns + newsletter */}
        <Box
          sx={{
            display: { xs: 'block', xl: 'grid' },
            gridTemplateColumns: { xl: 'repeat(3, 1fr)' },
            gap: { xl: 4 },
          }}
        >
          {/* Link columns — xl:col-span-2 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 4,
              gridColumn: { xl: 'span 2' },
            }}
          >
            {/* Solutions + Support */}
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Solutions" items={footerNav.solutions} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Support" items={footerNav.support} />
              </Box>
            </Box>

            {/* Company + Legal */}
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Company" items={footerNav.company} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Legal" items={footerNav.legal} />
              </Box>
            </Box>
          </Box>

          {/* Newsletter — xl:col-1 */}
          <Box sx={{ mt: { xs: 5, xl: 0 } }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: '1.5rem', color: '#111827' }}>
              Subscribe to our newsletter
            </Typography>
            <Typography sx={{ mt: 1, fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}>
              The latest news, articles, and resources, sent to your inbox weekly.
            </Typography>
            <Box
              component="form"
              sx={{ mt: 3, display: { sm: 'flex' }, maxWidth: { sm: 448 } }}
              onSubmit={(e) => e.preventDefault()}
            >
              <InputBase
                placeholder="Enter your email"
                type="email"
                inputProps={{ 'aria-label': 'Email address', name: 'email-address', autoComplete: 'email' }}
                sx={{
                  width: { xs: '100%', sm: 256, xl: '100%' },
                  minWidth: 0,
                  bgcolor: 'white',
                  borderRadius: 1,
                  px: 1.5,
                  py: '6px',
                  color: '#111827',
                  fontSize: '0.875rem',
                  lineHeight: '1.5rem',
                  outline: '1px solid #d1d5db',
                  outlineOffset: -1,
                  '& input::placeholder': { color: '#6b7280' },
                  '&:focus-within': { outline: '2px solid #4f46e5', outlineOffset: -2 },
                }}
              />
              <Box
                component="button"
                type="submit"
                sx={{
                  mt: { xs: 2, sm: 0 },
                  ml: { sm: 2 },
                  flexShrink: { sm: 0 },
                  display: 'flex',
                  width: { xs: '100%', sm: 'auto' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  border: 'none',
                  bgcolor: '#4f46e5',
                  px: 1.5,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                  '&:hover': { bgcolor: '#6366f1' },
                }}
              >
                Subscribe
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom bar: social RIGHT, copyright LEFT */}
        <Box
          sx={{
            mt: { xs: 8, sm: 10, lg: 12 },
            borderTop: '1px solid rgba(17,24,39,0.1)',
            pt: 4,
            display: { md: 'flex' },
            alignItems: { md: 'center' },
            justifyContent: { md: 'space-between' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, order: { md: 2 } }}>
            {socialItems.map((item) => (
              <Box
                key={item.name}
                component="a"
                href={item.href}
                aria-label={item.name}
                sx={{ color: '#4b5563', display: 'flex', alignItems: 'center', '&:hover': { color: '#1f2937' } }}
              >
                {item.icon}
              </Box>
            ))}
          </Box>
          <Typography
            sx={{ mt: { xs: 4, md: 0 }, order: { md: 1 }, fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}
          >
            &copy; 2024 Your Company, Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ─── 5. Four column with newsletter below ─────────────────────────────────────
//
// Top: xl:3-col grid [logo col-1] [4-col links col-span-2]  (same as simple)
// Middle: border-t + lg:flex justify-between — newsletter heading LEFT, form RIGHT
// Bottom: border-t + md:flex — social RIGHT (order-2), copyright LEFT (order-1)

function FourColumnWithNewsletterBelow() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, lg: 4 }, pb: 4, pt: { xs: 8, sm: 12, lg: 16 } }}>

        {/* Logo + link columns */}
        <Box
          sx={{
            display: { xs: 'block', xl: 'grid' },
            gridTemplateColumns: { xl: 'repeat(3, 1fr)' },
            gap: { xl: 4 },
          }}
        >
          <Box
            component="img"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Company name"
            sx={{ height: 36, width: 'auto' }}
          />
          <Box
            sx={{
              mt: { xs: 8, xl: 0 },
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 4,
              gridColumn: { xl: 'span 2' },
            }}
          >
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Solutions" items={footerNav.solutions} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Support" items={footerNav.support} />
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                gap: { md: 4 },
              }}
            >
              <FooterLinkCol heading="Company" items={footerNav.company} />
              <Box sx={{ mt: { xs: 5, md: 0 } }}>
                <FooterLinkCol heading="Legal" items={footerNav.legal} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Newsletter — border-t, lg:flex justify-between */}
        <Box
          sx={{
            mt: { xs: 8, sm: 10, lg: 12 },
            borderTop: '1px solid rgba(17,24,39,0.1)',
            pt: 4,
            display: { lg: 'flex' },
            alignItems: { lg: 'center' },
            justifyContent: { lg: 'space-between' },
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: '1.5rem', color: '#111827' }}>
              Subscribe to our newsletter
            </Typography>
            <Typography sx={{ mt: 1, fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}>
              The latest news, articles, and resources, sent to your inbox weekly.
            </Typography>
          </Box>
          <Box
            component="form"
            sx={{ mt: { xs: 3, lg: 0 }, display: { sm: 'flex' }, maxWidth: { sm: 448 } }}
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
          >
            <InputBase
              placeholder="Enter your email"
              type="email"
              inputProps={{ 'aria-label': 'Email address', name: 'email-address', autoComplete: 'email' }}
              sx={{
                width: { xs: '100%', sm: 224 },
                minWidth: 0,
                bgcolor: 'white',
                borderRadius: 1,
                px: 1.5,
                py: '6px',
                color: '#111827',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                outline: '1px solid #d1d5db',
                outlineOffset: -1,
                '& input::placeholder': { color: '#9ca3af' },
                '&:focus-within': { outline: '2px solid #4f46e5', outlineOffset: -2 },
              }}
            />
            <Box
              component="button"
              type="submit"
              sx={{
                mt: { xs: 2, sm: 0 },
                ml: { sm: 2 },
                flexShrink: { sm: 0 },
                display: 'flex',
                width: { xs: '100%', sm: 'auto' },
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                border: 'none',
                bgcolor: '#4f46e5',
                px: 1.5,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                '&:hover': { bgcolor: '#6366f1' },
              }}
            >
              Subscribe
            </Box>
          </Box>
        </Box>

        {/* Bottom bar — social RIGHT, copyright LEFT */}
        <Box
          sx={{
            mt: 4,
            borderTop: '1px solid rgba(17,24,39,0.1)',
            pt: 4,
            display: { md: 'flex' },
            alignItems: { md: 'center' },
            justifyContent: { md: 'space-between' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, order: { md: 2 } }}>
            {socialItems.map((item) => (
              <Box
                key={item.name}
                component="a"
                href={item.href}
                aria-label={item.name}
                sx={{ color: '#4b5563', display: 'flex', alignItems: 'center', '&:hover': { color: '#1f2937' } }}
              >
                {item.icon}
              </Box>
            ))}
          </Box>
          <Typography
            sx={{ mt: { xs: 4, md: 0 }, order: { md: 1 }, fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}
          >
            &copy; 2024 Your Company, Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ─── 6. Simple centered ───────────────────────────────────────────────────────
//
// All three rows centered: nav links (flex-wrap) → social icons → copyright
// No columns, no borders, no logo

const mainNav = [
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Accessibility', href: '#' },
  { name: 'Partners', href: '#' },
];

function SimpleCentered() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 3, lg: 4 }, py: { xs: 10, sm: 12 }, overflow: 'hidden' }}>
        {/* Nav links */}
        <Box
          component="nav"
          aria-label="Footer"
          sx={{
            mb: -3,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: 6,
            rowGap: 1.5,
          }}
        >
          {mainNav.map((item) => (
            <Box
              key={item.name}
              component="a"
              href={item.href}
              sx={{
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                color: '#4b5563',
                textDecoration: 'none',
                '&:hover': { color: '#111827' },
              }}
            >
              {item.name}
            </Box>
          ))}
        </Box>

        {/* Social icons */}
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', gap: 5 }}>
          {socialItems.map((item) => (
            <Box
              key={item.name}
              component="a"
              href={item.href}
              aria-label={item.name}
              sx={{ color: '#4b5563', display: 'flex', alignItems: 'center', '&:hover': { color: '#1f2937' } }}
            >
              {item.icon}
            </Box>
          ))}
        </Box>

        {/* Copyright */}
        <Typography sx={{ mt: 5, textAlign: 'center', fontSize: '0.875rem', lineHeight: '1.5rem', color: '#4b5563' }}>
          &copy; 2024 Your Company, Inc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

// ─── 7. Simple with social links ─────────────────────────────────────────────
//
// Single row: md:flex justify-between
// Social icons RIGHT (order-2), copyright LEFT (order-1)
// No logo, no nav links, no columns, no borders

function SimpleWithSocialLinks() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white' }}>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          px: { xs: 3, lg: 4 },
          py: 6,
          display: { md: 'flex' },
          alignItems: { md: 'center' },
          justifyContent: { md: 'space-between' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, order: { md: 2 } }}>
          {socialItems.map((item) => (
            <Box
              key={item.name}
              component="a"
              href={item.href}
              aria-label={item.name}
              sx={{ color: '#4b5563', display: 'flex', alignItems: 'center', '&:hover': { color: '#1f2937' } }}
            >
              {item.icon}
            </Box>
          ))}
        </Box>
        <Typography
          sx={{
            mt: { xs: 4, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
            order: { md: 1 },
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            color: '#4b5563',
          }}
        >
          &copy; 2024 Your Company, Inc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export default function FooterShowcase() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <div><Label>4-column with company mission</Label><FourColumnWithMission /></div>
      <div><Label>4-column with call-to-action</Label><FourColumnWithCTA /></div>
      <div><Label>4-column simple</Label><FourColumnSimple /></div>
      <div><Label>4-column with newsletter</Label><FourColumnWithNewsletter /></div>
      <div><Label>4-column with newsletter below</Label><FourColumnWithNewsletterBelow /></div>
      <div><Label>Simple centered</Label><SimpleCentered /></div>
      <div><Label>Simple with social links</Label><SimpleWithSocialLinks /></div>
    </Box>
  );
}
