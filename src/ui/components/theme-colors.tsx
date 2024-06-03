const colors = [
  { name: "Primary", className: "bg-primary" },
  { name: "Surface Tint", className: "bg-surface-tint" },
  { name: "On Primary", className: "bg-on-primary" },
  { name: "Primary Container", className: "bg-primary-container" },
  { name: "On Primary Container", className: "bg-on-primary-container" },
  { name: "Secondary", className: "bg-secondary" },
  { name: "On Secondary", className: "bg-on-secondary" },
  { name: "Secondary Container", className: "bg-secondary-container" },
  { name: "On Secondary Container", className: "bg-on-secondary-container" },
  { name: "Tertiary", className: "bg-tertiary" },
  { name: "On Tertiary", className: "bg-on-tertiary" },
  { name: "Tertiary Container", className: "bg-tertiary-container" },
  { name: "On Tertiary Container", className: "bg-on-tertiary-container" },
  { name: "Error", className: "bg-error" },
  { name: "On Error", className: "bg-on-error" },
  { name: "Error Container", className: "bg-error-container" },
  { name: "On Error Container", className: "bg-on-error-container" },
  { name: "Background", className: "bg-background" },
  { name: "On Background", className: "bg-on-background" },
  { name: "Surface", className: "bg-surface" },
  { name: "On Surface", className: "bg-on-surface" },
  { name: "Surface Variant", className: "bg-surface-variant" },
  { name: "On Surface Variant", className: "bg-on-surface-variant" },
  { name: "Outline", className: "bg-outline" },
  { name: "Outline Variant", className: "bg-outline-variant" },
  { name: "Shadow", className: "bg-shadow" },
  { name: "Scrim", className: "bg-scrim" },
  { name: "Inverse Surface", className: "bg-inverse-surface" },
  { name: "Inverse On Surface", className: "bg-inverse-on-surface" },
  { name: "Inverse Primary", className: "bg-inverse-primary" },
  { name: "Primary Fixed", className: "bg-primary-fixed" },
  { name: "On Primary Fixed", className: "bg-on-primary-fixed" },
  { name: "Primary Fixed Dim", className: "bg-primary-fixed-dim" },
  {
    name: "On Primary Fixed Variant",
    className: "bg-on-primary-fixed-variant",
  },
  { name: "Secondary Fixed", className: "bg-secondary-fixed" },
  { name: "On Secondary Fixed", className: "bg-on-secondary-fixed" },
  { name: "Secondary Fixed Dim", className: "bg-secondary-fixed-dim" },
  {
    name: "On Secondary Fixed Variant",
    className: "bg-on-secondary-fixed-variant",
  },
  { name: "Tertiary Fixed", className: "bg-tertiary-fixed" },
  { name: "On Tertiary Fixed", className: "bg-on-tertiary-fixed" },
  { name: "Tertiary Fixed Dim", className: "bg-tertiary-fixed-dim" },
  {
    name: "On Tertiary Fixed Variant",
    className: "bg-on-tertiary-fixed-variant",
  },
  { name: "Surface Dim", className: "bg-surface-dim" },
  { name: "Surface Bright", className: "bg-surface-bright" },
  {
    name: "Surface Container Lowest",
    className: "bg-surface-container-lowest",
  },
  { name: "Surface Container Low", className: "bg-surface-container-low" },
  { name: "Surface Container", className: "bg-surface-container" },
  { name: "Surface Container High", className: "bg-surface-container-high" },
  {
    name: "Surface Container Highest",
    className: "bg-surface-container-highest",
  },
];

export default function ThemeColors() {
  return (
    <div className="bg-white border border-primary p-8">
      <table>
        <thead>
          <tr>
            <th>Color Name</th>
            <th className="w-32">Color</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color.className}>
              <td>{color.name}</td>
              <td>
                <div className={`h-12 ${color.className}`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
