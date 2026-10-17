import React from 'react';
import { 
  FolderArchive, 
  UserCheck, 
  CreditCard, 
  Car, 
  GraduationCap, 
  Award,
  LayoutGrid,
  List,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES } from '../data/documents';

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  countsByCategory,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange
}) {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FolderArchive': return <FolderArchive className="w-4 h-4" />;
      case 'UserCheck': return <UserCheck className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      default: return <FolderArchive className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = countsByCategory[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-brand-500/30 shadow-md ring-2 ring-brand-400/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
              }`}
            >
              {getIcon(cat.icon)}
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-white/25 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort & View Mode Switches */}
      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
        
        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 rounded-xl px-2.5 py-1 text-xs text-slate-300">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="default" className="bg-slate-800">Default Order</option>
            <option value="title-asc" className="bg-slate-800">Name (A-Z)</option>
            <option value="date-desc" className="bg-slate-800">Newest Issue</option>
            <option value="expiry-asc" className="bg-slate-800">Expiry Date</option>
          </select>
        </div>

        {/* View Toggle (Grid / List) */}
        <div className="flex items-center bg-slate-800/80 border border-slate-700/60 rounded-xl p-0.5">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              viewMode === 'grid' 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              viewMode === 'list' 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
