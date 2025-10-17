import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="verified" />
      <StatusBadge status="pending" />
      <StatusBadge status="incompatible" />
      <StatusBadge status="rejected" />
      <StatusBadge status="verified" text="Birthdate Verified" />
    </div>
  );
}
