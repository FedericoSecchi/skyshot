// CustomizePanel component for adjusting DomeGallery settings
function CustomizePanel({ settings, setSettings }) {
  return (
    <div className="customize-panel">
      <label>
        Fit
        <input 
          type="range" 
          min="0.1" 
          max="2" 
          step="0.1" 
          value={settings.fit} 
          onChange={e => setSettings({ ...settings, fit: parseFloat(e.target.value) })} 
        />
        <span className="customize-panel__value">{settings.fit.toFixed(1)}</span>
      </label>
      <label>
        Min Radius
        <input 
          type="range" 
          min="0" 
          max="2000" 
          step="10" 
          value={settings.minRadius} 
          onChange={e => setSettings({ ...settings, minRadius: parseFloat(e.target.value) })} 
        />
        <span className="customize-panel__value">{settings.minRadius}px</span>
      </label>
      <label>
        Max Vertical Rotation
        <input 
          type="range" 
          min="0" 
          max="90" 
          step="1" 
          value={settings.maxVerticalRotation} 
          onChange={e => setSettings({ ...settings, maxVerticalRotation: parseFloat(e.target.value) })} 
        />
        <span className="customize-panel__value">{settings.maxVerticalRotation}°</span>
      </label>
      <label>
        Segments
        <input 
          type="range" 
          min="1" 
          max="100" 
          step="1" 
          value={settings.segments} 
          onChange={e => setSettings({ ...settings, segments: parseInt(e.target.value) })} 
        />
        <span className="customize-panel__value">{settings.segments}</span>
      </label>
      <label>
        Drag Dampening
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="0.1" 
          value={settings.dragDampening} 
          onChange={e => setSettings({ ...settings, dragDampening: parseFloat(e.target.value) })} 
        />
        <span className="customize-panel__value">{settings.dragDampening.toFixed(1)}</span>
      </label>
      <label className="customize-panel__checkbox">
        <input 
          type="checkbox" 
          checked={settings.grayscale} 
          onChange={e => setSettings({ ...settings, grayscale: e.target.checked })} 
        />
        <span>Grayscale</span>
      </label>
    </div>
  );
}

export default CustomizePanel

