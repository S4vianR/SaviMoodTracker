// app.config.ts
export default defineAppConfig({
    vercelAnalytics: {
      mode: "auto",
      debug: true,
      beforeSend: (event: any) => {
        if (event.url.includes("/private")) return null;
  
        return event;
      },
    },
  });
  