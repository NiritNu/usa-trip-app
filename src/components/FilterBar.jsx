export default function FilterBar({
  activeFilter,
  setActiveFilter,
  filters = defaultFilters,
}) {
  return (
    <div className="filter-bar" aria-label="סינון אטרקציות">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={activeFilter === filter.id ? "active" : ""}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

const defaultFilters = [
  { id: "all", label: "הכול" },
  { id: "ride", label: "מתקנים" },
  { id: "show", label: "הופעות" },
  { id: "character", label: "דמויות" },
  { id: "dining", label: "אוכל" },
  { id: "experience", label: "חוויות" },
  { id: "must_do", label: "חובה" },
  { id: "no_height", label: "ללא מגבלת גובה" },
  { id: "rain", label: "מתאים לגשם" },
  { id: "low_wait", label: "תור קצר יחסית" },
];