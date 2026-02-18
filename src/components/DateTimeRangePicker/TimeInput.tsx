type TimeInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

export function TimeInput({ label, value, onChange }: TimeInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-muted">{label}</label>

      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-2 py-1 text-sm"
      />
    </div>
  );
}
