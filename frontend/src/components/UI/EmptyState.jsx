import './Loader.css';

export function EmptyState({ icon = '📒', title, description, action }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        {icon}
      </span>
      <p className="empty-state__title">{title}</p>
      {description ? <p>{description}</p> : null}
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}
