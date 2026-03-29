export const closingTasks = [
  { id: "sweep_sales_floor", label: "Sweep sales floor", shift: "closing", section: "Cleaning and Floor Recovery", critical: false, frequency: "daily" },
  { id: "sweep_back_room", label: "Sweep back room", shift: "closing", section: "Cleaning and Floor Recovery", critical: false, frequency: "daily" },
  { id: "wipe_down_sales_floor_tables", label: "Wipe down sales floor tables", shift: "closing", section: "Cleaning and Floor Recovery", critical: false, frequency: "daily" },
  { id: "wipe_down_backroom_tables", label: "Wipe down backroom tables", shift: "closing", section: "Cleaning and Floor Recovery", critical: false, frequency: "daily" },
  { id: "vacuum_floors", label: "Vacuum floors", shift: "closing", section: "Cleaning and Floor Recovery", critical: false, frequency: "daily" },

  { id: "return_accessories_fill_gaps", label: "Return accessories and fill gaps", shift: "closing", section: "Device and Merchandising Recovery", critical: false, frequency: "daily" },
  { id: "return_phones_demo_devices", label: "Return phones / demo devices", shift: "closing", section: "Device and Merchandising Recovery", critical: false, frequency: "daily" },
  { id: "return_remos", label: "Return REMOs", shift: "closing", section: "Device and Merchandising Recovery", critical: false, frequency: "daily" },

  { id: "clear_cpni_close", label: "Clear workstations and sales floor of CPNI", shift: "closing", section: "Security and Compliance", critical: true, frequency: "daily" },
  { id: "lock_safe_room", label: "Lock safe room", shift: "closing", section: "Security and Compliance", critical: true, frequency: "daily" },

  { id: "count_cash_till_close", label: "Count cash till", shift: "closing", section: "Cash and Funds", critical: true, frequency: "daily" },
  { id: "count_deposit", label: "Count deposit", shift: "closing", section: "Cash and Funds", critical: true, frequency: "daily" },
  { id: "count_change_fund_close", label: "Count change fund", shift: "closing", section: "Cash and Funds", critical: true, frequency: "daily" },

  { id: "complete_required_paperwork", label: "Complete required paperwork", shift: "closing", section: "Wrap-Up", critical: true, frequency: "daily" },
];
