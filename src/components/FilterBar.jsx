export default function FilterBar({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: "all", label: "הכול" },
    { id: "ride", label: "מתקנים" },
    { id: "show", label: "הופעות" },
    { id: "character", label: "דמויות" },
    { id: "dining", label: "אוכל" },
    { id: "must_do", label: "חובה" },
    { id: "no_height", label: "ללא מגבלת גובה" },
    { id: "rain", label: "מתאים לגשם" },
    { id: "low_wait", label: "תור קצר יחסית" }
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={activeFilter === filter.id ? "active" : ""}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}