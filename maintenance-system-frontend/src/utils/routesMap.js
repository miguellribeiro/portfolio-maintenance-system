export const routesMap = {
  // --- Rotas Públicas ---
  LOGIN: { path: '/login', mask: 'Login' },
  ACCESS_DENIED: { path: '/acesso-negado', mask: 'Acesso Negado' },

  // --- Rotas da Área do Cliente ---
  CLIENT_DASHBOARD: { path: '/portal', mask: 'Início' },
  CLIENT_TICKETS_LIST: { path: '/portal/chamados', mask: 'Meus Chamados' },
  CLIENT_TICKET_NEW: { path: '/portal/chamados/novo', mask: 'Abrir Novo Chamado' },
  CLIENT_TICKET_DETAIL: { path: '/portal/chamados/:ticketId', mask: 'Detalhes do Chamado' },

  // --- Rotas da Área do Técnico ---
  TECHNICIAN_DASHBOARD: { path: '/painel', mask: 'Dashboard' },
  TECHNICIAN_KANBAN: { path: '/painel/quadro', mask: 'Quadro de Chamados' },
  TECHNICIAN_TICKET_DETAIL: { path: '/painel/chamados/:ticketId', mask: 'Detalhes do Chamado' },

  // --- Rotas da Área Interna ---
  ADMIN_DASHBOARD: { path: '/admin', mask: 'Dashboard Principal' },
  ADMIN_TICKETS_LIST: { path: '/admin/chamados', mask: 'Gestão de Chamados' },
  ADMIN_CLIENTS: { path: '/admin/clientes', mask: 'Gestão de Clientes' },
  ADMIN_TECHNICIANS: { path: '/admin/tecnicos', mask: 'Gestão de Técnicos' },
  ADMIN_LOGS: { path: '/admin/logs', mask: 'Logs do Sistema' },
};