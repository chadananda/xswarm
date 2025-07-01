export interface Agent {
  icon: string;
  title: string;
  role: string;
  description: string;
  image?: string;
  prompt?: string;
  mcpTools?: string[];
  activityType?:
    | 'analytics'
    | 'automation'
    | 'content'
    | 'marketing'
    | 'development'
    | 'testing'
    | 'security'
    | 'infrastructure'
    | 'planning'
    | 'design'
    | 'support';
}

export interface AgentCategory {
  title: string;
  subtitle: string;
  order: number;
  agents: Agent[];
}
