export type Project = {
  id: string;
  title: string;
  image: string; // public path
  link?: string;
  description?: string;
};

export const projects: Project[] = [
  { id: "p1", title: "Globe", image: "/globe.svg", link: "#", description: "Interactive data globe" },
  { id: "p2", title: "Chai", image: "/chai.png", link: "#", description: "Design system & branding" },
  { id: "p3", title: "File", image: "/file.svg", link: "#", description: "Docs platform" },
  { id: "p4", title: "Skill Map", image: "/skills/bash.svg", link: "#", description: "Developer toolkit" },
];
