export const analyticsConfig = {
  measurementId: 'G-04JX522X8P',
} as const;

export const buildAnalyticsHead = () => {
  const id = analyticsConfig.measurementId;

  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    </script>
  `.trim();
};
