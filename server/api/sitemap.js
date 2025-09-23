import axios from "axios";

export default defineSitemapEventHandler(async () => {
  const { data } = await axios.get(`${useRuntimeConfig().public.API_URL}/get-links`);

  const companies = Array.isArray(data?.data?.company) ? data.data.company : [];

  const companyPages = companies
    .filter(c => c && c._id && c.state && c.company_name && c.landmark)
    .flatMap(c => {
      const base = `/${String(c.state).replaceAll(' ', '-')}/immigration-company/${String(c.company_name).replaceAll(' ', '-')}/${String(c.landmark).replaceAll(' ', '-')}/f&c-${c._id}`;
      return [
        `${base}/about-us`,
        `${base}/gallery`,
        `${base}/events`,
        `${base}/reviews`,
        `${base}/service`
      ];
    });

  const blogs = Array.isArray(data?.data?.blogs) ? data.data.blogs : [];
  const blogPages = blogs
    .filter(b => b && b._id)
    .map(b => `/blogs/${b._id}`);

  const staticRoutes = [
    '/',
    '/about-us',
    '/contact-us',
    '/Benefit-of-immigration-listing',
    '/crm',
    '/for-consultants',
    '/for-user',
    '/immigration-business-growth',
    '/PrivacyPolicy',
    '/TermofUse',
    '/TermsCondition',
    '/whitelabel-app',
    '/Blogs',
    '/Events'
  ];

  // Merge and dedupe
  const all = [...staticRoutes, ...companyPages, ...blogPages];
  const unique = Array.from(new Set(all));

  return unique;
});
