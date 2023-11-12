// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  volunteerLog: [
    {
      id: 42,
      on_job: {
        duration: 1,
        title: "My job",
        id: 1,
        datetime: "2023-11-12 12:23"
      },
      completed: true
    },
    {
      id: 42,
      on_job: {
        duration: 3,
        title: "My job",
        id: 2,
        datetime: "2023-11-12 12:23"
      },
      completed: true
    }
  ],
})
