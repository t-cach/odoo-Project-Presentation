import React, { useState } from 'react';
import { Code2, ArrowRightLeft, CheckCircle2, XCircle, Copy, Check } from 'lucide-react';

interface RefactorExample {
  title: string;
  category: string;
  impact: string;
  description: string;
  before: string;
  after: string;
}

const REFACTOR_ITEMS: Record<string, RefactorExample> = {
  kanban: {
    title: '1. Kanban Template Architecture',
    category: 'OWL / XML QWeb Template Engine',
    impact: 'View validation crash on Odoo 18 without migration',
    description: 'Odoo 18 completely removes the legacy <t t-name="kanban-box"> wrapper in favor of the unified <t t-name="card"> architecture with native flex utility classes.',
    before: `<!-- ODOO 17 (DEPRECATED IN V18) -->
<templates>
  <t t-name="kanban-box">
    <div class="oe_kanban_global_click">
      <div class="oe_kanban_details">
        <strong class="o_kanban_record_title">
          <field name="name"/>
        </strong>
      </div>
    </div>
  </t>
</templates>`,
    after: `<!-- ODOO 18 (REFACTORED & VALIDATED) -->
<templates>
  <t t-name="card">
    <div class="d-flex flex-column gap-1">
      <strong class="o_kanban_record_title">
        <field name="name"/>
      </strong>
      <span class="badge text-bg-info">
        <field name="health_score"/>% Health
      </span>
    </div>
  </t>
</templates>`
  },
  stock: {
    title: '2. Stock API & Storable Product Types',
    category: 'Inventory & Stock Move ORM',
    impact: 'Demo data & warehouse moves failed with ValidationError',
    description: 'Odoo 18 deprecated product.template.type="product". Physical storable items must now use type="consu" paired with is_storable=True. On stock moves, qty_done was renamed to quantity.',
    before: `# ODOO 17 (DEPRECATED SYNTAX)
product = self.env['product.product'].create({
    'name': 'Hydraulic Pump Seal',
    'type': 'product',  # <-- Obsolete in v18
})

# Stock Move Line Consumption:
move_line.write({'qty_done': 2.0}) # <-- Deprecated`,
    after: `# ODOO 18 (REFACTORED SYNTAX)
product = self.env['product.product'].create({
    'name': 'Hydraulic Pump Seal',
    'type': 'consu',
    'is_storable': True,  # <-- Odoo 18 Storable Flag
})

# Stock Move Line Consumption:
move_line.write({'quantity': 2.0}) # <-- Odoo 18 Standard`
  },
  views: {
    title: '3. Form & Tree View Dynamic Visibility',
    category: 'View Architecture & Python Domain Syntax',
    impact: 'Deprecation warnings & view parsing failures',
    description: 'Legacy attrs="{\'invisible\': [(\'state\', \'!=\', \'approved\')]}" dictionary syntax was deprecated in favor of direct invisible="state != \'approved\'" boolean expressions.',
    before: `<!-- ODOO 17 (DEPRECATED ATTRS DICT) -->
<button name="action_start_order"
        string="Start Work"
        type="object"
        attrs="{'invisible': [('state', '!=', 'approved')]}"
        class="oe_highlight"/>`,
    after: `<!-- ODOO 18 (SIMPLIFIED INVISIBLE EXPRESSIONS) -->
<button name="action_start_order"
        string="Start Work"
        type="object"
        invisible="state != 'approved'"
        class="btn-primary"/>`
  },
  orm: {
    title: '4. ORM Aggregations & _read_group Syntax',
    category: 'Database Query Optimization & Tuple Unpacking',
    impact: 'Backend crashes when computing order counts & reports',
    description: 'Odoo 18 _read_group requires explicit aggregate methods like aggregates=[\'__count\'] and returns tuples instead of list-of-dicts.',
    before: `# ODOO 17 (DICTIONARY RETURN FORMAT)
groups = self.env['equipment.maintenance.order']._read_group(
    domain=[('state', '=', 'done')],
    fields=['equipment_id'],
    groupby=['equipment_id']
)
# Returns: [{'equipment_id': (1, 'CNC'), 'equipment_id_count': 5}]`,
    after: `# ODOO 18 (STREAMLINED TUPLE UNPACKING)
groups = self.env['equipment.maintenance.order']._read_group(
    domain=[('state', '=', 'done')],
    groupby=['equipment_id'],
    aggregates=['__count']
)
# Returns tuples: (equipment_recordset, count)
for equipment, count in groups:
    equipment.total_completed_orders = count`
  }
};

export const RefactoringComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('kanban');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === '1') setActiveTab('kanban');
      else if (e.key === '2') setActiveTab('stock');
      else if (e.key === '3') setActiveTab('views');
      else if (e.key === '4') setActiveTab('orm');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const current = REFACTOR_ITEMS[activeTab];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 pb-3 mb-4 border-b border-slate-100">
        {Object.entries(REFACTOR_ITEMS).map(([key, f]) => {
          const isSelected = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-purple-800 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {f.title.replace(/^\d+\.\s*/, '')}
            </button>
          );
        })}
      </div>

      {/* Description header */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-extrabold text-slate-900">
            {current.title}
          </h3>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
            {current.category}
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {current.description}
        </p>
      </div>

      {/* Side by Side Diffs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before */}
        <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-3.5 relative flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-100">
            <div className="flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-extrabold text-rose-900 uppercase">
                Odoo 17 (Legacy / Deprecated)
              </span>
            </div>
            <button
              onClick={() => handleCopy(current.before, 'before')}
              className="text-2xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1"
            >
              {copiedKey === 'before' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedKey === 'before' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="text-2xs font-mono bg-white p-3 rounded-lg border border-rose-100 text-rose-950 overflow-x-auto custom-scrollbar flex-1 whitespace-pre leading-relaxed">
            {current.before}
          </pre>
        </div>

        {/* After */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3.5 relative flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-extrabold text-emerald-900 uppercase">
                Odoo 18 (Migrated & Validated)
              </span>
            </div>
            <button
              onClick={() => handleCopy(current.after, 'after')}
              className="text-2xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              {copiedKey === 'after' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedKey === 'after' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="text-2xs font-mono bg-white p-3 rounded-lg border border-emerald-100 text-emerald-950 overflow-x-auto custom-scrollbar flex-1 whitespace-pre leading-relaxed">
            {current.after}
          </pre>
        </div>
      </div>
    </div>
  );
};
