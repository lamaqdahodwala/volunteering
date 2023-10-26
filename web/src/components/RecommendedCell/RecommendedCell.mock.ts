// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  recommended: [
    {
      id: 42,
      title: "My job",
      description: "This is a description for what you will do",
      manager: {
        username: "JFK High school"
      },
      max_signups: 100
    },
    {
      id: 43,
      title: "My job",
      description: "This is a description for what you will do",
      manager: {
        username: "JFK High school"
      },
      max_signups: 100
    },
    {
      id: 44,
      description: "This is a description for what you will do",
      title: "My job",
      manager: {
        username: "JFK High school"
      },
      max_signups: 100
    }
  ],
})
