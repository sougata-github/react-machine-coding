export const lightConfig = {
  red: { color: "#FF0000", duration: 1000, nextLight: "yellow" },
  yellow: { color: "#FFD35A", duration: 2000, nextLight: "green" },
  green: { color: "#06D001", duration: 3000, nextLight: "red" },
};

export const chartsData = [
  {
    id: "dep-1",
    name: "Sales",
    profit: 20,
    color: "#468585",
  },
  {
    id: "dep-2",
    name: "Legal",
    profit: 70,
    color: "#7D8ABC",
  },
  {
    id: "dep-3",
    name: "Engineering",
    profit: 40,
    color: "#DCA47C",
  },
  {
    id: "dep-4",
    name: "Marketing",
    profit: 80,
    color: "#758694",
  },
  {
    id: "dep-5",
    name: "Maintenance",
    profit: 60,
    color: "#478CCF",
  },
];

export const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

export const tableData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
  },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "Editor" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Viewer",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Contributor",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    role: "Manager",
  },
];
