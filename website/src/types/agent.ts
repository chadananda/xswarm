export interface Agent {
  icon: string;
  title: string;
  role: string;
  description: string;
  image?: string;
}

export interface AgentCategory {
  title: string;
  subtitle: string;
  order: number;
  agents: Agent[];
}